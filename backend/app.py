from flask import Flask, request, jsonify
from flask_cors import CORS
import psycopg2
from psycopg2.pool import SimpleConnectionPool
from psycopg2.extras import RealDictCursor
import os
import time
import re
import logging
from collections import defaultdict, deque
from dotenv import load_dotenv

load_dotenv()

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__)
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024

ALLOWED_ORIGINS = [
    o.strip() for o in os.environ.get(
        "ALLOWED_ORIGINS",
        "http://localhost:5173,http://localhost:3000,https://scribbles-club-website.vercel.app"
    ).split(",") if o.strip()
]

CORS(app, origins=ALLOWED_ORIGINS, methods=["GET", "POST"], max_age=600)

DATABASE_URL = os.environ.get("DATABASE_URL")
if not DATABASE_URL:
    logger.warning("DATABASE_URL not set — /api/posts will return 503 until configured")

db_pool = None
if DATABASE_URL:
    try:
        db_pool = SimpleConnectionPool(minconn=1, maxconn=10, dsn=DATABASE_URL)
    except Exception as e:
        logger.error("Failed to create DB pool: %s", e)

VALID_CATEGORIES = {"Painting", "Poetry", "Digital Art", "Journaling", "Tutorials"}
MAX_TITLE_LEN = 200
MAX_AUTHOR_LEN = 100
MAX_CONTENT_LEN = 10000
MAX_IMAGE_URL_LEN = 500000

_rate_store = defaultdict(deque)
RATE_LIMIT = 10
RATE_WINDOW = 60

def is_rate_limited(ip):
    now = time.time()
    q = _rate_store[ip]
    while q and now - q[0] > RATE_WINDOW:
        q.popleft()
    if len(q) >= RATE_LIMIT:
        return True
    q.append(now)
    return False

def get_db():
    if db_pool is None:
        return None
    return db_pool.getconn()

def release_db(conn):
    if conn and db_pool:
        db_pool.putconn(conn)

def validate_post(data):
    errors = []
    title = (data.get("title") or "").strip()
    author = (data.get("author_name") or "").strip()
    category = (data.get("category") or "").strip()
    content = (data.get("content") or "").strip()
    image_url = data.get("image_url") or ""

    if not title or len(title) < 2 or len(title) > MAX_TITLE_LEN:
        errors.append(f"title must be 2-{MAX_TITLE_LEN} characters")
    if not author or len(author) < 2 or len(author) > MAX_AUTHOR_LEN:
        errors.append(f"author_name must be 2-{MAX_AUTHOR_LEN} characters")
    elif not re.match(r"^[\w\s.'-]+$", author):
        errors.append("author_name contains invalid characters")
    if category not in VALID_CATEGORIES:
        errors.append(f"category must be one of {', '.join(sorted(VALID_CATEGORIES))}")
    if not content or len(content) < 10 or len(content) > MAX_CONTENT_LEN:
        errors.append(f"content must be 10-{MAX_CONTENT_LEN} characters")
    if image_url and len(image_url) > MAX_IMAGE_URL_LEN:
        errors.append("image too large")
    if image_url and image_url.startswith("data:"):
        if not image_url.startswith("data:image/"):
            errors.append("image must be an image data URL")
    return errors

@app.route('/api/health', methods=['GET'])
def health():
    return jsonify({"status": "ok"})

@app.route('/api/posts', methods=['GET'])
def get_posts():
    if is_rate_limited(request.remote_addr or "unknown"):
        return jsonify({"error": "Too many requests"}), 429
    category = request.args.get('category', '').strip()
    try:
        page = max(1, int(request.args.get('page', '1')))
        limit = min(50, max(1, int(request.args.get('limit', '50'))))
    except ValueError:
        return jsonify({"error": "Invalid pagination params"}), 400
    offset = (page - 1) * limit

    if category and category != 'All' and category not in VALID_CATEGORIES:
        return jsonify({"error": "Invalid category"}), 400

    conn = get_db()
    if conn is None:
        return jsonify({"error": "Database not configured"}), 503
    try:
        cur = conn.cursor(cursor_factory=RealDictCursor)
        if category and category != 'All':
            cur.execute(
                "SELECT id, title, author_name, category, content, image_url, created_at FROM blog_posts WHERE category = %s ORDER BY created_at DESC LIMIT %s OFFSET %s;",
                (category, limit, offset)
            )
        else:
            cur.execute(
                "SELECT id, title, author_name, category, content, image_url, created_at FROM blog_posts ORDER BY created_at DESC LIMIT %s OFFSET %s;",
                (limit, offset)
            )
        posts = cur.fetchall()
        cur.close()
        return jsonify(posts)
    except Exception:
        logger.exception("get_posts failed")
        return jsonify({"error": "Failed to fetch posts"}), 500
    finally:
        release_db(conn)

@app.route('/api/posts', methods=['POST'])
def create_post():
    if is_rate_limited(request.remote_addr or "unknown"):
        return jsonify({"error": "Too many requests, slow down"}), 429
    if not request.is_json:
        return jsonify({"error": "Content-Type must be application/json"}), 400
    data = request.get_json(silent=True)
    if not data:
        return jsonify({"error": "No data provided"}), 400

    errors = validate_post(data)
    if errors:
        return jsonify({"error": "; ".join(errors)}), 400

    title = data["title"].strip()
    author_name = data["author_name"].strip()
    category = data["category"].strip()
    content = data["content"].strip()
    image_url = (data.get("image_url") or "").strip()

    conn = get_db()
    if conn is None:
        return jsonify({"error": "Database not configured"}), 503
    try:
        cur = conn.cursor(cursor_factory=RealDictCursor)
        cur.execute(
            "INSERT INTO blog_posts (title, author_name, category, content, image_url) VALUES (%s, %s, %s, %s, %s) RETURNING id, title, author_name, category, content, image_url, created_at;",
            (title, author_name, category, content, image_url)
        )
        new_post = cur.fetchone()
        conn.commit()
        cur.close()
        return jsonify({"message": "Post created successfully!", "post": new_post}), 201
    except Exception:
        logger.exception("create_post failed")
        try:
            conn.rollback()
        except Exception:
            pass
        return jsonify({"error": "Failed to create post"}), 500
    finally:
        release_db(conn)

@app.errorhandler(413)
def too_large(e):
    return jsonify({"error": "Payload too large (max 16MB)"}), 413

@app.errorhandler(404)
def not_found(e):
    return jsonify({"error": "Not found"}), 404

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)

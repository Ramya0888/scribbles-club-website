from flask import Flask, request, jsonify
from flask_cors import CORS
import psycopg2
from psycopg2.pool import SimpleConnectionPool
from psycopg2.extras import RealDictCursor
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024

db_pool = SimpleConnectionPool(
    minconn=1,
    maxconn=10,
    dsn=os.environ.get("DATABASE_URL")
)

def get_db():
    return db_pool.getconn()

def release_db(conn):
    db_pool.putconn(conn)

@app.route('/api/posts', methods=['GET'])
def get_posts():
    category = request.args.get('category')
    conn = get_db()
    try:
        cur = conn.cursor(cursor_factory=RealDictCursor)
        if category and category != 'All':
            cur.execute("SELECT id, title, author_name, category, content, image_url, created_at FROM blog_posts WHERE category = %s ORDER BY created_at DESC;", (category,))
        else:
            cur.execute("SELECT id, title, author_name, category, content, image_url, created_at FROM blog_posts ORDER BY created_at DESC;")
        posts = cur.fetchall()
        cur.close()
        return jsonify(posts)
    finally:
        release_db(conn)

@app.route('/api/posts', methods=['POST'])
def create_post():
    try:
        data = request.json
        if not data:
            return jsonify({"error": "No data provided"}), 400
        conn = get_db()
        try:
            cur = conn.cursor(cursor_factory=RealDictCursor)
            cur.execute(
                """
                INSERT INTO blog_posts (title, author_name, category, content, image_url)
                VALUES (%s, %s, %s, %s, %s) RETURNING *;
                """,
                (data['title'], data['author_name'], data['category'], data['content'], data.get('image_url', ''))
            )
            new_post = cur.fetchone()
            conn.commit()
            cur.close()
            return jsonify({"message": "Post created successfully!", "post": new_post}), 201
        finally:
            release_db(conn)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)
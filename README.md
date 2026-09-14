# Scribbles Art Club Website

Official website for **Scribbles Art Club of CEG**, Anna University — a creative collective built on curiosity, expression, and community.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 18 |
| Build | Vite 6 |
| Routing | react-router-dom v7 |
| Styling | Tailwind CSS 3 + custom CSS |
| Email | EmailJS |
| Hosting | Vercel (frontend) + Render (backend) |
| Icons | Lucide React, React Icons |
| Backend | Flask + Neon Postgres |

## Project Structure

```
scribbles-club-website/
├── backend/
│   ├── app.py                    # Flask API (validated, rate-limited)
│   ├── requirements.txt
│   └── .env.example
├── frontend/
│   ├── public/
│   │   ├── logo.png
│   │   ├── backgrnd-srcribb.jpg
│   │   └── team/                 # Team avatars
│   ├── src/
│   │   ├── main.jsx
│   │   ├── App.jsx               # Lazy routes + AnimatePresence
│   │   ├── components/
│   │   ├── pages/
│   │   │   ├── Home/
│   │   │   ├── Gallery/
│   │   │   ├── Events/
│   │   │   ├── Contact/
│   │   │   ├── Newsletter/
│   │   │   ├── Testimonials/
│   │   │   ├── Video/
│   │   │   ├── Blog/             # Create + filter posts
│   │   │   └── About/
│   │   └── styles/
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── vercel.json
└── README.md
```

## Pages & Routes

| Route | Page | Description |
|-------|------|-------------|
| `/` | Home | Hero, featured slider, team scrollers, timeline |
| `/events` | Events | Thooriga'26 + Techofes events + workshops |
| `/gallery` | Gallery | Workshop galleries |
| `/contact` | Contact | EmailJS + honeypot + map |
| `/newsletter` | Newsletter | Signup (client-side) |
| `/testimonials` | Testimonials | Member quotes |
| `/video` | Intro Video | Embed |
| `/blog` | Blog | Create posts, filter by category |

## Getting Started

### Prerequisites
- Node.js v18+
- Python 3.10+

### Setup

```bash
cd frontend
npm install

cd ../backend
pip install -r requirements.txt
cp .env.example .env   # fill DATABASE_URL + ALLOWED_ORIGINS
```

### Development

```bash
# frontend (http://localhost:5173)
cd frontend
npm run dev

# backend (http://localhost:5000)
cd backend
python app.py
```

### Production Build

```bash
cd frontend
npm run build
npm run preview
```

## Environment Variables

**`frontend/.env`**
```env
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
VITE_API_URL=https://scribbles-club-website.onrender.com
```

**`backend/.env`**
```env
DATABASE_URL=postgresql://user:pass@host/db
ALLOWED_ORIGINS=http://localhost:5173,https://your-app.vercel.app
PORT=5000
```

## Color Palette

| Color | Hex | CSS Variable |
|-------|-----|-------------|
| Cream | `#F7F6D3` | `--soft-cream` |
| Pink | `#F39EB6` | `--warm-pink` |
| Light Pink | `#FFE4EF` | `--light-pink` |
| Pastel Green | `#B8DB80` | `--pastel-green` |

## Deployment

Vercel handles SPA rewrites via `vercel.json`. Backend on Render with `gunicorn app:app`.

## License

MIT

## Contact

**Scribbles Art Club** - CEG, Anna University
- Instagram: [@scribbles_ceg](https://instagram.com/scribbles_ceg)
- Email: scribbles.ceg@annauniv.edu

© 2025–26 Scribbles, CEG

# Scribbles Art Club Website

Official website for **Scribbles Art Club of CEG**, Anna University — a creative collective built on curiosity, expression, and community.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 18 |
| Build | Vite 5 |
| Routing | react-router-dom v7 |
| Styling | Tailwind CSS 3 + custom CSS |
| Email | EmailJS |
| Hosting | Vercel |
| Icons | Lucide React, React Icons |
| Backend |  Flask (python) |
| Database | Neon(psql) |
## Project Structure

```
scribbles-club-website/
|__ backend/
|   |-- app.py                    # for connecting blog datas(neon) 
├── frontend/
│   ├── public/
│   │   ├── logo.png              # Club logo
│   │   ├── backgrnd-srcribb.jpg  # Home page background
│   │   └── team/                 # Team member avatars (30 members)
│   ├── src/
│   │   ├── main.jsx              # Entry point
│   │   ├── App.jsx               # Router (7 routes)
│   │   ├── components/
│   │   │   ├── Footer.jsx        # Site footer with tech team credits
│   │   │   └── EventCard.jsx     # Event card for lists & sliders
│   │   ├── pages/
|   |   |   |---Blogs             # create posts what you did in scribbles 
│   │   │   ├── Home/             # Landing page (hero, about section, team, timeline)
│   │   │   ├── Gallery/          # Workshop image galleries
│   │   │   ├── Events/           # Thooriga & Techofes events + workshops
│   │   │   ├── Contact/          # Contact form (EmailJS) + social links + map
│   │   │   ├── Newsletter/       # Newsletter signup
│   │   │   ├── Testimonials/     # Member reflections
│   │   │   ├── Video/            # Club intro video
│   │   │   └── About/            # Shared team member & about components
│   │   └── styles/               # Global & page-specific CSS
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── vercel.json               # SPA rewrite rules for Vercel
├── .gitignore
└── README.md
```

## Pages & Routes

| Route | Page | Description |
|-------|------|-------------|
| `/` | Home | Hero, about section, featured slider, team scrollers, timeline, pastel rain background |
| `/events` | Events | Thooriga'26 signature events, past events slider, workshop cards |
| `/gallery` | Art Gallery | Workshop image galleries with 3D cards |
| `/contact` | Contact | EmailJS form, Google Maps (CEG), social media links |
| `/newsletter` | Newsletter | Email signup form |
| `/testimonials` | Testimonials | Member & alumni quotes |
| `/video` | Intro Video | Club cinematic video embed |
| `/blogs' | Create posts | Filter the posts  |

## Getting Started

### Prerequisites

- Node.js v18+
- npm

### Setup

```bash
cd frontend
npm install
```

### Development

```bash
npm run dev
```

Opens at `http://localhost:5173`.

### Production Build

```bash
npm run build
npm run preview   # Preview production build locally
```

## Environment Variables

Create a `.env` file in the `frontend/` directory with your EmailJS credentials:

```env
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

Get these from your [EmailJS Dashboard](https://dashboard.emailjs.com/).

## Color Palette

| Color | Hex | CSS Variable |
|-------|-----|-------------|
| Cream | `#F7F6D3` | `--soft-cream` |
| Pink | `#F39EB6` | `--warm-pink` |
| Light Pink | `#FFE4EF` | `--light-pink` |
| Pastel Green | `#B8DB80` | `--pastel-green` |

## Deployment

Deployed on Vercel. The `vercel.json` handles SPA routing with rewrite rules.

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

**Scribbles Art Club** - College of Engineering, Guindy (CEG), Anna University

- Instagram: [@scribbles_ceg](https://instagram.com/scribbles_ceg)
- Email: scribbles.ceg@annauniv.edu

---

© 2025–26 Scribbles, the official Arts Club of CEG

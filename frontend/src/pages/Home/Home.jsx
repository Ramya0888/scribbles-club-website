import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

const featuredArtworks = [
  {
    title: 'Echoes of Spring',
    artist: 'Riya Malhotra',
    blurb: 'Pastel strokes capturing early morning light and quiet city corners.',
    tag: 'Watercolor',
    image: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'Liminal Bloom',
    artist: 'Aarav Sen',
    blurb: 'Acrylic textures exploring growth, patience, and the rhythm of sketching.',
    tag: 'Acrylic',
    image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'Midnight Scribbles',
    artist: 'Zara Kapoor',
    blurb: 'Ink illustrations of neon nights, quiet cafés, and rain on glass.',
    tag: 'Ink',
    image: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1200&q=80',
  },
];

const navBlocks = [
  { title: 'About Us', desc: 'Who we are and how we sketch together.', href: 'about.html' },
  { title: 'Gallery', desc: 'Curated works from weekly drops.', href: 'gallery.html' },
  { title: 'Events', desc: 'Workshops, sketchwalks, pop-ups.', href: 'events.html' },
  { title: 'Blog', desc: 'Process notes, prompts, and tips.', href: 'blog.html' },
  { title: 'Contact', desc: 'Reach us for collabs and invites.', href: 'contact.html' },
  { title: 'Testimonials', desc: 'What members, alumni, and collaborators say about Scribbles.', href: 'testimonials.html' },
  { title: 'Newsletter', desc: 'Get weekly art drops, events, and prompts in your inbox.', href: '/newsletter', isInternal: true },
  { title: 'Join Us', desc: 'Hop into the community spaces.', href: 'javascript:void(0)', isModal: true },
];

function JoinModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        <h2 className="modal-title">Join Scribbles Art Club</h2>
        <p className="modal-subtitle">Connect with us on your favorite platform</p>
        
        <div className="modal-links">
          <a 
            href="https://www.instagram.com/scribbles_ceg/?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw%3D%3D" 
            target="_blank" 
            rel="noopener noreferrer"
            className="modal-link"
          >
            <span className="link-icon">📸</span>
            <span className="link-text">
              <strong>Instagram</strong>
              <span className="link-desc">Follow for daily updates</span>
            </span>
          </a>
          
          <a 
            href="https://chat.whatsapp.com/YOUR_GROUP_LINK" 
            target="_blank" 
            rel="noopener noreferrer"
            className="modal-link"
          >
            <span className="link-icon">💬</span>
            <span className="link-text">
              <strong>WhatsApp Group</strong>
              <span className="link-desc">Join our community</span>
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}

function Hero({ onJoinClick }) {
  return (
    <header className="hero" id="top">
      <div className="hero-logo-circle">
        <img src="/logo.png" alt="Scribbles Art Club logo" />
      </div>
      <div className="hero-text">
        <p className="eyebrow">Scribbles Art Club</p>
        <h1>Where ideas stay sketchy, soft, and bold.</h1>
        <p className="muted">
          Weekly prompts, featured drops, critique circles, and events to help you keep drawing. Built for curious illustrators and makers.
        </p>
        <div className="hero-actions">
          <button className="btn primary" onClick={onJoinClick}>Join the Club</button>
          <a className="btn ghost" href="gallery.html">See the Gallery</a>
        </div>
      </div>
    </header>
  );
}

function FeaturedSlider() {
  const [index, setIndex] = useState(0);
  const [sparkle, setSparkle] = useState(false);
  const count = featuredArtworks.length;

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % count);
    }, 5200);
    return () => clearInterval(id);
  }, [count]);

  const current = useMemo(() => featuredArtworks[index], [index]);

  const handleAppreciate = () => {
    setSparkle(true);
    setTimeout(() => setSparkle(false), 900);
  };

  return (
    <section id="featured" className="card section">
      <div className="section-header">
        <div>
          <p className="eyebrow">Weekly Featured</p>
          <h2>Artworks Slider</h2>
        </div>
        <div className="dots" aria-label="slider dots">
          {featuredArtworks.map((_, i) => (
            <span
              key={i}
              className={`dot ${i === index ? 'active' : ''}`}
              onClick={() => setIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
      <div className="slider">
        <div className="slide">
          <div className="slide-image">
            <img src={current.image} alt={`${current.title} by ${current.artist}`} />
            <div className="badge badge-overlay">{current.tag}</div>
          </div>
          <div className="slide-body">
            <h3>{current.title}</h3>
            <p className="muted">by {current.artist}</p>
            <p className="blurb">{current.blurb}</p>
          </div>
          <div className={`sparkle ${sparkle ? 'show' : ''}`}>✨</div>
        </div>
      </div>
    </section>
  );
}

function QuickButtons({ onJoinClick }) {
  return (
    <section className="quick section">
      <div className="section-header">
        <p className="eyebrow">Jump In</p>
        <h2>Quick Buttons</h2>
      </div>
      <div className="quick-grid">
        <button className="btn block" onClick={onJoinClick}>Join Us</button>
        <a className="btn block" href="gallery.html">Explore Art</a>
        <a className="btn block" href="events.html">Upcoming Events</a>
      </div>
    </section>
  );
}

function NavigationBlocks({ onJoinClick }) {
  return (
    <section className="section" id="nav-blocks">
      <div className="section-header">
        <p className="eyebrow">Explore</p>
        <h2>Interactive Navigation Blocks</h2>
      </div>
      <div className="nav-grid">
        {navBlocks.map((block) => (
          block.isModal ? (
            <button
              key={block.title}
              className="nav-card nav-button"
              onClick={onJoinClick}
            >
              <div>
                <h3>{block.title}</h3>
                <p className="muted">{block.desc}</p>
              </div>
              <span className="chevron">→</span>
            </button>
          ) : block.isInternal ? (
            <Link key={block.title} className="nav-card" to={block.href}>
              <div>
                <h3>{block.title}</h3>
                <p className="muted">{block.desc}</p>
              </div>
              <span className="chevron">→</span>
            </Link>
          ) : (
            <a key={block.title} className="nav-card" href={block.href}>
              <div>
                <h3>{block.title}</h3>
                <p className="muted">{block.desc}</p>
              </div>
              <span className="chevron">→</span>
            </a>
          )
        ))}
      </div>
    </section>
  );
}

export default function HomePage() {
  const [modalOpen, setModalOpen] = useState(false);

  const handleJoinClick = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="page">
      <Hero onJoinClick={handleJoinClick} />
      <FeaturedSlider />
      <QuickButtons onJoinClick={handleJoinClick} />
      <NavigationBlocks onJoinClick={handleJoinClick} />
      <JoinModal isOpen={modalOpen} onClose={handleCloseModal} />
    </div>
  );
}


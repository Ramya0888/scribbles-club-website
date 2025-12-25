import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import TeamMemberCard from '../About/TeamMemberCard';
import Footer from '../../components/Footer';

const officeBearers = [
  { name: 'Sowmya', role: 'President', dept: 'IT', image: '/team/sowmya.jpeg', instagram: '', linkedin: '', quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
  { name: 'Venkatraman', role: 'President', dept: 'Manufacturing', image: '/team/ven.jpeg', instagram: '', linkedin: '', quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
  { name: 'Lavanyalakshmi', role: 'Secretary', dept: 'IT', image: '/team/lav.jpeg', instagram: '', linkedin: '', quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
  { name: 'Ramkumar S', role: 'Treasurer', dept: 'Manufacturing', image: '/team/ram.JPG', instagram: '', linkedin: '', quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
  { name: 'Mahima S', role: 'Events Team', dept: 'IT', image: '/team/mah.jpg', instagram: '', linkedin: '', quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
  { name: 'Suren M', role: 'Events Team', dept: 'Mechanical', image: '/team/sur.jpeg', instagram: '', linkedin: '', quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
  { name: 'Sujith P', role: 'Design Team', dept: 'Manufacturing', image: '/team/suj.jpeg', instagram: '', linkedin: '', quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
  { name: 'Shevaniga S', role: 'Design Team', dept: 'IT', image: '/team/she.jpg', instagram: '', linkedin: '', quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
  { name: 'Naziya Kouser H', role: 'Marketing Team', dept: 'IT', image: '/team/naz.jpg', instagram: '', linkedin: '', quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
  { name: 'Sandhiya S', role: 'Marketing Team', dept: 'ECE', image: '/team/san.jpg', instagram: '', linkedin: '', quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
  { name: 'Reema', role: 'Social Media & Content', dept: 'Civil', image: '/team/ree.jpeg', instagram: '', linkedin: '', quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
  { name: 'Kanal Illamathi A S', role: 'Social Media & Content', dept: 'ECE', image: '/team/kan.jpg', instagram: '', linkedin: '', quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
  { name: 'Veenasri', role: 'Social Media & Content', dept: 'ECE', image: '', instagram: '/team/vee.jpg', linkedin: '', quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
  { name: 'Barath V', role: 'Public & External Relations', dept: 'ECE', image: '/team/bar.jpg', instagram: '', linkedin: '', quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
  { name: 'Preethi B', role: 'Logistics & Operations', dept: 'IT', image: '/team/pre.jpg', instagram: '', linkedin: '', quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
  { name: 'Dhevadharshini A', role: 'Logistics & Operations', dept: 'ECE', image: '/team/dhe.jpg', instagram: '', linkedin: '', quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
  { name: 'Gurumoorthi R', role: 'Web & Tech Team', dept: 'CSE', image: '/team/guru.jpg', instagram: '', linkedin: '', quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
  { name: 'Subi Pinsha P', role: 'Web & Tech Team', dept: 'IT', image: '/team/subi.jpg', instagram: '', linkedin: '', quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
  { name: 'Sarashivasri S', role: 'Web & Tech Team', dept: 'CSE', image: '/team/sara.jpg', instagram: '', linkedin: '', quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
  { name: 'Deepak S', role: 'Web & Tech Team', dept: 'CSE', image: '/team/deepak.jpg', instagram: '', linkedin: '', quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
  { name: 'Shanmugapriya B', role: 'Creatives', dept: 'Material Science', image: '/team/shan.jpg', instagram: '', linkedin: '', quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' }
];

const deputyHeads = [
  { name: 'Sharan Saminathan', role: 'Creatives', dept: 'CSE', image: '/team/shar.jpg', instagram: '', linkedin: '', quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
  { name: 'Roopa Varshni R', role: 'Creatives', dept: 'CSE', image: '/team/roop.png', instagram: '', linkedin: '', quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
  { name: 'Abdullah S', role: 'PR & ER', dept: 'IT', image: '/team/abd.jpg', instagram: '', linkedin: '', quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
  { name: 'Madhu Vidhyaa R', role: 'PR & ER', dept: 'Biomedical', image: '', instagram: '', linkedin: '', quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
  { name: 'Sakthi Balaji M', role: 'Logistics', dept: '', image: '', instagram: '', linkedin: '', quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
  { name: 'Lohitt Aswin V', role: 'Logistics', dept: '', image: '', instagram: '', linkedin: '', quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
  { name: 'Dharshini E', role: 'Social Media', dept: '', image: '/team/dharsE.jpg', instagram: '', linkedin: '', quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
  { name: 'Varshini Narayanan', role: 'Social Media', dept: '', image: '', instagram: '', linkedin: '', quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
  { name: 'Sheeba Jacklin A', role: 'Social Media', dept: '', image: '', instagram: '', linkedin: '', quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
  { name: 'Abirami', role: 'Web & Tech', dept: 'CSE', image: '/team/abi.webp', instagram: '', linkedin: 'https://www.linkedin.com/in/abirami-ramanathan-707521285/', quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
  { name: 'Hashim M', role: 'Web & Tech', dept: 'CSE', image: '/team/has.jpeg', instagram: '', linkedin: 'https://www.linkedin.com/in/hashim-m-160b96340/', quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
  { name: 'Ramya S', role: 'Web & Tech', dept: 'CSE', image: '/team/ramy.jpg', instagram: '', linkedin: 'https://www.linkedin.com/in/ramyalnkdn/', quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
  { name: 'Sathish J', role: 'Web & Tech', dept: 'IT', image: '/team/sath.webp', instagram: '', linkedin: '', quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
  { name: 'Sadha Shree N', role: 'Marketing', dept: '', image: '/team/sad.jpg', instagram: '', linkedin: '', quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
  { name: 'Devika S', role: 'Marketing', dept: '', image: '/team/dev.jpg', instagram: '', linkedin: '', quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
  { name: 'Sandhiya', role: 'Design', dept: 'Media Science', image: '/team/sann.png', instagram: '', linkedin: '', quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
  { name: 'Aadhisesha D', role: 'Design', dept: 'CSE', image: '/team/aad.png', instagram: '', linkedin: '', quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
  { name: 'Madhumitha S', role: 'Design', dept: 'CSE', image: '/team/mad.jpg', instagram: '', linkedin: '', quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
  { name: 'Sivapriya S', role: 'Events', dept: 'CSE', image: '/team/siv.jpg', instagram: '', linkedin: '', quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
  { name: 'Poojana S', role: 'Events', dept: 'CSE', image: '/team/poo.jpg', instagram: '', linkedin: '', quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
  { name: 'Rishitha K P', role: 'Events', dept: 'Geoinformatics', image: '/team/image.png', instagram: '', linkedin: '', quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
  { name: 'Santoshi', role: 'Coordinator', dept: 'CSE', image: '/team/sant.jpg', instagram: '', linkedin: '', quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
  { name: 'Yazhvendhan', role: 'Coordinator', dept: 'CSE', image: '/team/yaz.jpeg', instagram: '', linkedin: '', quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' }
];

function TeamSection({ title, members, scrollerId }) {
  return (
    <div style={{ marginBottom: '3rem' }}>
      {title && <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>{title}</h3>}
      <div style={{ width: '100%', overflow: 'hidden', position: 'relative' }} id={scrollerId}>
        <div
          className="no-scrollbar"
          style={{
            display: 'flex',
            gap: '1rem',
            overflowX: 'auto',
            scrollBehavior: 'smooth',
            paddingBottom: '1rem',
          }}
        >
          {members.map((m, i) => (
            <div key={i} style={{ flex: '0 0 auto' }}>
              <TeamMemberCard {...m} />
            </div>
          ))}
        </div>

        <button
          className="scroll-arrow"
          onClick={() =>
            document.querySelector(`#${scrollerId} .no-scrollbar`)?.scrollBy({ left: -280, behavior: 'smooth' })
          }
          style={{
            position: 'absolute',
            left: 0,
            top: '45%',
            transform: 'translateY(-50%)',
            width: 50,
            height: 50,
            borderRadius: '50%',
            border: '2px solid rgba(0,0,0,0.1)',
            background: 'rgba(255,255,255,0.95)',
            backdropFilter: 'blur(10px)',
            cursor: 'pointer',
            fontSize: '28px',
            color: '#333',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10,
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255,255,255,1)';
            e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255,255,255,0.95)';
            e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
          }}
        >
          ‹
        </button>

        <button
          className="scroll-arrow"
          onClick={() =>
            document.querySelector(`#${scrollerId} .no-scrollbar`)?.scrollBy({ left: 280, behavior: 'smooth' })
          }
          style={{
            position: 'absolute',
            right: 0,
            top: '45%',
            transform: 'translateY(-50%)',
            width: 50,
            height: 50,
            borderRadius: '50%',
            border: '2px solid rgba(0,0,0,0.1)',
            background: 'rgba(255,255,255,0.95)',
            backdropFilter: 'blur(10px)',
            cursor: 'pointer',
            fontSize: '28px',
            color: '#333',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10,
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255,255,255,1)';
            e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255,255,255,0.95)';
            e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
          }}
        >
          ›
        </button>
      </div>
    </div>
  );
}

function Navbar({ onAboutClick, onJoinClick }) {
  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      background: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(10px)',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      padding: '1rem 2rem'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <img src="/logo.png" alt="Scribbles" style={{ width: 40, height: 40 }} />
          <span style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>Scribbles Art Club</span>
        </div>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <button onClick={onAboutClick} style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: '1rem',
            fontWeight: '500'
          }}>About Us</button>
          <Link to="/newsletter" style={{ textDecoration: 'none', fontSize: '1rem', fontWeight: '500' }}>Newsletter</Link>
          <button onClick={onJoinClick} className="btn primary" style={{ padding: '0.5rem 1rem' }}>Join</button>
        </div>
      </div>
    </nav>
  );
}

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
  { title: 'Art Gallery', desc: 'Explore curated artworks from our collection.', href: '/art-gallery', isInternal: true },
  { title: 'Creative Journal', desc: 'Read inspiring posts, tutorials, and art stories.', href: '/journal', isInternal: true },
  { title: 'Gallery', desc: 'Curated works from weekly drops.', href: '/gallery', isInternal: true },
  { title: 'Events', desc: 'Workshops, sketchwalks, pop-ups.', href: 'events.html' },
  { title: 'Blog', desc: 'Process notes, prompts, and tips.', href: 'blog.html' },
  { title: 'Contact', desc: 'Reach us for collabs and invites.', href: 'contact.html' },
  { title: 'Testimonials', desc: 'What members, alumni, and collaborators say about Scribbles.', href: '/testimonials', isInternal: true },
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
          <Link className="btn ghost" to="/art-gallery">Art Gallery</Link>
          <Link className="btn ghost" to="/journal">Creative Journal</Link>
          <Link className="btn ghost" to="/testimonials">Testimonials</Link>
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
        <Link className="btn block" to="/art-gallery">Art Gallery</Link>
        <Link className="btn block" to="/journal">Creative Journal</Link>
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

 

function AboutSection() {
  const handleMeetTeam = () => {
    document.getElementById('team-section')?.scrollIntoView({ behavior: 'smooth' });
  };
  const handleStoryClick = () => {
    document.getElementById('story-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="about-section" className="section" style={{ paddingTop: '6rem' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>About Scribbles</h2>
        <p className="muted" style={{ fontSize: '1.2rem', lineHeight: '1.8' }}>
          Scribbles Art Club is a creative collective built on curiosity, expression, and community. 
          We sketch, paint, explore, and grow together through weekly prompts, featured drops, 
          critique circles, and events. Built for curious illustrators and makers who love to create.
        </p>
        <div style={{ marginTop: '2rem', display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button onClick={handleMeetTeam} className="btn primary">Meet Our Team</button>
          <button onClick={handleStoryClick} className="btn ghost">The Scribbles Story</button>
          <Link to="/art-gallery" className="btn ghost">Art Gallery</Link>
          <Link to="/journal" className="btn ghost">Creative Journal</Link>
          <Link to="/video" className="btn ghost">The Official Intro Video!</Link>
        </div>
      </div>
    </section>
  );
}

// ===== THE SCRIBBLES STORY TIMELINE =====
const milestones = [
  { date: '2018 — Founding Year', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero.' },
  { date: '2019 — First Campus Exhibition', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed cursus ante dapibus diam.' },
  { date: '2020 — Community Sketchwalks', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quis sem at nibh elementum.' },
  { date: '2021 — Digital Weekly Prompts', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur blandit tempus porttitor.' },
  { date: '2022 — Artist Talks & Workshops', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum id ligula porta felis euismod.' },
  { date: '2023 — Inter-College Collaborations', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras mattis consectetur purus sit amet fermentum.' },
  { date: '2024 — Newsletter & Zine Launch', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas faucibus mollis interdum.' },
  { date: '2025 — Scribbles Art Fest', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean lacinia bibendum nulla sed consectetur.' },
];

function StorySection() {
  return (
    <section id="story-section" className="section" style={{ paddingTop: '2rem' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <div className="section-header">
          <h2 style={{ fontSize: '2.2rem' }}>The Scribbles Story</h2>
        </div>
        <div className="timeline">
          {milestones.map((m, i) => (
            <div key={i} className="timeline-item">
              <span className="timeline-dot" style={{ '--dot-hue': 180 + (i % 6) * 40 }} />
              <h4 style={{ margin: 0, fontSize: '1.4rem' }}><strong>{m.date}</strong></h4>
              <p className="muted" style={{ marginTop: '8px', fontSize: '1.1rem', lineHeight: 1.8 }}>{m.text}</p>
            </div>
          ))}
        </div>
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

  const handleAboutClick = () => {
    document.getElementById('about-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Apply the home background image to the body while on Home
  useEffect(() => {
    document.body.classList.add('home-bg');
    return () => {
      document.body.classList.remove('home-bg');
    };
  }, []);

  return (
  <div className="page" style={{ position: "relative", overflow: "hidden" }}>
    <Navbar onAboutClick={handleAboutClick} onJoinClick={handleJoinClick} />
    
    {/* 🎨 Pastel raindrop background */}
    <div className="pastel-rain-layer" style={{ marginTop: '80px' }}>
      {Array.from({ length: 60 }).map((_, i) => (
        <span
          key={i}
          className="pastel-drop"
          style={{
            left: `${Math.random() * 100}%`,
            animationDuration: `${9 + Math.random() * 8}s`,
            animationDelay: `${Math.random() * 5}s`,
            opacity: 0.3 + Math.random() * 0.5,
            width: `${4 + Math.random() * 6}px`,
            height: `${4 + Math.random() * 6}px`,
            "--hue": Math.floor(180 + Math.random() * 360),
          }}
        />
      ))}
    </div>

    <Hero onJoinClick={handleJoinClick} />
    <FeaturedSlider />
    <QuickButtons onJoinClick={handleJoinClick} />
    <NavigationBlocks onJoinClick={handleJoinClick} />
    <AboutSection />
    <StorySection />
    
    {/* ===== TEAM SECTIONS ===== */}
    <section className="section" id="team-section" style={{ paddingTop: '4rem' }}>
      <h2 style={{ fontSize: '2.2rem', marginBottom: '2rem', textAlign: 'center' }}>Office Bearers</h2>
      <TeamSection title="" members={officeBearers} scrollerId="office-bearers-scroll" />
    </section>

    <section className="section">
      <h2 style={{ fontSize: '2.2rem', marginBottom: '2rem', textAlign: 'center' }}>Deputy Heads</h2>
      <TeamSection title="" members={deputyHeads} scrollerId="deputy-heads-scroll" />
    </section>

    <JoinModal isOpen={modalOpen} onClose={handleCloseModal} />
    <Footer />
  </div>
);

}
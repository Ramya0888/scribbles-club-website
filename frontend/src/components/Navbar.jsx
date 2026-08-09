import React from 'react';
import { Link } from 'react-router-dom';

const linkStyle = {
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  fontSize: '1rem',
  fontWeight: '500',
  color: '#333',
  textDecoration: 'none',
};

export default function Navbar({ onAboutClick, onJoinClick }) {
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
      padding: '1rem 2rem',
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1rem',
        flexWrap: 'wrap',
      }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none', color: 'inherit' }}>
          <img src="/logo.png" alt="Scribbles" style={{ width: 40, height: 40 }} />
          <span style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>Scribbles Art Club</span>
        </Link>
        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <Link to="/events" style={linkStyle}>Events</Link>
          <Link to="/gallery" style={linkStyle}>Gallery</Link>
          <Link to="/video" style={linkStyle}>Intro Video</Link>
          <Link to="/testimonials" style={linkStyle}>Testimonials</Link>
          <Link to="/newsletter" style={linkStyle}>Newsletter</Link>
          <Link to="/contact" style={linkStyle}>Contact Us</Link>
          {onAboutClick && (
            <button onClick={onAboutClick} style={linkStyle}>About Us</button>
          )}
          {onJoinClick && (
            <button onClick={onJoinClick} className="btn primary" style={{ padding: '0.5rem 1rem' }}>Join</button>
          )}
        </div>
      </div>
    </nav>
  );
}
import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function JoinModal({ onClose }) {
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

export default function Navbar({ onAboutClick }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [joinOpen, setJoinOpen] = useState(false);
  const navRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!menuOpen) return;
    function handleClickOutside(event) {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  const handleAbout = () => {
    closeMenu();
    if (onAboutClick) {
      onAboutClick();
    } else {
      navigate('/', { state: { scrollTo: 'about-section' } });
    }
  };

  const handleJoin = () => {
    closeMenu();
    setJoinOpen(true);
  };

  return (
    <>
      <nav className="navbar" ref={navRef}>
        <div className="navbar-inner">
          <Link
            to="/"
            className="navbar-brand"
            onClick={closeMenu}
          >
            <img src="/logo.png" alt="Scribbles" />
            <span>Scribbles Art Club</span>
          </Link>

          <button
            className={`navbar-toggle ${menuOpen ? 'open' : ''}`}
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span />
            <span />
            <span />
          </button>

          <div className={`navbar-links ${menuOpen ? 'open' : ''}`}>
            <Link to="/" onClick={closeMenu} style={{ textDecoration: 'none' }}>Home</Link>
            <Link to="/events" onClick={closeMenu} style={{ textDecoration: 'none' }}>Events</Link>
            <Link to="/gallery" onClick={closeMenu} style={{ textDecoration: 'none' }}>Gallery</Link>
            <Link to="/video" onClick={closeMenu} style={{ textDecoration: 'none' }}>Intro Video</Link>
            <Link to="/testimonials" onClick={closeMenu} style={{ textDecoration: 'none' }}>Testimonials</Link>
            <Link to="/newsletter" onClick={closeMenu} style={{ textDecoration: 'none' }}>Newsletter</Link>
            <Link to="/contact" onClick={closeMenu} style={{ textDecoration: 'none' }}>Contact Us</Link>
            <button className="navbar-link-btn" onClick={handleAbout}>About Us</button>
            <button className="navbar-link-btn navbar-join" onClick={handleJoin}>Join</button>
          </div>
        </div>
      </nav>

      {joinOpen && <JoinModal onClose={() => setJoinOpen(false)} />}
    </>
  );
}
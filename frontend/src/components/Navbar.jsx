import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

function FlipText({ text }) {
  return (
    <span className="flip-text">
      {Array.from(text).map((ch, i) => (
        <span className="flip-letter" key={i} style={{ '--i': i }}>
          <span className="flip-face flip-front">{ch === ' ' ? '\u00A0' : ch}</span>
          <span className="flip-face flip-back">{ch === ' ' ? '\u00A0' : ch}</span>
        </span>
      ))}
    </span>
  );
}

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
            href="https://whatsapp.com/channel/0029Vb6K9wSD38CMsi1OGE1X"
            target="_blank"
            rel="noopener noreferrer"
            className="modal-link"
          >
            <span className="link-icon">💬</span>
            <span className="link-text">
              <strong>WhatsApp Channel</strong>
              <span className="link-desc">Follow our updates</span>
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
  const { pathname } = useLocation();
  const { theme, toggleTheme } = useTheme();

  const isActive = (path) => pathname === path;

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
            <img className="logo-circle" src="/S.png" alt="Scribbles" />
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
            <Link to="/" onClick={closeMenu} className={isActive('/') ? 'active' : ''} style={{ textDecoration: 'none' }}><FlipText text="Home" /></Link>
            <Link to="/events" onClick={closeMenu} className={isActive('/events') ? 'active' : ''} style={{ textDecoration: 'none' }}><FlipText text="Events" /></Link>
            <Link to="/gallery" onClick={closeMenu} className={isActive('/gallery') ? 'active' : ''} style={{ textDecoration: 'none' }}><FlipText text="Gallery" /></Link>
            <Link to="/blog" onClick={closeMenu} className={isActive('/blog') ? 'active' : ''} style={{ textDecoration: 'none' }}><FlipText text="Blog" /></Link>
            <Link to="/video" onClick={closeMenu} className={isActive('/video') ? 'active' : ''} style={{ textDecoration: 'none' }}><FlipText text="Intro Video" /></Link>
            <Link to="/testimonials" onClick={closeMenu} className={isActive('/testimonials') ? 'active' : ''} style={{ textDecoration: 'none' }}><FlipText text="Testimonials" /></Link>
            <Link to="/newsletter" onClick={closeMenu} className={isActive('/newsletter') ? 'active' : ''} style={{ textDecoration: 'none' }}><FlipText text="Newsletter" /></Link>
            <Link to="/contact" onClick={closeMenu} className={isActive('/contact') ? 'active' : ''} style={{ textDecoration: 'none' }}><FlipText text="Contact Us" /></Link>
            <button className="navbar-link-btn" onClick={handleAbout}><FlipText text="About Us" /></button>
            <button className="navbar-link-btn navbar-join" onClick={handleJoin}><FlipText text="Join" /></button>
            <button
              className="theme-toggle"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
              title={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
            >
              <span>{theme === 'light' ? '🌙' : '☀️'}</span>
              <span>{theme === 'light' ? 'Dark' : 'Light'}</span>
            </button>
          </div>
        </div>
      </nav>

      {joinOpen && <JoinModal onClose={() => setJoinOpen(false)} />}
    </>
  );
}
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar({ onAboutClick, onJoinClick }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef(null);

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
    onAboutClick?.();
  };

  const handleJoin = () => {
    closeMenu();
    onJoinClick?.();
  };

  const linkProps = (extra) => ({
    style: { textDecoration: 'none' },
    ...extra,
  });

  return (
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
          <Link to="/events" onClick={closeMenu} {...linkProps()}>Events</Link>
          <Link to="/gallery" onClick={closeMenu} {...linkProps()}>Gallery</Link>
          <Link to="/video" onClick={closeMenu} {...linkProps()}>Intro Video</Link>
          <Link to="/testimonials" onClick={closeMenu} {...linkProps()}>Testimonials</Link>
          <Link to="/newsletter" onClick={closeMenu} {...linkProps()}>Newsletter</Link>
          <Link to="/contact" onClick={closeMenu} {...linkProps()}>Contact Us</Link>
          {onAboutClick && (
            <button className="navbar-link-btn" onClick={handleAbout}>About Us</button>
          )}
          {onJoinClick && (
            <button className="navbar-link-btn navbar-join" onClick={handleJoin}>Join</button>
          )}
        </div>
      </div>
    </nav>
  );
}
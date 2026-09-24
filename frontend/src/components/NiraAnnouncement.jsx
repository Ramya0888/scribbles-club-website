import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import './NiraAnnouncement.css';

const SESSION_KEY = 'scribbles-nira-announcement-closed';

export default function NiraAnnouncement() {
  const [isPopupOpen, setIsPopupOpen] = useState(() => {
    try {
      return sessionStorage.getItem(SESSION_KEY) !== 'true';
    } catch {
      return true;
    }
  });
  const closeButtonRef = useRef(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!isPopupOpen) return undefined;

    closeButtonRef.current?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setIsPopupOpen(false);
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isPopupOpen]);

  const closePopup = () => {
    try {
      sessionStorage.setItem(SESSION_KEY, 'true');
    } catch {
      // The banner still provides a useful fallback if storage is unavailable.
    }
    setIsPopupOpen(false);
  };

  const transition = reduceMotion
    ? { duration: 0 }
    : { duration: 0.38, ease: [0.22, 1, 0.36, 1] };

  return (
    <AnimatePresence initial={false} mode="wait">
      {isPopupOpen ? (
        <motion.div
          className="nira-announcement-overlay"
          role="presentation"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={transition}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closePopup();
          }}
        >
          <motion.section
            className="nira-announcement-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="nira-announcement-title"
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 28, scale: 0.96 }}
            animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -18, scale: 0.97 }}
            transition={transition}
          >
            <button
              ref={closeButtonRef}
              className="nira-announcement-close"
              type="button"
              aria-label="Close Nira announcement"
              onClick={closePopup}
            >
              <span aria-hidden="true">×</span>
            </button>

            <div className="nira-announcement-copy">
              <p className="eyebrow">A new Scribbles chapter</p>
              <h2 id="nira-announcement-title">Meet Nira.</h2>
              <p>Something thoughtful, playful, and made to be explored is on its way.</p>
              <Link className="btn primary nira-announcement-action" to="/nira" onClick={closePopup}>
                Explore NIRA <span aria-hidden="true">→</span>
              </Link>
            </div>

            <div className="nira-announcement-poster-wrap">
              <img
                src="/Nira/Nira_poster.jpeg"
                alt="Nira event poster"
                className="nira-announcement-poster"
              />
            </div>
          </motion.section>
        </motion.div>
      ) : (
        <motion.aside
          className="nira-announcement-banner"
          aria-label="Nira announcement"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={transition}
        >
          <div>
            <span className="nira-announcement-banner-label">NIRA 2026</span>
            <span className="nira-announcement-banner-copy">A new Scribbles chapter awaits.</span>
          </div>
          <Link className="btn primary nira-announcement-banner-action" to="/nira">
            Explore NIRA <span aria-hidden="true">→</span>
          </Link>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
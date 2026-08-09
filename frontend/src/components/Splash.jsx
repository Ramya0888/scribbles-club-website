import React, { useEffect, useRef, useState } from 'react';
import '../styles/splash.css';

export default function Splash() {
  const [hidden, setHidden] = useState(false);
  const [gone, setGone] = useState(false);
  const textRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setGone(true);
      return;
    }

    const tFly = setTimeout(() => {
      const brand = document.querySelector('.navbar-brand span');
      const text = textRef.current;
      if (!brand || !text) return;
      const r = brand.getBoundingClientRect();
      text.style.transition =
        'left 0.7s cubic-bezier(0.4, 0, 0.2, 1), top 0.7s cubic-bezier(0.4, 0, 0.2, 1), transform 0.7s cubic-bezier(0.4, 0, 0.2, 1), font-size 0.7s cubic-bezier(0.4, 0, 0.2, 1)';
      text.style.left = r.left + 'px';
      text.style.top = r.top + r.height / 2 + 'px';
      text.style.transform = 'translate(0, -50%)';
      text.style.fontSize = '1.2rem';
    }, 4150);

    const t1 = setTimeout(() => setHidden(true), 4900);
    const t2 = setTimeout(() => setGone(true), 5650);
    return () => {
      clearTimeout(tFly);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  if (gone) return null;

  return (
    <div className={`splash-root ${hidden ? 'hide' : ''}`} aria-hidden="true">
      <div className="splash-geo">
        <div className="splash_logo">
          <img src="/logo.png" alt="Scribbles" />
        </div>
        <div className="splash_svg">
          <svg width="100%" height="100%">
            <rect width="100%" height="100%"></rect>
          </svg>
        </div>
        <div className="splash_minimize">
          <svg width="100%" height="100%">
            <rect width="100%" height="100%"></rect>
          </svg>
        </div>
      </div>
      <div className="splash-text" ref={textRef}>
        <p>Scribbles Art Club</p>
      </div>
    </div>
  );
}
import React, { useEffect, useRef, useState } from 'react';
import '../styles/splash.css';

export default function Splash() {
  const [gone, setGone] = useState(false);
  const textRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setGone(true);
      return;
    }

    document.body.classList.add('splash-live');

    const measure = () => {
      const brand = document.querySelector('.navbar-brand span');
      if (!brand) return null;
      return brand.getBoundingClientRect();
    };

    const snapToBrand = () => {
      const text = textRef.current;
      const brand = document.querySelector('.navbar-brand span');
      if (!text || !brand) return;
      const cs = window.getComputedStyle(brand);
      text.style.lineHeight = cs.lineHeight;
      const tr = text.getBoundingClientRect();
      const br = brand.getBoundingClientRect();
      const curLeft = parseFloat(text.style.left);
      const curTop = parseFloat(text.style.top);
      if (!Number.isFinite(curLeft) || !Number.isFinite(curTop)) return;
      text.style.transition = 'none';
      text.style.left = curLeft + (br.left - tr.left) + 'px';
      text.style.top = curTop + (br.top - tr.top) + 'px';
    };

    const tFly = setTimeout(() => {
      const text = textRef.current;
      const r = measure();
      if (!r || !text) return;
      text.style.transition =
        'left 0.7s cubic-bezier(0.4, 0, 0.2, 1), top 0.7s cubic-bezier(0.4, 0, 0.2, 1), transform 0.7s cubic-bezier(0.4, 0, 0.2, 1), font-size 0.7s cubic-bezier(0.4, 0, 0.2, 1)';
      text.style.left = r.left + 'px';
      text.style.top = r.top + r.height / 2 + 'px';
      text.style.transform = 'translate(0, -50%)';
      text.style.fontSize = '1.2rem';
      document.body.classList.remove('splash-live');
    }, 4150);

    const tFix = setTimeout(() => {
      snapToBrand();
      const text = textRef.current;
      const brand = document.querySelector('.navbar-brand span');
      if (text && brand) {
        const cs = window.getComputedStyle(brand);
        const tr = text.getBoundingClientRect();
        const br = brand.getBoundingClientRect();
        console.table({
          'brand rect': { left: br.left, top: br.top, w: br.width, h: br.height },
          'loader rect': { left: tr.left, top: tr.top, w: tr.width, h: tr.height },
          deltaPx: { x: br.left - tr.left, y: br.top - tr.top },
          brandFont: cs.fontFamily,
          lineHeight: cs.lineHeight,
        });
      }
    }, 4900);

    const tGone = setTimeout(() => setGone(true), 5500);
    return () => {
      clearTimeout(tFly);
      clearTimeout(tFix);
      clearTimeout(tGone);
      document.body.classList.remove('splash-live');
    };
  }, []);

  if (gone) return null;

  return (
    <div className="splash-root" aria-hidden="true">
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
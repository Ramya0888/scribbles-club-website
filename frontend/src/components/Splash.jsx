import React, { useEffect, useRef, useState } from 'react';
import '../styles/splash.css';

export default function Splash() {
  const [gone, setGone] = useState(false);
  const textRef = useRef(null);
  const logoRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setGone(true);
      return;
    }

    document.body.classList.add('splash-live');

    let rafId = null;

    const measure = () => {
      const span = document.querySelector('.navbar-brand span');
      const img = document.querySelector('.navbar-brand img');
      return {
        span: span ? span.getBoundingClientRect() : null,
        img: img ? img.getBoundingClientRect() : null,
      };
    };

    const snapToBrand = () => {
      const text = textRef.current;
      const logo = logoRef.current;
      const span = document.querySelector('.navbar-brand span');
      const img = document.querySelector('.navbar-brand img');
      if (!span || !text) return;
      const cs = window.getComputedStyle(span);
      text.style.font = cs.font;
      text.style.lineHeight = cs.lineHeight;
      text.style.letterSpacing = cs.letterSpacing;
      const tr = text.getBoundingClientRect();
      const sr = span.getBoundingClientRect();
      const curLeft = parseFloat(text.style.left);
      const curTop = parseFloat(text.style.top);
      if (Number.isFinite(curLeft) && Number.isFinite(curTop)) {
        text.style.transition = 'none';
        text.style.left = curLeft + (sr.left - tr.left) + 'px';
        text.style.top = curTop + (sr.top - tr.top) + 'px';
      }
      if (img && logo) {
        const lr = logo.getBoundingClientRect();
        const nr = img.getBoundingClientRect();
        const lLeft = parseFloat(logo.style.left);
        const lTop = parseFloat(logo.style.top);
        if (Number.isFinite(lLeft) && Number.isFinite(lTop)) {
          logo.style.transition = 'none';
          logo.style.left =
            lLeft + (nr.left + nr.width / 2 - (lr.left + lr.width / 2)) + 'px';
          logo.style.top =
            lTop + (nr.top + nr.height / 2 - (lr.top + lr.height / 2)) + 'px';
        }
      }
    };

    const tFly = setTimeout(() => {
      const text = textRef.current;
      const logo = logoRef.current;
      const r = measure();
      if (!r.span || !text) return;
      text.style.transition =
        'left 0.55s cubic-bezier(0.4, 0, 0.2, 1), top 0.55s cubic-bezier(0.4, 0, 0.2, 1), transform 0.55s cubic-bezier(0.4, 0, 0.2, 1), font-size 0.55s cubic-bezier(0.4, 0, 0.2, 1)';
      text.style.left = r.span.left + 'px';
      text.style.top = r.span.top + r.span.height / 2 + 'px';
      text.style.transform = 'translate(0, -50%)';
      text.style.fontSize = '1.2rem';
      if (r.img && logo) {
        logo.style.transition =
          'left 0.55s cubic-bezier(0.4, 0, 0.2, 1), top 0.55s cubic-bezier(0.4, 0, 0.2, 1), width 0.55s cubic-bezier(0.4, 0, 0.2, 1), height 0.55s cubic-bezier(0.4, 0, 0.2, 1)';
        logo.style.left = r.img.left + r.img.width / 2 + 'px';
        logo.style.top = r.img.top + r.img.height / 2 + 'px';
        logo.style.width = '40px';
        logo.style.height = '40px';
        logo.classList.add('flying');
      }
      document.body.classList.add('brand-hiding');
      document.body.classList.remove('splash-live');
    }, 3900);

    const tFix = setTimeout(() => {
      const start = performance.now();
      const tick = () => {
        snapToBrand();
        if (performance.now() - start < 200) {
          rafId = requestAnimationFrame(tick);
        }
      };
      rafId = requestAnimationFrame(tick);
    }, 4450);

    const tSwap = setTimeout(() => {
      cancelAnimationFrame(rafId);
      snapToBrand();
      const kill = (el) => {
        if (!el) return;
        el.style.animation = 'none';
        el.style.transition = 'none';
        el.style.opacity = '0';
        el.style.visibility = 'hidden';
      };
      kill(textRef.current);
      kill(logoRef.current);
      document.body.classList.remove('brand-hiding');
    }, 4650);

    const tGone = setTimeout(() => setGone(true), 5000);
    return () => {
      clearTimeout(tFly);
      clearTimeout(tFix);
      clearTimeout(tSwap);
      clearTimeout(tGone);
      cancelAnimationFrame(rafId);
      document.body.classList.remove('splash-live');
      document.body.classList.remove('brand-hiding');
    };
  }, []);

  if (gone) return null;

  return (
    <div className="splash-root" aria-hidden="true">
      <div className="splash-geo">
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
      <div className="splash_logo" ref={logoRef}>
        <img src="/logo.png" alt="Scribbles" />
      </div>
      <div className="splash-text" ref={textRef}>
        <p>Scribbles Art Club</p>
      </div>
    </div>
  );
}

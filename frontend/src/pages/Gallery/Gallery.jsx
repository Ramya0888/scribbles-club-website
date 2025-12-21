import React from "react";
import { Link } from "react-router-dom";
import Footer from '../../components/Footer';

const fests = [
  { image: "https://images.unsplash.com/photo-1531058020387-3be3446e1600?auto=format&fit=crop&w=1200&q=80", caption: "Fest 1" },
  { image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80", caption: "Fest 2" },
  { image: "https://images.unsplash.com/photo-1549880338-65ddcdfd017b?auto=format&fit=crop&w=1200&q=80", caption: "Fest 3" },
  { image: "https://images.unsplash.com/photo-1496317556649-f930d733eea3?auto=format&fit=crop&w=1200&q=80", caption: "Fest 4" },
  { image: "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80", caption: "Fest 5" },
];

const openCalls = [
  { image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=80", caption: "Open Call 1" },
  { image: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&w=1200&q=80", caption: "Open Call 2" },
  { image: "https://images.unsplash.com/photo-1504198458649-3128b932f49b?auto=format&fit=crop&w=1200&q=80", caption: "Open Call 3" },
  { image: "https://images.unsplash.com/photo-1526312426976-593c6c07e024?auto=format&fit=crop&w=1200&q=80", caption: "Open Call 4" },
  { image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=1200&q=80", caption: "Open Call 5" },
];

const exhibitions = [
  { image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80", caption: "Exhibition 1" },
  { image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1200&q=80", caption: "Exhibition 2" },
  { image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=1200&q=80", caption: "Exhibition 3" },
  { image: "https://images.unsplash.com/photo-1492724441997-5dc865305da7?auto=format&fit=crop&w=1200&q=80", caption: "Exhibition 4" },
  { image: "https://images.unsplash.com/photo-1516574187841-283f33370ca0?auto=format&fit=crop&w=1200&q=80", caption: "Exhibition 5" },
];

function GalleryRow({ title, items, scrollerId }) {
  return (
    <section className="section">
      <div className="section-header">
        <h2>{title}</h2>
      </div>
      <div style={{ width: '100%', overflow: 'hidden', position: 'relative' }} id={scrollerId}>
        <div
          className="no-scrollbar gallery-row"
          style={{ display: 'flex', gap: '12px', overflowX: 'auto', scrollBehavior: 'smooth', paddingBottom: '12px' }}
        >
          {items.map((it, i) => (
            <figure key={i} className="gallery-card horizontal" style={{ flex: '0 0 auto' }}>
              <img src={it.image} alt={it.caption} />
              <figcaption className="muted">{it.caption}</figcaption>
            </figure>
          ))}
        </div>

        <button
          className="scroll-arrow"
          onClick={() =>
            document.querySelector(`#${scrollerId} .gallery-row`)?.scrollBy({ left: -380, behavior: 'smooth' })
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
        >
          ‹
        </button>

        <button
          className="scroll-arrow"
          onClick={() =>
            document.querySelector(`#${scrollerId} .gallery-row`)?.scrollBy({ left: 380, behavior: 'smooth' })
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
        >
          ›
        </button>
      </div>
    </section>
  );
}

export default function GalleryPage() {
  return (
    <div className="gallery-page" style={{ position: "relative", overflow: "hidden" }}>
      <div className="pastel-rain-layer" style={{ marginTop: "80px" }}>
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
      <Link className="back-link" to="/">← Back to Home</Link>
      <header className="section-header center">
        <p className="eyebrow">Artistic Photo Collage</p>
        <h2 className="curly-title">Our Gallery</h2>
      </header>
      <GalleryRow title="Fests" items={fests} scrollerId="gallery-fests" />
      <GalleryRow title="Open Calls" items={openCalls} scrollerId="gallery-open-calls" />
      <GalleryRow title="Exhibitions" items={exhibitions} scrollerId="gallery-exhibitions" />
      <Footer />
    </div>
  );
}

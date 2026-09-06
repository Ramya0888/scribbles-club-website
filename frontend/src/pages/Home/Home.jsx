import React, { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import TeamMemberCard from '../About/TeamMemberCard';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import PastelRain from '../../components/PastelRain';
import { officeBearers, deputyHeads, milestones } from '../../data/team';



function TeamSection({ title, members, scrollerId }) {
  const scrollerRef = React.useRef(null);
  const [canLeft, setCanLeft] = React.useState(false);
  const [canRight, setCanRight] = React.useState(true);
  const CARD_STEP = 268;
  const check = React.useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 12);
    setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 12);
  }, []);
  React.useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    check();
    el.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    return () => { el.removeEventListener("scroll", check); window.removeEventListener("resize", check); };
  }, [check]);
  return (
    <div style={{ marginBottom: '3rem' }}>
      {title && <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>{title}</h3>}
      <div style={{ width: '100%', overflow: 'hidden', position: 'relative' }} id={scrollerId}>
        <div
          ref={scrollerRef}
          className="no-scrollbar"
          style={{
            display: 'flex',
            gap: '1rem',
            overflowX: 'auto',
            scrollBehavior: 'smooth',
            paddingBottom: '1rem',
            scrollSnapType: 'x mandatory',
            scrollPaddingInline: '12px',
          }}
        >
          {members.map((m, i) => (
            <div key={`${scrollerId}-${i}`} style={{ flex: '0 0 auto', scrollSnapAlign: 'start' }}>
              <TeamMemberCard {...m} />
            </div>
          ))}
        </div>
        <button className="scroll-arrow" aria-label="Scroll left" disabled={!canLeft} onClick={() => scrollerRef.current?.scrollBy({ left: -CARD_STEP, behavior: 'smooth' })} style={{ position: 'absolute', left: 8, top: '50%', transform: 'translateY(-50%)', width: 44, height: 44, borderRadius: '50%', border: '2px solid rgba(0,0,0,0.1)', background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(10px)', fontSize: '24px', color: '#333', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10, boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}>‹</button>
        <button className="scroll-arrow" aria-label="Scroll right" disabled={!canRight} onClick={() => scrollerRef.current?.scrollBy({ left: CARD_STEP, behavior: 'smooth' })} style={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', width: 44, height: 44, borderRadius: '50%', border: '2px solid rgba(0,0,0,0.1)', background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(10px)', fontSize: '24px', color: '#333', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10, boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}>›</button>
      </div>
    </div>
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

function Hero() {
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
      </div>
    </header>
  );
}

function FeaturedSlider() {
  const [index, setIndex] = useState(0);
  const count = featuredArtworks.length;
  useEffect(() => {
    const id = setInterval(() => setIndex((prev) => (prev + 1) % count), 5200);
    return () => clearInterval(id);
  }, [count]);
  const current = useMemo(() => featuredArtworks[index], [index]);
  return (
    <section id="featured" className="card section">
      <div className="section-header">
        <div>
          <p className="eyebrow">Weekly Featured</p>
          <h2>Artworks Slider</h2>
        </div>
        <div className="dots" role="tablist" aria-label="Featured artworks">
          {featuredArtworks.map((_, i) => (
            <button key={i} role="tab" aria-selected={i === index} aria-label={`Go to slide ${i + 1}`} className={`dot ${i === index ? 'active' : ''}`} onClick={() => setIndex(i)} />
          ))}
        </div>
      </div>
      <div className="slider">
        <div className="slide image-card">
          <div className="slide-image">
            <img src={current.image} alt={`${current.title} by ${current.artist}`} loading="lazy" />
            <div className="badge badge-overlay">{current.tag}</div>
          </div>
          <div className="slide-body">
            <h3>{current.title}</h3>
            <p className="muted">by {current.artist}</p>
            <p className="blurb">{current.blurb}</p>
          </div>
        </div>
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
          <button onClick={handleStoryClick} className="btn ghost story-btn">The Scribbles Story</button>
        </div>
      </div>
    </section>
  );
}



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
  const location = useLocation();
  const handleAboutClick = () => {
    document.getElementById('about-section')?.scrollIntoView({ behavior: 'smooth' });
  };
  useEffect(() => {
    if (location.state?.scrollTo) {
      document.getElementById(location.state.scrollTo)?.scrollIntoView({ behavior: 'smooth' });
      window.history.replaceState({}, '');
    }
  }, [location.state]);
  useEffect(() => {
    document.body.classList.add('home-bg');
    return () => { document.body.classList.remove('home-bg'); };
  }, []);
  return (
  <div className="page" style={{ position: "relative", overflow: "hidden" }}>
    <Navbar onAboutClick={handleAboutClick} />
    <PastelRain count={32} />

    <Hero />
    <FeaturedSlider />
    <AboutSection />
    <StorySection />
    
    <section className="section" id="team-section" style={{ paddingTop: '4rem' }}>
      <h2 style={{ fontSize: 'clamp(1.6rem, 4vw, 2.2rem)', marginBottom: '1.5rem', textAlign: 'center' }}>Office Bearers</h2>
      <TeamSection title="" members={officeBearers} scrollerId="office-bearers-scroll" />
    </section>
    <section className="section">
      <h2 style={{ fontSize: 'clamp(1.6rem, 4vw, 2.2rem)', marginBottom: '1.5rem', textAlign: 'center' }}>Deputy Heads</h2>
      <TeamSection title="" members={deputyHeads} scrollerId="deputy-heads-scroll" />
    </section>

    <Footer />
  </div>
);

}
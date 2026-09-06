import React, { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import TeamMemberCard from '../About/TeamMemberCard';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const officeBearers = [
  { name: 'Sowmya', role: 'President', dept: 'IT', image: '/team/sowmya.jpeg', instagram: '', linkedin: '', quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
  { name: 'Venkatraman', role: 'President', dept: 'Manufacturing', image: '/team/ven.jpeg', instagram: '', linkedin: '', quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
  { name: 'Lavanyalakshmi', role: 'Secretary', dept: 'IT', image: '/team/lav.jpeg', instagram: '', linkedin: '', quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
  { name: 'Ramkumar S', role: 'Treasurer', dept: 'Manufacturing', image: '/team/ram.JPG', instagram: '', linkedin: '', quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
  { name: 'Mahima S', role: 'Events Team', dept: 'IT', image: '/team/mah.jpg', instagram: '', linkedin: '', quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
  { name: 'Suren M', role: 'Events Team', dept: 'Mechanical', image: '/team/sur.jpeg', instagram: '', linkedin: '', quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
  { name: 'Sujith P', role: 'Design Team', dept: 'Manufacturing', image: '', instagram: '', linkedin: '', quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
  { name: 'Shevaniga S', role: 'Design Team', dept: 'IT', image: '/team/she.jpg', instagram: '', linkedin: '', quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
  { name: 'Naziya Kouser H', role: 'Marketing Team', dept: 'IT', image: '/team/naz.jpg', instagram: '', linkedin: '', quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
  { name: 'Sandhiya S', role: 'Marketing Team', dept: 'ECE', image: '/team/san.jpg', instagram: '', linkedin: '', quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
  { name: 'Reema', role: 'Social Media & Content', dept: 'Civil', image: '/team/ree.jpeg', instagram: '', linkedin: '', quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
  { name: 'Kanal Illamathi A S', role: 'Social Media & Content', dept: 'ECE', image: '/team/kan.jpg', instagram: '', linkedin: '', quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
  { name: 'Veenasri', role: 'Social Media & Content', dept: 'ECE', image: '', instagram: '', linkedin: '', quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
  { name: 'Barath V', role: 'Public & External Relations', dept: 'ECE', image: '/team/bar.jpg', instagram: '', linkedin: '', quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
  { name: 'Preethi B', role: 'Logistics & Operations', dept: 'IT', image: '', instagram: '', linkedin: '', quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
  { name: 'Dhevadharshini A', role: 'Logistics & Operations', dept: 'ECE', image: '/team/dhe.jpg', instagram: '', linkedin: '', quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
  { name: 'Gurumoorthi R', role: 'Web & Tech Team', dept: 'CSE', image: '', instagram: '', linkedin: '', quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
  { name: 'Subi Pinsha P', role: 'Web & Tech Team', dept: 'IT', image: '', instagram: '', linkedin: '', quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
  { name: 'Sarashivasri S', role: 'Web & Tech Team', dept: 'CSE', image: '/team/sara.jpg', instagram: '', linkedin: '', quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
  { name: 'Deepak S', role: 'Web & Tech Team', dept: 'CSE', image: '', instagram: '', linkedin: '', quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
  { name: 'Shanmugapriya B', role: 'Creatives', dept: 'Material Science', image: '', instagram: '', linkedin: '', quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' }
];

const deputyHeads = [
  { name: 'Sharan Saminathan', role: 'Creatives', dept: 'CSE', image: '/team/shar.jpg', instagram: '', linkedin: '', quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
  { name: 'Roopa Varshni R', role: 'Creatives', dept: 'CSE', image: '/team/roop.png', instagram: '', linkedin: '', quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
  { name: 'Abdullah S', role: 'PR & ER', dept: 'IT', image: '/team/abd.jpg', instagram: '', linkedin: '', quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
  { name: 'Madhu Vidhyaa R', role: 'PR & ER', dept: 'Biomedical', image: '', instagram: '', linkedin: '', quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
  { name: 'Sakthi Balaji M', role: 'Logistics', dept: '', image: '', instagram: '', linkedin: '', quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
  { name: 'Lohitt Aswin V', role: 'Logistics', dept: '', image: '', instagram: '', linkedin: '', quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
  { name: 'Dharshini E', role: 'Social Media', dept: '', image: '/team/dharsE.jpg', instagram: '', linkedin: '', quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
  { name: 'Varshini Narayanan', role: 'Social Media', dept: '', image: '', instagram: '', linkedin: '', quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
  { name: 'Sheeba Jacklin A', role: 'Social Media', dept: '', image: '', instagram: '', linkedin: '', quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
  { name: 'Abirami', role: 'Web & Tech', dept: 'CSE', image: '/team/abi.webp', instagram: '', linkedin: 'https://www.linkedin.com/in/abirami-ramanathan-707521285/', quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
  { name: 'Hashim M', role: 'Web & Tech', dept: 'CSE', image: '/team/has.jpeg', instagram: '', linkedin: 'https://www.linkedin.com/in/hashim-m-160b96340/', quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
  { name: 'Ramya S', role: 'Web & Tech', dept: 'CSE', image: '/team/ramy.jpg', instagram: '', linkedin: 'https://www.linkedin.com/in/ramyalnkdn/', quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
  { name: 'Sathish J', role: 'Web & Tech', dept: 'IT', image: '/team/sath.webp', instagram: '', linkedin: '', quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
  { name: 'Sadha Shree N', role: 'Marketing', dept: '', image: '/team/sad.jpg', instagram: '', linkedin: '', quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
  { name: 'Devika S', role: 'Marketing', dept: '', image: '/team/dev.jpg', instagram: '', linkedin: '', quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
  { name: 'Sandhiya', role: 'Design', dept: 'Media Science', image: '/team/sann.png', instagram: '', linkedin: '', quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
  { name: 'Aadhisesha D', role: 'Design', dept: 'CSE', image: '/team/aad.png', instagram: '', linkedin: '', quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
  { name: 'Madhumitha S', role: 'Design', dept: 'CSE', image: '/team/mad.jpg', instagram: '', linkedin: '', quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
  { name: 'Sivapriya S', role: 'Events', dept: 'CSE', image: '/team/siv.jpg', instagram: '', linkedin: '', quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
  { name: 'Poojana S', role: 'Events', dept: 'CSE', image: '/team/poo.jpg', instagram: '', linkedin: '', quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
  { name: 'Rishitha K P', role: 'Events', dept: 'Geoinformatics', image: '/team/image.png', instagram: '', linkedin: '', quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
  { name: 'Santoshi', role: 'Coordinator', dept: 'CSE', image: '/team/sant.jpg', instagram: '', linkedin: '', quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
  { name: 'Yazhvendhan', role: 'Coordinator', dept: 'CSE', image: '/team/yaz.jpeg', instagram: '', linkedin: '', quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' }
];

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
        <div className="slide">
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
          <button onClick={handleStoryClick} className="btn ghost">The Scribbles Story</button>
        </div>
      </div>
    </section>
  );
}

// ===== THE SCRIBBLES STORY TIMELINE =====
const milestones = [
  { 
    date: '14 OCT 2025', 
    text: 'PENCIL SKETCH TUTORIALS - Learn the fundamentals of pencil sketching with professional artists.' 
  },
  { 
    date: '20 OCT 2025', 
    text: 'ART WITHOUT LIMITS - A creative workshop exploring art beyond traditional boundaries.' 
  },
  { 
    date: '23 DEC 2025', 
    text: 'ART UNPLUGGED - Disconnect from technology and reconnect with traditional art forms.' 
  },
  { 
    date: '23-24 JAN 2026', 
    text: 'FACE PAINTING - Two-day workshop on creative face painting techniques and designs.' 
  },
  { 
    date: '23 JAN 2026', 
    text: 'CHAOTIC CANVASS - Embrace the chaos and create spontaneous, expressive artworks.' 
  },
  { 
    date: '12 FEB 2026', 
    text: 'PENCIL SKETCH TUTORIAL - Advanced pencil sketching techniques for all skill levels.' 
  },
  { 
    date: '20 FEB 2026', 
    text: 'THOORIGA PRE EVENTS: Doodle Arts – Collective Canvass, Blindfold Guide Drawing Challenge, Colour Recall Challenge, Musical Sketch Challenge, No Hands Painting Challenge, Sketch and Guess Challenge.' 
  },
  { 
    date: '21 FEB 2026', 
    text: 'THOORIGA WORKSHOPS: Resin Keychain Workshop, Tote Bag Painting Workshop.' 
  },
  { 
    date: '21 FEB 2026', 
    text: 'THOORIGA EVENTS: Art Without Hands, Pass the Canvass, Mandala / Zentangle, Run and Draw, Mystery Box Craft, Sell the Scribble.' 
  },
  { 
    date: '21 FEB 2026', 
    text: 'THOORIGA SIGNATURE EVENTS: Paintball, Speed Art Battle - The ultimate creative competitions.' 
  },
  { 
    date: '27 FEB 2026', 
    text: 'TECHOFESS EVENTS: Brush Drop Beat Drop - Where art meets music and rhythm.' 
  },
  { 
    date: '28 FEB 2026', 
    text: 'TECHOFESS EVENTS: Art Mayhem - High-energy collaborative art challenges.' 
  },
  { 
    date: '13 MAR 2026', 
    text: 'TECHOFESS EVENTS: Acrylic Painting Workshop - Master acrylic painting techniques.' 
  },
  { 
    date: '14 MAR 2026', 
    text: 'TECHOFESS EVENTS: Resin Keychain Workshop - Create stunning resin accessories.' 
  },
  { 
    date: '15 MAR 2026', 
    text: 'TECHOFESS EVENTS: Clay Article Keyholder Workshop - Handcraft unique clay keyholders.' 
  },
];;

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
  const pastelDrops = useMemo(() => Array.from({ length: 32 }).map(() => ({
    left: Math.random() * 100,
    duration: 9 + Math.random() * 8,
    delay: Math.random() * 5,
    opacity: 0.3 + Math.random() * 0.4,
    size: 4 + Math.random() * 6,
    hue: Math.floor(180 + Math.random() * 180),
  })), []);
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
    <div className="pastel-rain-layer" aria-hidden="true">
      {pastelDrops.map((d, i) => (
        <span key={i} className="pastel-drop" style={{ left: `${d.left}%`, animationDuration: `${d.duration}s`, animationDelay: `${d.delay}s`, opacity: d.opacity, width: `${d.size}px`, height: `${d.size}px`, "--hue": d.hue }} />
      ))}
    </div>

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
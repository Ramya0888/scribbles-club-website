import React from "react";
import TeamMemberCard from './TeamMemberCard';

const officeBearers = [
  { name: 'Lavanyalakshmi', role: 'Secretary', dept: 'IT', image: '', instagram: '', linkedin: '', quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
  { name: 'Ramkumar S', role: 'Treasurer', dept: 'Manufacturing', image: '', instagram: '', linkedin: '', quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
  { name: 'Mahima S', role: 'Events Team', dept: 'IT', image: '', instagram: '', linkedin: '', quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
  { name: 'Suren M', role: 'Events Team', dept: 'Mechanical', image: '', instagram: '', linkedin: '', quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
  { name: 'Sujith P', role: 'Design Team', dept: 'Manufacturing', image: '', instagram: '', linkedin: '', quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
  { name: 'Shevaniga S', role: 'Design Team', dept: 'IT', image: '', instagram: '', linkedin: '', quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
  { name: 'Naziya Kouser H', role: 'Marketing Team', dept: 'IT', image: '', instagram: '', linkedin: '', quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
  { name: 'Sandhiya S', role: 'Marketing Team', dept: 'ECE', image: '', instagram: '', linkedin: '', quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
  { name: 'Reema', role: 'Social Media & Content', dept: 'Civil', image: '', instagram: '', linkedin: '', quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
  { name: 'Kanal Illamathi A S', role: 'Social Media & Content', dept: 'ECE', image: '', instagram: '', linkedin: '', quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
  { name: 'Veenasri', role: 'Social Media & Content', dept: 'ECE', image: '', instagram: '', linkedin: '', quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
  { name: 'Barath V', role: 'Public & External Relations', dept: 'ECE', image: '', instagram: '', linkedin: '', quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
  { name: 'Preethi B', role: 'Logistics & Operations', dept: 'IT', image: '', instagram: '', linkedin: '', quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
  { name: 'Dhevadharshini A', role: 'Logistics & Operations', dept: 'ECE', image: '', instagram: '', linkedin: '', quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
  { name: 'Gurumoorthi R', role: 'Web & Tech Team', dept: 'CSE', image: '', instagram: '', linkedin: '', quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
  { name: 'Subi Pinsha P', role: 'Web & Tech Team', dept: 'IT', image: '', instagram: '', linkedin: '', quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
  { name: 'Sarashivasri S', role: 'Web & Tech Team', dept: 'CSE', image: '', instagram: '', linkedin: '', quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
  { name: 'Deepak S', role: 'Web & Tech Team', dept: 'CSE', image: '', instagram: '', linkedin: '', quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
  { name: 'Shanmugapriya B', role: 'Creatives', dept: 'Material Science', image: '', instagram: '', linkedin: '', quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' }
];

const deputyHeads = [
  { name: 'Sharan Saminathan', role: 'Creatives', dept: 'CSE', image: '', instagram: '', linkedin: '', quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
  { name: 'Roopa Varshni R', role: 'Creatives', dept: 'CSE', image: '', instagram: '', linkedin: '', quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
  { name: 'Abdullah S', role: 'PR & ER', dept: 'IT', image: '', instagram: '', linkedin: '', quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
  { name: 'Madhu Vidhyaa R', role: 'PR & ER', dept: 'Biomedical', image: '', instagram: '', linkedin: '', quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
  { name: 'Sakthi Balaji M', role: 'Logistics', dept: '', image: '', instagram: '', linkedin: '', quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
  { name: 'Lohitt Aswin V', role: 'Logistics', dept: '', image: '', instagram: '', linkedin: '', quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
  { name: 'Dharshini E', role: 'Social Media', dept: '', image: '', instagram: '', linkedin: '', quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
  { name: 'Varshini Narayanan', role: 'Social Media', dept: '', image: '', instagram: '', linkedin: '', quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
  { name: 'Sheeba Jacklin A', role: 'Social Media', dept: '', image: '', instagram: '', linkedin: '', quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
  { name: 'Abirami', role: 'Web & Tech', dept: 'CSE', image: '', instagram: '', linkedin: '', quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
  { name: 'Hashim M', role: 'Web & Tech', dept: 'CSE', image: '', instagram: '', linkedin: '', quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
  { name: 'Ramya S', role: 'Web & Tech', dept: 'CSE', image: '', instagram: '', linkedin: '', quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
  { name: 'Sathish J', role: 'Web & Tech', dept: 'IT', image: '', instagram: '', linkedin: '', quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
  { name: 'Sadha Shree N', role: 'Marketing', dept: '', image: '', instagram: '', linkedin: '', quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
  { name: 'Devika S', role: 'Marketing', dept: '', image: '', instagram: '', linkedin: '', quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
  { name: 'Sandhiya', role: 'Design', dept: 'Media Science', image: '', instagram: '', linkedin: '', quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
  { name: 'Aadhisesha D', role: 'Design', dept: 'CSE', image: '', instagram: '', linkedin: '', quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
  { name: 'Madhumitha S', role: 'Design', dept: '', image: '', instagram: '', linkedin: '', quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
  { name: 'Sivapriya S', role: 'Events', dept: 'CSE', image: '', instagram: '', linkedin: '', quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
  { name: 'Poojana S', role: 'Events', dept: 'CSE', image: '', instagram: '', linkedin: '', quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
  { name: 'Rishitha K P', role: 'Events', dept: 'Geoinformatics', image: '', instagram: '', linkedin: '', quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' }
];

function TeamSection({ title, members, scrollerId }) {
  return (
    <div style={{ marginBottom: '3rem' }}>
      {title && <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>{title}</h3>}
      <div style={{ width: '100%', overflow: 'hidden', position: 'relative' }} id={scrollerId}>
        <div
          className="no-scrollbar"
          style={{
            display: 'flex',
            gap: '1rem',
            overflowX: 'auto',
            scrollBehavior: 'smooth',
            paddingBottom: '1rem',
          }}
        >
          {members.map((m, i) => (
            <div key={i} style={{ flex: '0 0 auto' }}>
              <TeamMemberCard {...m} />
            </div>
          ))}
        </div>

        <button
          className="scroll-arrow"
          onClick={() =>
            document.querySelector(`#${scrollerId} .no-scrollbar`)?.scrollBy({ left: -280, behavior: 'smooth' })
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
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255,255,255,1)';
            e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255,255,255,0.95)';
            e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
          }}
        >
          ‹
        </button>

        <button
          className="scroll-arrow"
          onClick={() =>
            document.querySelector(`#${scrollerId} .no-scrollbar`)?.scrollBy({ left: 280, behavior: 'smooth' })
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
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255,255,255,1)';
            e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255,255,255,0.95)';
            e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
          }}
        >
          ›
        </button>
      </div>
    </div>
  );
}

export default function About() {
  return (
    <div className="page about-page">

      {/* ===== HERO / INTRO ===== */}
      <section className="section about-hero" id="about-section">
        <h1 className="display-font">About Scribbles</h1>
        <p className="muted">
          Scribbles Art Club is a creative collective built on curiosity,
          expression, and community. We sketch, paint, explore, and grow together.
        </p>
      </section>

      {/* ===== OFFICE BEARERS ===== */}
      <section className="section" id="team-section">
        <h2 style={{ fontSize: '2.2rem', marginBottom: '2rem' }}>Office Bearers</h2>
        <TeamSection title="" members={officeBearers} scrollerId="office-bearers-scroll" />
      </section>

      {/* ===== DEPUTY HEADS ===== */}
      <section className="section">
        <h2 style={{ fontSize: '2.2rem', marginBottom: '2rem' }}>Deputy Heads</h2>
        <TeamSection title="" members={deputyHeads} scrollerId="deputy-heads-scroll" />
      </section>
    </div>
  );
}

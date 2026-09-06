import React, { useState, useEffect, useRef } from 'react';

const technicalTeam = [
  {
    name: 'Abirami',
    image: '/team/abi.webp',
    linkedin: 'https://www.linkedin.com/in/abirami-ramanathan-707521285/'
  },
  {
    name: 'Hashim',
    image: '/team/has.jpeg',
    linkedin: 'https://www.linkedin.com/in/hashim-m-160b96340/'
  },
  {
    name: 'Ramya',
    image: '/team/ramy.jpg',
    linkedin: 'https://www.linkedin.com/in/ramyalnkdn/'
  },
  {
    name: 'Sathish',
    image: '/team/sath.webp',
    linkedin: 'https://linkedin.com/in/sathish'
  }
];

export default function Footer() {
  const [showTeam, setShowTeam] = useState(false);
  const popupRef = useRef(null);
  const btnRef = useRef(null);
  useEffect(() => {
    function handleClickOutside(event) {
      if (popupRef.current && !popupRef.current.contains(event.target) && btnRef.current && !btnRef.current.contains(event.target)) {
        setShowTeam(false);
      }
    }
    function onKey(e) { if (e.key === "Escape") setShowTeam(false); }
    if (showTeam) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', onKey);
      return () => { document.removeEventListener('mousedown', handleClickOutside); document.removeEventListener('keydown', onKey); };
    }
  }, [showTeam]);
  return (
    <footer className="site-footer" style={{ marginTop: '4rem' }}>
      <div className="footer-content">
        <p className="footer-copyright">© 2025 Scribbles, the official Arts Club of CEG</p>
        <div className="footer-credits">
          <span>Designed by </span>
          <button ref={btnRef} className="tech-team-link" onClick={() => setShowTeam(!showTeam)} aria-expanded={showTeam} aria-haspopup="dialog" style={{ background: 'none', border: 'none', padding: 0, font: 'inherit' }}>
            Deputy Heads of Web and Dev Team, Scribbles - (2025-26)
          </button>
          {showTeam && (
            <div className="tech-team-popup" ref={popupRef} role="dialog" aria-label="Technical team">
              {technicalTeam.map((member) => (
                <a key={member.name} href={member.linkedin} target="_blank" rel="noopener noreferrer" className="tech-member">
                  <div className="tech-member-avatar"><img src={member.image} alt={member.name} loading="lazy" /></div>
                  <span className="tech-member-name">{member.name}</span>
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </footer>
  );
}

import React, { useState, useEffect, useRef } from 'react';

const technicalTeam = [
  {
    name: 'Abirami',
    image: '/team/abirami.jpg',
    linkedin: 'https://linkedin.com/in/abirami'
  },
  {
    name: 'Hashim',
    image: '/team/hashim.jpg',
    linkedin: 'https://linkedin.com/in/hashim'
  },
  {
    name: 'Ramya',
    image: '/team/ramya.jpg',
    linkedin: 'https://linkedin.com/in/ramya'
  },
  {
    name: 'Sathish',
    image: '/team/sathish.jpg',
    linkedin: 'https://linkedin.com/in/sathish'
  }
];

export default function Footer() {
  const [showTeam, setShowTeam] = useState(false);
  const popupRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setShowTeam(false);
      }
    }

    if (showTeam) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [showTeam]);

  return (
    <footer className="site-footer">
      <div className="footer-content">
        <p className="footer-copyright">
          © 2025 Scribbles, the official Arts Club of CEG
        </p>
        <div className="footer-credits">
          <span>Designed by </span>
          <span 
            className="tech-team-link"
            onClick={() => setShowTeam(!showTeam)}
            ref={popupRef}
          >
            Web and Dev Team, Scribbles
            {showTeam && (
              <div className="tech-team-popup">
                {technicalTeam.map((member) => (
                  <a
                    key={member.name}
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="tech-member"
                  >
                    <div className="tech-member-avatar">
                      <img src={member.image} alt={member.name} />
                    </div>
                    <span className="tech-member-name">{member.name}</span>
                  </a>
                ))}
              </div>
            )}
          </span>
        </div>
      </div>
    </footer>
  );
}

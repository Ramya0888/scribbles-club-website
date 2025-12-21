import React, { useState } from 'react';

function TeamMemberCard({ name, role, dept, image, instagram, linkedin, quote, onClick }) {
  const imgPath = image ? (image.startsWith('/') ? image : `/${image}`) : '/logo.png';
  const [loadStatus, setLoadStatus] = useState('pending');

  return (
    <div className="card" style={{ width: 240, minHeight: 420, textAlign: 'center', cursor: 'pointer', padding: '0.85rem', borderRadius: 18 }} onClick={onClick}>
      <div style={{ width: 200, height: 230, margin: '0 auto 0.65rem', borderRadius: 16, overflow: 'hidden', background: 'rgba(255,255,255,0.06)' }}>
        <img
          src={imgPath}
          alt={name}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          onLoad={() => setLoadStatus('loaded')}
          onError={(e) => { 
            setLoadStatus('error'); 
            e.currentTarget.onerror = null; 
            e.currentTarget.src = '/logo.png'; 
          }}
        />
      </div>
      <h4 style={{ margin: '0.5rem 0 0.25rem', fontSize: '1.1rem' }}>{name}</h4>
      <div style={{ fontSize: 12, opacity: .8, marginBottom: '0.25rem' }}>{role}</div>
      <div style={{ fontSize: 11, opacity: .7, marginBottom: '0.5rem' }}>{dept}</div>
      <div style={{ fontSize: 11, fontStyle: 'italic', opacity: .85, padding: '0 0.5rem', marginBottom: '0.5rem' }}>
        "{quote || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'}"
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '0.6rem', marginTop: '0.6rem' }} onClick={(e) => e.stopPropagation()}>
        <a href={instagram || '#'} target={instagram ? '_blank' : undefined} rel={instagram ? 'noreferrer' : undefined} aria-label={`${name} Instagram`} style={{
          width: 28, height: 28, borderRadius: '50%', display: 'grid', placeItems: 'center',
          background: 'linear-gradient(45deg, #feda75, #fa7e1e, #d62976, #962fbf, #4f5bd5)', color: '#fff', fontSize: 14,
          opacity: instagram ? 1 : 0.4, pointerEvents: instagram ? 'auto' : 'none'
        }}>◎</a>
        <a href={linkedin || '#'} target={linkedin ? '_blank' : undefined} rel={linkedin ? 'noreferrer' : undefined} aria-label={`${name} LinkedIn`} style={{
          width: 28, height: 28, borderRadius: '50%', display: 'grid', placeItems: 'center',
          background: '#0a66c2', color: '#fff', fontWeight: 700, fontFamily: 'sans-serif', fontSize: 14,
          opacity: linkedin ? 1 : 0.4, pointerEvents: linkedin ? 'auto' : 'none'
        }}>in</a>
      </div>
    </div>
  );
}

export default TeamMemberCard;

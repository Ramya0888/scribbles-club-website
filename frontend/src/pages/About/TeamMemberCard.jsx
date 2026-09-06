import React, { useState } from 'react';

function TeamMemberCard({ name, role, dept, image, instagram, linkedin, quote, onClick }) {
  const imgPath = image ? (image.startsWith('/') ? image : `/${image}`) : '/logo.png';
  return (
    <div className="card" style={{ width: 220, minHeight: 360, textAlign: 'center', padding: '0.85rem', borderRadius: 18, display: 'flex', flexDirection: 'column' }} onClick={onClick}>
      <div style={{ width: '100%', aspectRatio: '1 / 1.05', margin: '0 auto 0.65rem', borderRadius: 16, overflow: 'hidden', background: 'rgba(0,0,0,0.06)' }}>
        <img src={imgPath} alt={name} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/logo.png'; }} />
      </div>
      <h4 style={{ margin: '0.5rem 0 0.2rem', fontSize: '1.05rem', lineHeight: 1.2 }}>{name}</h4>
      <div style={{ fontSize: 12, opacity: .8 }}>{role}</div>
      {dept ? <div style={{ fontSize: 11, opacity: .65, marginBottom: '0.35rem' }}>{dept}</div> : <div style={{ height: 6 }} />}
      <div style={{ fontSize: 11, fontStyle: 'italic', opacity: .8, padding: '0 0.4rem', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden', minHeight: 36, marginBottom: '0.5rem' }}>"{quote || 'Proud member of Scribbles Art Club.'}"</div>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginTop: 'auto', paddingTop: 6 }} onClick={(e) => e.stopPropagation()}>
        <a href={instagram || '#'} target={instagram ? '_blank' : undefined} rel={instagram ? 'noreferrer' : undefined} aria-label={`${name} Instagram`} style={{ width: 36, height: 36, borderRadius: '50%', display: 'grid', placeItems: 'center', background: 'linear-gradient(45deg, #feda75, #fa7e1e, #d62976, #962fbf, #4f5bd5)', color: '#fff', fontSize: 14, opacity: instagram ? 1 : 0.35, pointerEvents: instagram ? 'auto' : 'none' }}>◎</a>
        <a href={linkedin || '#'} target={linkedin ? '_blank' : undefined} rel={linkedin ? 'noreferrer' : undefined} aria-label={`${name} LinkedIn`} style={{ width: 36, height: 36, borderRadius: '50%', display: 'grid', placeItems: 'center', background: '#0a66c2', color: '#fff', fontWeight: 700, fontFamily: 'sans-serif', fontSize: 13, opacity: linkedin ? 1 : 0.35, pointerEvents: linkedin ? 'auto' : 'none' }}>in</a>
      </div>
    </div>
  );
}

export default TeamMemberCard;

import React from "react";
import { Link } from "react-router-dom";
import Footer from '../../components/Footer';

export default function VideoPage() {
  return (
    <div className="gallery-page">
      <Link className="back-link" to="/">← Back to Home</Link>
      
      <header className="section-header center">
        <p className="eyebrow">Club Vision & Vibe</p>
        <h2 className="curly-title">The Official Intro Video</h2>
      </header>

      <section className="section">
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div className="video-wrapper" style={{
            position: 'relative',
            paddingBottom: '56.25%', /* 16:9 aspect ratio */
            height: 0,
            overflow: 'hidden',
            borderRadius: 'var(--radius-lg)',
            boxShadow: 'var(--card-shadow)',
            background: '#000'
          }}>
            <iframe
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%'
              }}
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              title="Scribbles Art Club Intro Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          
          <div style={{ marginTop: '2rem', textAlign: 'center' }}>
            <p className="muted" style={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
              A short cinematic montage showcasing our club's vision, creativity, and community. 
              Join us on this artistic journey through weekly prompts, exhibitions, and collaborative projects.
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

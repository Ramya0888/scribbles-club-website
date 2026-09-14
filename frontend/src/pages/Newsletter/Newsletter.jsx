import React, { useState } from 'react';
import Navbar from '../../components/Navbar';

export default function NewsletterPage() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    const v = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || v.length > 254) { setError('Enter a valid email address.'); return; }
    setSubmitted(true);
    setEmail('');
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="newsletter-page" style={{ maxWidth: 720, margin: "0 auto" }}>
      <Navbar />
      <section className="nl-hero">
        <p className="eyebrow">Scribbles Art Club</p>
        <h1>Join the Scribbles Newsletter</h1>
        <p>Get weekly art drops, events, prompts, and creative updates directly in your inbox.</p>
      </section>
      <section className="nl-card">
        <form className="nl-form" onSubmit={handleSubmit} noValidate>
          <label htmlFor="nl-email" className="sr-only">Email address</label>
          <input id="nl-email" type="email" name="email" required placeholder="Enter your email address" aria-label="Email address" autoComplete="email" value={email} onChange={e=>setEmail(e.target.value)} maxLength={254} aria-invalid={!!error} aria-describedby={error?'nl-error':undefined} />
          <button type="submit">Subscribe</button>
        </form>
        {error && <div id="nl-error" className="nl-success" role="alert" style={{ display:'block', background:'#fef2f2', color:'#991b1b', borderColor:'#fecaca' }}>{error}</div>}
        {submitted && <div className="nl-success" role="status" style={{ display: 'block' }}>Thanks for subscribing! See you in your inbox 🎨</div>}
        <div className="nl-trust"><div>No spam. Only art, events, and inspiration.</div><div>Unsubscribe anytime.</div></div>
      </section>
    </div>
  );
}

import React, { useState } from 'react';
import Navbar from '../../components/Navbar';

export default function NewsletterPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    e.target.reset();
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="newsletter-page" style={{ maxWidth: 720, margin: "0 auto", padding: "calc(var(--nav-h) + 28px) 20px 64px" }}>
      <Navbar />
      <section className="nl-hero">
        <p className="eyebrow">Scribbles Art Club</p>
        <h1>Join the Scribbles Newsletter</h1>
        <p>Get weekly art drops, events, prompts, and creative updates directly in your inbox.</p>
      </section>
      <section className="nl-card">
        <form className="nl-form" onSubmit={handleSubmit} noValidate>
          <label htmlFor="nl-email" className="sr-only">Email address</label>
          <input id="nl-email" type="email" name="email" required placeholder="Enter your email address" aria-label="Email address" autoComplete="email" />
          <button type="submit">Subscribe</button>
        </form>
        {submitted && <div className="nl-success" role="status" style={{ display: 'block' }}>Thanks for subscribing! See you in your inbox 🎨</div>}
        <div className="nl-trust"><div>No spam. Only art, events, and inspiration.</div><div>Unsubscribe anytime.</div></div>
      </section>
    </div>
  );
}

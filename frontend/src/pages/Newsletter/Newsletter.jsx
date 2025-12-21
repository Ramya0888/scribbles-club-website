import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function NewsletterPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    e.target.reset();
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="newsletter-page">
      <Link className="back-link" to="/">← Back to Home</Link>

      <section className="nl-hero">
        <p className="eyebrow">Scribbles Art Club</p>
        <h1>Join the Scribbles Newsletter</h1>
        <p>Get weekly art drops, events, prompts, and creative updates directly in your inbox.</p>
      </section>

      <section className="nl-card">
        <form className="nl-form" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            required
            placeholder="Enter your email address"
            aria-label="Email address"
          />
          <button type="submit">Subscribe</button>
        </form>
        {submitted && (
          <div className="nl-success" style={{ display: 'block' }}>
            Thanks for subscribing! See you in your inbox 🎨
          </div>
        )}
        <div className="nl-trust">
          <div>No spam. Only art, events, and inspiration.</div>
          <div>Unsubscribe anytime.</div>
        </div>
      </section>
    </div>
  );
}

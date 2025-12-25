import React, { useState } from "react";
import Footer from "../../components/Footer";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    e.target.reset();
  };

  return (
    <div className="page">
      <header className="section-header center">
        <p className="eyebrow">Let’s Connect</p>
        <h2 className="curly-title">Contact Scribbles</h2>
        <p className="muted">
          Have an idea, collaboration, or just want to say hi? 🌸
        </p>
      </header>

      <section className="section contact-grid">
        {/* Contact Form */}
        <form className="card contact-card" onSubmit={handleSubmit}>
          <h3>Send us a message</h3>
          <input type="text" placeholder="Your Name" required />
          <input type="email" placeholder="Your Email" required />
          <textarea placeholder="Your Message" rows="4" required></textarea>

          <button className="btn primary" type="submit">
            Send Message
          </button>

          {submitted && (
            <p className="success-text">
              ✨ Thank you! We’ll get back to you soon.
            </p>
          )}
        </form>

        {/* Contact Info */}
        <div className="card contact-card">
          <h3>Reach us</h3>
          <p><strong>Email:</strong></p>
          <p>scribbles.ceg@gmail.com</p>

          <div className="social-icons">
            <a href="https://www.instagram.com/scribbles_ceg/?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw%3D%3D" aria-label="Instagram">📸</a>
            <a href="#" aria-label="Pinterest">📌</a>
             <a href="https://www.linkedin.com/company/scribblesceg/" aria-label="LinkedIn">💼</a>
          </div>

          {/* Google Map */}
          <iframe
            title="Scribbles Location"
            src="https://www.google.com/maps?q=CEG%20Campus%20Chennai&output=embed"
            width="100%"
            height="200"
            style={{ border: 0, borderRadius: "12px", marginTop: "1rem" }}
            loading="lazy"
          ></iframe>
        </div>
      </section>

      <Footer />
    </div>
  );
}

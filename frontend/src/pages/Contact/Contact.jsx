// src/pages/Contact/Contact.jsx
import React, { useState, useMemo } from "react";
import "./Contact.css";
import "../../styles/ContactPastelRain.css";  
import emailjs from "@emailjs/browser";
import Navbar from "../../components/Navbar";
import { 
  FaInstagram, 
  FaPinterestP, 
  FaLinkedinIn, 
  FaYoutube,
  FaEnvelope 
} from "react-icons/fa";



export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "", _hp: "" });
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const drops = useMemo(() => Array.from({ length: 28 }).map(() => ({
    left: Math.random() * 100,
    duration: 9 + Math.random() * 8,
    delay: Math.random() * 5,
    opacity: 0.3 + Math.random() * 0.4,
    size: 4 + Math.random() * 6,
    hue: Math.floor(180 + Math.random() * 180),
  })), []);
  const stripHtml = (v) => v.replace(/<[^>]*>/g, "").replace(/[<>]/g, "").trim();
  const rateWindow = React.useRef([]);
  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    const name = stripHtml(formData.name);
    const email = stripHtml(formData.email);
    const message = stripHtml(formData.message);
    if (name.length < 2 || name.length > 100) { setError("Please enter a valid name (2-100 characters)."); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) { setError("Please enter a valid email address."); return; }
    if (message.length < 10 || message.length > 5000) { setError("Message must be between 10 and 5000 characters."); return; }
    const now = Date.now();
    rateWindow.current = rateWindow.current.filter((t) => now - t < 30000);
    if (rateWindow.current.length >= 3) { setError("Too many submissions. Please wait 30 seconds."); return; }
    rateWindow.current.push(now);
    const svc = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const tpl = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const key = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
    if (!svc || !tpl || !key) { setError("Email service is not configured. Please email us directly at scribbles.ceg@gmail.com"); return; }
    setSending(true);
    emailjs.send(svc, tpl, { from_name: name, from_email: email, message }, key)
      .then(() => { setSuccess(true); setFormData({ name: "", email: "", message: "" }); setTimeout(() => setSuccess(false), 4000); })
      .catch(() => setError("Failed to send. Please try again or email us directly."))
      .finally(() => setSending(false));
  };
  return (
    <div className="contact-page page" style={{ position: "relative", overflow: "hidden"}}>
      <div className="contact-pastel-rain-layer" aria-hidden="true">
        {drops.map((d, i) => (
          <span key={i} className="contact-pastel-drop" style={{ left: `${d.left}%`, animationDuration: `${d.duration}s`, animationDelay: `${d.delay}s`, opacity: d.opacity, width: `${d.size}px`, height: `${d.size}px`, "--hue": d.hue }} />
        ))}
      </div>
      {/* All site navigation lives in the shared navbar */}
      <Navbar />
      <div className="contact-title">
  <h2 className="curly-title">Contact Us</h2>
</div>

      <p>Reach out to Scribbles Art Club for collaborations or inquiries.</p>

      <div className="contact-grid">
        <form className="contact-card" onSubmit={handleSubmit} noValidate>
          <input type="text" name="_hp" value={formData._hp} onChange={handleChange} tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: "absolute", left: "-9999px", opacity: 0, height: 0, width: 0 }} />
          <label htmlFor="c-name" className="tiny muted" style={{ fontWeight: 600 }}>Name</label>
          <input id="c-name" type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} required autoComplete="name" maxLength={100} />
          <label htmlFor="c-email" className="tiny muted" style={{ fontWeight: 600 }}>Email</label>
          <input id="c-email" type="email" name="email" placeholder="Your Email" value={formData.email} onChange={handleChange} required autoComplete="email" maxLength={254} />
          <label htmlFor="c-msg" className="tiny muted" style={{ fontWeight: 600 }}>Message</label>
          <textarea id="c-msg" name="message" placeholder="Your Message" value={formData.message} onChange={handleChange} rows="6" required maxLength={5000} />
          <button type="submit" disabled={sending}>{sending ? "Sending…" : "Send Message"}</button>
          {success && <p className="success-text" role="status">Message sent successfully!</p>}
          {error && <p className="success-text" role="alert" style={{ color: "#b42318" }}>{error}</p>}
        </form>
        <div className="contact-card" style={{ padding: 0, overflow: "hidden" }}>
          <iframe title="Scribbles Club Location — CEG Anna University" src="https://www.google.com/maps?q=CEG+Anna+University&output=embed" width="100%" height="360" style={{ border: 0, display: "block" }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
        </div>
      </div>

      {/* Social Media & Email */}
      <div className="contact-card">
        <h3>Follow Us</h3>

        <div className="social-icons">
          <a
            href="https://www.instagram.com/scribbles_ceg?igsh=MWg5cGFzN2twMGxkYQ=="
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <FaInstagram />
          </a>

          <a
            href="https://in.pinterest.com/scribblesceg/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Pinterest"
          >
            <FaPinterestP />
          </a>

          <a
            href="https://www.linkedin.com/company/scribblesceg/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <FaLinkedinIn />
          </a>

          <a
            href="https://youtube.com/@scribbles_ceg?si=QHCU0wiHXvBulcqT"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="YouTube"
          >
            <FaYoutube />
          </a>
          <a href="mailto:scribbles.ceg@gmail.com?subject=Hello%20Scribbles" aria-label="Email"><FaEnvelope /></a>

        </div>
      </div>

    </div>
  );
}

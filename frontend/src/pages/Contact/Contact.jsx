// src/pages/Contact/Contact.jsx
import React, { useState } from "react";
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
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    emailjs
      .send(
        "service_62gf8rp",
        "template_yub0yj4",
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
        },
        "xCTtPWMY6IwK-TvSF"
      )
      .then(() => {
        setSuccess(true);
        setFormData({ name: "", email: "", message: "" });
      })
      .catch((error) => {
        console.error("Email error:", error);
      });
  };
  const dropCount = 50;

  return (
    <div className="contact-page page" style={{ position: "relative", overflow: "hidden"}}>
      {/* Pastel Rain */}
      <div className="contact-pastel-rain-layer">
        {Array.from({ length: dropCount }).map((_, i) => (
          <span
            key={i}
            className="contact-pastel-drop"
            style={{
              left: `${Math.random() * 100}%`,
              animationDuration: `${9 + Math.random() * 8}s`,
              animationDelay: `${Math.random() * 5}s`,
              opacity: 0.3 + Math.random() * 0.5,
              width: `${4 + Math.random() * 6}px`,
              height: `${4 + Math.random() * 6}px`,
              "--hue": Math.floor(180 + Math.random() * 360),
            }}
          />
        ))}
      </div>
      {/* All site navigation lives in the shared navbar */}
      <Navbar />
      <div className="contact-title">
  <h2 className="curly-title">Contact Us</h2>
</div>

      <p>Reach out to Scribbles Art Club for collaborations or inquiries.</p>

      {/* Contact Form */}
      <div className="contact-grid">
        <form className="contact-card" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            rows="6"
            required
          />
          <button type="submit">Send Message</button>
          {success && <p className="success-text">Message sent successfully!</p>}
        </form>

        {/* Google Map */}
        <div className="contact-card">
          <iframe
            title="Scribbles Club Location"
            src="https://www.google.com/maps?q=CEG+Anna+University&output=embed"
            width="100%"
            height="300"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
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
          <a
  href="https://mail.google.com/mail/?view=cm&fs=1&to=scribbles.ceg@gmail.com&su=Hello%20Scribbles&body=Hi%20Team,"
  target="_blank"
  rel="noopener noreferrer"
  aria-label="Email"
>
  <FaEnvelope />
</a>

        </div>
      </div>

    </div>
  );
}

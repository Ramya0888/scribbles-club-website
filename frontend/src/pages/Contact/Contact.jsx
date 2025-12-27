// src/pages/Contact/Contact.jsx
import React, { useState } from "react";
import "./Contact.css";
import "../../styles/ContactPastelRain.css";  // create a CSS file for styling
import emailjs from "@emailjs/browser";
import { Link } from "react-router-dom";
import { 
  FaInstagram, 
  FaPinterestP, 
  FaLinkedinIn, 
  FaYoutube 
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
      {/* Back to Home Button */}
      <div style={{ margin: "1rem 0", position: "relative", zIndex: 10 }}>
        <Link
          to="/"
          style={{
            display: "inline-block",
            padding: "0.5rem 1rem",
            backgroundColor: "#f39eb6", // pink color same as other buttons
            color: "#fff",
            borderRadius: "8px",
            textDecoration: "none",
            fontWeight: 500,
            boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
            transition: "transform 0.2s, background-color 0.2s",
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = "scale(1.05)";
            e.target.style.backgroundColor = "#ff85c2"; // hover pink
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = "scale(1)";
            e.target.style.backgroundColor = "#ff6eb4";
          }}
        >
          ← Back to Home
        </Link>
      </div>
      <h1>Contact Us</h1>
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

</div>

        <h4>Official Email:</h4>
        <p>scribbles.ceg@gmail.com</p>
      </div>
    </div>
  );
}

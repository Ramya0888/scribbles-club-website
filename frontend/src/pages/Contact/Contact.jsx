// src/pages/Contact/Contact.jsx
import React, { useState } from "react";
import "./Contact.css"; // create a CSS file for styling
import emailjs from "@emailjs/browser";


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
  

  return (
    <div className="contact-page page">
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
          <a href="https://www.instagram.com/scribbles_ceg?igsh=MWg5cGFzN2twMGxkYQ==" target="_blank" rel="noreferrer">📸</a>
          <a href="https://in.pinterest.com/scribblesceg/" target="_blank" rel="noreferrer">📌</a>
          <a href="https://www.linkedin.com/company/scribblesceg/" target="_blank" rel="noreferrer">💼</a>
        </div>
        <h4>Official Email:</h4>
        <p>scribbles.ceg@gmail.com</p>
      </div>
    </div>
  );
}

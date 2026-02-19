// src/pages/Events/Events.jsx
import React from "react";
import CountdownTimer from "./CountdownTimer";
import PastEvents from "./PastEvents";
import UpcomingEvents from "./UpcomingEvents";
import { Link } from "react-router-dom";
import "./Events.css";
import "../../styles/ContactPastelRain.css";

const Events = () => {
  const dropCount = 50;

  return (
    <div className="events-page" style={{ position: "relative", overflow: "hidden" }}>
      
      {/* Pastel Rain Layer */}
      {/* Pastel Rain Layer (From Contact Page) */}
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


      {/* Back to Home */}
      <div className="events-topbar" style={{ position: "relative", zIndex: 2 }}>
        <Link to="/" className="back-home-btn">← Back to Home</Link>
      </div>

      {/* Hero */}
      <section className="thooriga-hero" style={{ position: "relative", zIndex: 2 }}>
        <p className="scribbles-presents">Scribbles presents</p>

        <h1 className="thooriga-arch">
          {"Thooriga’26".split("").map((ch, i) => (
            <span key={i} style={{ "--i": i }}>{ch}</span>
          ))}
        </h1>

        <p className="thooriga-tagline">
          A celebration where art meets joy, and fun sets the rhythm.
        </p>

        <div className="thooriga-intro-card">
          <p>
            Thooriga is an immersive experience filled with colours, creativity,
            laughter, playful games, workshops, stalls, and a gallery that brings ideas to life.
          </p>
        </div>

        <p className="countdown-heading">✨ Thooriga begins in…</p>
        <CountdownTimer targetDate="2026-02-21T09:00:00" />
      </section>

      <div style={{ position: "relative", zIndex: 2 }}>
        <UpcomingEvents />
        <PastEvents />
      </div>

    </div>
  );
};

export default Events;

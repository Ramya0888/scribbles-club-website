import React from "react";
import CountdownTimer from "./CountdownTimer";
import PastEvents from "./PastEvents";
import UpcomingEvents from "./UpcomingEvents";
import { Link } from "react-router-dom";
import "./Events.css";
import "../../styles/ContactPastelRain.css";

const Events = () => {
  const dropCount = 50;
  const thoorigaEvents = [
    {
      title: "Thooriga’26",
      date: "21 Feb 2026",
      description: "A grand artistic celebration with colors, chaos, and creativity.",
      image: "https://res.cloudinary.com/djcyst7fi/image/upload/v1766840331/Screenshot_2025-12-27_182517_czs103.png",
    },
    {
      title: "Thooriga Gallery",
      date: "21 Feb 2026",
      description: "Showcasing student masterpieces and live art.",
      image: "https://res.cloudinary.com/djcyst7fi/image/upload/v1766840331/Screenshot_2025-12-27_182517_czs103.png",
    },
  ];
  
  const techofesEvents = [
    {
      title: "Techofes’26",
      date: "Jan 2026",
      description: "The biggest cultural fest filled with music, dance, and tech.",
      image: "https://res.cloudinary.com/djcyst7fi/image/upload/v1766831715/cld-sample-2.jpg",
    },
    {
      title: "Pro Shows",
      date: "Jan 2026",
      description: "Celebrity performances and electrifying nights.",
      image: "https://res.cloudinary.com/djcyst7fi/image/upload/v1766831715/cld-sample-2.jpg",
    },
  ];

  return (
    <div
      className="events-page"
      style={{ position: "relative", overflow: "hidden" }}
    >
      {/* Pastel Rain Layer */}
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
        <Link to="/" className="back-home-btn">
          ← Back to Home
        </Link>
      </div>

      {/* Hero Section */}
      <div className="events-title">
  <h2 className="curly-title">Events</h2>
</div>
<div style={{ position: "relative", zIndex: 2 }}>

<div style={{ position: "relative", zIndex: 2 }}>

{/* 🔥 Upcoming Event Title */}
<div className="upcoming-main-title">
  <h2 className="curly-title">Upcoming Event</h2>
</div>

{/* ⏳ Countdown */}
<CountdownTimer targetDate="2026-02-19T09:00:00" />

{/* 🌟 Featured Event Card */}
<div className="featured-event-card">
  <img
    src="https://res.cloudinary.com/djcyst7fi/image/upload/v1766840314/Screenshot_2025-12-27_182504_mlr1lj.png"
    alt="Featured Event"
  />

  <div className="featured-content">
    <h3>Thooriga ’26</h3>
    <p>
      Experience a vibrant celebration of creativity with interactive art,
      games, workshops, and colorful expressions all in one place.
    </p>
  </div>
</div>

{/* 🔽 Existing grid */}
<UpcomingEvents />

</div>

</div>

      <section className="thooriga-hero" style={{ position: "relative", zIndex: 2 }}>
        
        
        <p className="scribbles-presents">Our Signature Event</p>

        <h1 className="thooriga-arch">
          {"Thooriga’26".split("").map((ch, i) => (
            <span key={i} style={{ "--i": i }}>
              {ch}
            </span>
          ))}
        </h1>

        <p className="thooriga-tagline">
          A celebration where art meets joy, and fun sets the rhythm.
        </p>

        <div className="thooriga-intro-card">
          <p>
            Thooriga is an immersive experience filled with colours, creativity,
            laughter, and playful games alongside interactive workshops,
            vibrant stalls, and a gallery that brings ideas to life. This isn’t
            just an art event — it’s a space to create, explore, play, and connect.
            From hands-on experiences to moments of joyful chaos, every corner
            promises something exciting.
          </p>
        </div>
     </section>

      
      
     {/* 🎯 Past Events Section */}
<div style={{ position: "relative", zIndex: 2 }}>

  {/* 🔥 MAIN HEADING */}
  <div className="past-events-title">
    <h2 className="curly-title">Past Events</h2>
  </div>

  {/* 🎨 Thooriga Section */}
  <h3 className="sub-event-title">Thooriga’26</h3>
  <PastEvents events={thoorigaEvents} />

  {/* 🎭 Techofes Section */}
  <h3 className="sub-event-title">Techofes’26</h3>
  <PastEvents events={techofesEvents} />

</div>
      
    </div>
  );
};

export default Events;
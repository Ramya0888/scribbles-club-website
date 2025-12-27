import React from "react";
import UpcomingEvents from "./UpcomingEvents";
import CountdownTimer from "./CountdownTimer";
import EventsGallery from "./EventsGallery";
import PastEvents from "./PastEvents";
import "../../styles/PastelRainEvents.css";
import { Link } from "react-router-dom";
// import the new file

const Events = () => {
  const dropCount = 50;

  return (
    <>
      {/* Rain background specific to Events page */}
      <div className="pastel-rain-events">
        {Array.from({ length: dropCount }).map((_, i) => (
          <span
            key={i}
            className="pastel-drop-events"
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

      {/* Events content */}
      <div className="events-page">
      <div style={{ margin: "1rem 0" }}>
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
      e.target.style.backgroundColor = "#ff85c2"; // slightly lighter pink on hover
    }}
    onMouseLeave={(e) => {
      e.target.style.transform = "scale(1)";
      e.target.style.backgroundColor = "#ff6eb4"; // revert pink
    }}
  >
    ← Back to Home
  </Link>
</div>

        <div className="section-header center">
          <h1 className="curly-title">Events</h1>
          <p className="muted">
            Workshops, competitions, collaborations & creative gatherings
          </p>
        </div>

        <CountdownTimer targetDate="2026-03-01T10:00:00" />
        <UpcomingEvents />
        <PastEvents />
        <EventsGallery />
      </div>
    </>
  );
};

export default Events;

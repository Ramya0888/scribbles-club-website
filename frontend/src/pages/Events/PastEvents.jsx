import React, { useEffect, useState } from "react";
import "./PastEvents.css";

const PastEvents = ({ events }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!events || events.length === 0) return;

    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % events.length);
    }, 4500);

    return () => clearInterval(timer);
  }, [events]);

  if (!events || events.length === 0) return null;

  const event = events[index];

  return (
    <div className="past-slider">
      {/* 🖼 Image */}
      <div className="past-image-wrap">
        <img src={event.image} alt={event.title} />
        <div className="image-glow" />
      </div>

      {/* 📝 Content */}
      <div className="past-content">
        <h3>{event.title}</h3>
        <p className="past-date">{event.date}</p>
        <p className="past-desc">{event.description}</p>
      </div>

      {/* 🔘 Dots */}
      <div className="past-dots">
        {events.map((_, i) => (
          <span
            key={i}
            className={i === index ? "dot active" : "dot"}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>
    </div>
  );
};

export default PastEvents;
import React, { useEffect, useState,useRef } from "react";
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
  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % events.length);
  };
  
  const prevSlide = () => {
    setIndex((prev) => (prev - 1 + events.length) % events.length);
  };
  const touchStartX = useRef(0);
const touchEndX = useRef(0);
const handleTouchStart = (e) => {
  touchStartX.current = e.changedTouches[0].screenX;
};

const handleTouchEnd = (e) => {
  touchEndX.current = e.changedTouches[0].screenX;
  handleSwipe();
};

const handleSwipe = () => {
  const diff = touchStartX.current - touchEndX.current;

  if (diff > 50) nextSlide();     // swipe left
  if (diff < -50) prevSlide();    // swipe right
};

  return (
    
    <div className="past-slider"
    onTouchStart={handleTouchStart}
    onTouchEnd={handleTouchEnd}
    >
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
      <div className="slider-controls">
  <button onClick={prevSlide}>‹</button>
  <button onClick={nextSlide}>›</button>
</div>
    </div>
  );
};

export default PastEvents;
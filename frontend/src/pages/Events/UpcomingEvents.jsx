// src/pages/Events/UpcomingEvents.jsx
import React, { useEffect, useRef, useState } from "react";
import "./Events.css";

const events = [
  {
    title: "Live Art Jam",
    desc: "Collaborative canvas madness",
    img: "https://res.cloudinary.com/djcyst7fi/image/upload/v1766840314/Screenshot_2025-12-27_182504_mlr1lj.png",
  },
  {
    title: "Paint Splash Zone",
    desc: "Let colours fly free",
    img: "https://res.cloudinary.com/djcyst7fi/image/upload/v1766840314/Screenshot_2025-12-27_182504_mlr1lj.png",
  },
  {
    title: "Pottery Wheel",
    desc: "Shape your imagination",
    img: "https://res.cloudinary.com/djcyst7fi/image/upload/v1766840314/Screenshot_2025-12-27_182504_mlr1lj.png",
  },
  {
    title: "Street Doodle Wall",
    desc: "Express your wild side",
    img: "https://res.cloudinary.com/djcyst7fi/image/upload/v1766840314/Screenshot_2025-12-27_182504_mlr1lj.png",
  },
  {
    title: "Clay Charms",
    desc: "Tiny art, big joy",
    img: "https://res.cloudinary.com/djcyst7fi/image/upload/v1766840314/Screenshot_2025-12-27_182504_mlr1lj.png",
  },
  {
    title: "DIY Bookmark Bar",
    desc: "Craft your own magic",
    img: "https://res.cloudinary.com/djcyst7fi/image/upload/v1766840314/Screenshot_2025-12-27_182504_mlr1lj.png",
  },
  {
    title: "Graffiti Letters",
    desc: "Bold strokes, loud vibes",
    img: "https://res.cloudinary.com/djcyst7fi/image/upload/v1766840314/Screenshot_2025-12-27_182504_mlr1lj.png",
  },
  {
    title: "Mandala Calm Zone",
    desc: "Patterns for peace",
    img: "https://res.cloudinary.com/djcyst7fi/image/upload/v1766840314/Screenshot_2025-12-27_182504_mlr1lj.png",
  },
  {
    title: "Canvas Mini Battles",
    desc: "Fast art face-offs",
    img: "https://res.cloudinary.com/djcyst7fi/image/upload/v1766840314/Screenshot_2025-12-27_182504_mlr1lj.png",
  },
  {
    title: "Sticker Studio",
    desc: "Design your own vibe",
    img: "https://res.cloudinary.com/djcyst7fi/image/upload/v1766840314/Screenshot_2025-12-27_182504_mlr1lj.png",
  },
];

const UpcomingEvents = () => {
  const sectionRef = useRef(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setShow(true);
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="upcoming-section" ref={sectionRef}>
     <div className="upcoming-events-title">
  <h2 className="curly-title">Upcoming Events</h2>
</div>


      <div className={`rummy-grid ${show ? "deal" : ""}`}>
        {events.map((ev, i) => (
          <div
            key={i}
            className="rummy-card"
            style={{ "--i": i }}
          >
            <div className="rummy-glow" />

            <div className="rummy-img-wrap">
              <img src={ev.img} alt={ev.title} />
            </div>

            <h3>{ev.title}</h3>
            <p>{ev.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default UpcomingEvents;

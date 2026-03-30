// src/pages/Events/UpcomingEvents.jsx
import React, { useEffect, useRef, useState } from "react";
import "./Events.css";

const events = [
  {
    title: "T-Shirt Painting Workshop",
    desc: "Held on Mar 23, 2026",
    img: "https://res.cloudinary.com/djcyst7fi/image/upload/v1774887429/tshirt_bofzjw.jpg",
  },
  {
    title: "Clay Article Key Holder Workshop",
    desc: "Held on Mar 15, 2026",
    img: "https://res.cloudinary.com/djcyst7fi/image/upload/v1774625229/clay_article_h8kty4.jpg",
  },
  {
    title: "Resin Art Workshop",
    desc: "Held on Mar 14, 2026",
    img: "https://res.cloudinary.com/djcyst7fi/image/upload/v1774625152/resin_key_chain_njha87.jpg",
  },
  {
    title: "Tote Bag Workshop (Thooriga '26)",
    desc: "Held on Feb 21, 2026",
    img: "https://res.cloudinary.com/djcyst7fi/image/upload/v1774625225/tote_bag_f7mhbr.jpg",
  },
  {
    title: "Caricature Workshop (Thooriga '26)",
    desc: "Held on Feb 21, 2026",
    img: "https://res.cloudinary.com/djcyst7fi/image/upload/v1774625070/caricaturews_p9ujwo.jpg",
  },
  {
    title: "Resin Art Workshop (Thooriga '26)",
    desc: "Held on Feb 21, 2026",
    img: "https://res.cloudinary.com/djcyst7fi/image/upload/v1774634832/resin_art_1_av7y2d.jpg",
  },
  {
    title: "Live Portrait Workshop (Thooriga '26)",
    desc: "Held on Feb 21, 2026",
    img: "https://res.cloudinary.com/djcyst7fi/image/upload/v1774625253/live_portrait_ws_r04r3k.jpg",
  },
  {
    title: "Pencil Sketch Tutorial",
    desc: "Held on Oct 14, 2025",
    img: "https://res.cloudinary.com/djcyst7fi/image/upload/v1774625144/pencil_sketch_mej0wx.jpg",
  }
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
        <h2 className="curly-title">Workshops</h2>
      </div>

      <div className={`rummy-grid ${show ? "deal" : ""}`}>
        {events.map((ev, i) => (
       <div
       key={i}
       className={`rummy-card ${show ? "show" : ""}`}
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
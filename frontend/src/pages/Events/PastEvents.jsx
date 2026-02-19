// src/pages/Events/PastEvents.jsx
import React, { useEffect, useState } from "react";
import "./PastEvents.css";

const pastEvents = [
  {
    title: "Thooriga’25",
    date: "21 Feb 2025",
    description:
      "A vibrant explosion of colours, creativity, workshops, laughter, and unforgettable moments. The gallery came alive with student art and playful chaos.",
    image:
      "https://res.cloudinary.com/djcyst7fi/image/upload/v1766840331/Screenshot_2025-12-27_182517_czs103.png",
  },
  {
    title: "Art Carnival",
    date: "12 Nov 2024",
    description:
      "Live painting battles, music, handmade stalls, and creative games that turned the campus into a carnival of joy.",
    image:
      "https://res.cloudinary.com/djcyst7fi/image/upload/v1766831715/cld-sample-2.jpg",
  },
  {
    title: "Thooriga’25",
    date: "21 Feb 2025",
    description:
      "A vibrant explosion of colours, creativity, workshops, laughter, and unforgettable moments. The gallery came alive with student art and playful chaos.",
    image:
      "https://res.cloudinary.com/djcyst7fi/image/upload/v1766840331/Screenshot_2025-12-27_182517_czs103.png",
  },
  {
    title: "Art Carnival",
    date: "12 Nov 2024",
    description:
      "Live painting battles, music, handmade stalls, and creative games that turned the campus into a carnival of joy.",
    image:
      "https://res.cloudinary.com/djcyst7fi/image/upload/v1766831715/cld-sample-2.jpg",
  },  {
    title: "Thooriga’25",
    date: "21 Feb 2025",
    description:
      "A vibrant explosion of colours, creativity, workshops, laughter, and unforgettable moments. The gallery came alive with student art and playful chaos.",
    image:
      "https://res.cloudinary.com/djcyst7fi/image/upload/v1766840331/Screenshot_2025-12-27_182517_czs103.png",
  },
  {
    title: "Art Carnival",
    date: "12 Nov 2024",
    description:
      "Live painting battles, music, handmade stalls, and creative games that turned the campus into a carnival of joy.",
    image:
      "https://res.cloudinary.com/djcyst7fi/image/upload/v1766831715/cld-sample-2.jpg",
  },  {
    title: "Thooriga’25",
    date: "21 Feb 2025",
    description:
      "A vibrant explosion of colours, creativity, workshops, laughter, and unforgettable moments. The gallery came alive with student art and playful chaos.",
    image:
      "https://res.cloudinary.com/djcyst7fi/image/upload/v1766840331/Screenshot_2025-12-27_182517_czs103.png",
  },
  {
    title: "Art Carnival",
    date: "12 Nov 2024",
    description:
      "Live painting battles, music, handmade stalls, and creative games that turned the campus into a carnival of joy.",
    image:
      "https://res.cloudinary.com/djcyst7fi/image/upload/v1766831715/cld-sample-2.jpg",
  },  {
    title: "Thooriga’25",
    date: "21 Feb 2025",
    description:
      "A vibrant explosion of colours, creativity, workshops, laughter, and unforgettable moments. The gallery came alive with student art and playful chaos.",
    image:
      "https://res.cloudinary.com/djcyst7fi/image/upload/v1766840331/Screenshot_2025-12-27_182517_czs103.png",
  },
  {
    title: "Art Carnival",
    date: "12 Nov 2024",
    description:
      "Live painting battles, music, handmade stalls, and creative games that turned the campus into a carnival of joy.",
    image:
      "https://res.cloudinary.com/djcyst7fi/image/upload/v1766831715/cld-sample-2.jpg",
  }
  // ➕ Add remaining events here
];

const PastEvents = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % pastEvents.length);
    }, 4500);

    return () => clearInterval(timer);
  }, []);

  const event = pastEvents[index];

  return (
    <section className="past-events-section">
     <div class="past-events-title">
  <h2 class="curly-title">Past Events</h2>
</div>


      <div className="past-slider">
        {/* 🖼 Image (65%) */}
        <div className="past-image-wrap">
          <img src={event.image} alt={event.title} />
          <div className="image-glow" />
        </div>

        {/* 📝 Content (35%) */}
        <div className="past-content">
          <h3>{event.title}</h3>
          <p className="past-date">{event.date}</p>
          <p className="past-desc">{event.description}</p>
        </div>
      </div>

      {/* 🔘 Navigation Dots */}
      <div className="past-dots">
        {pastEvents.map((_, i) => (
          <span
            key={i}
            className={i === index ? "dot active" : "dot"}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>
    </section>
  );
};

export default PastEvents;

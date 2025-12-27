import React from "react";
import { eventsGallery } from "./eventsData";
import "./Events.css";

const EventGallery = () => {
  return (
    <section className="section">
      <div className="section-header center">
        <h2 className="curly-title">Event Gallery</h2>
        <p className="muted">Moments captured from our creative journey</p>
      </div>

      <div className="gallery-row no-scrollbar">
        {eventsGallery.map((item) => (
          <figure className="gallery-card horizontal" key={item.id}>
            <img src={item.image} alt={item.title} />
            <figcaption>
              <strong>{item.title}</strong>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
};

export default EventGallery;

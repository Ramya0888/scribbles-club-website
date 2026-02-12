import React from "react";
import { pastEvents } from "./eventsData";
import "./Events.css";

const PastEvents = () => {
  return (
    <section className="past-events">
      <div className="section-header center">
        <h2 className="curly-title">Past Events</h2>
        <p className="muted">A glimpse of our creative milestones</p>
      </div>

      <div className="past-slider">
        {pastEvents.map(event => (
          <div key={event.id} className="past-slide-card">
            <h3>{event.title}</h3>
            <p className="tiny">{event.date} · {event.theme}</p>

            <div className="past-slide-images">
              {event.images.map((img, i) => (
                <img key={i} src={img} alt={event.title} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PastEvents;

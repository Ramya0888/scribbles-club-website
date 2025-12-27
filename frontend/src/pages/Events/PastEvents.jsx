import React from "react";
import { pastEvents } from "./eventsData";
import "./Events.css"; // reuse existing events styles

const PastEvents = () => {
  return (
    <section className="past-events">
        <div className="section-header center">
      <h2 className="curly-title">Past Events</h2>
      </div>
      {pastEvents.map(event => (
        <div key={event.id} className="past-event-card">
          <h3>{event.title}</h3>
          <p><strong>Date:</strong> {event.date}</p>
          <p><strong>Theme:</strong> {event.theme}</p>

          {/* Winners List */}
          {event.winners && event.winners.length > 0 && (
            <div className="winners-list">
              <h4>Winners</h4>
              <ul>
                {event.winners.map((winner, index) => (
                  <li key={index}>
                    {winner.name} – {winner.prize}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Gallery */}
          {event.images && event.images.length > 0 && (
            <div className="past-event-gallery">
              {event.images.map((img, idx) => (
                <img key={idx} src={img} alt={`${event.title} ${idx + 1}`} />
              ))}
            </div>
          )}
        </div>
      ))}
    </section>
  );
};

export default PastEvents;

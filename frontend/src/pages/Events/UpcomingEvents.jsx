// src/pages/Events/UpcomingEvents.jsx
import React from "react";
import EventCard from "../../components/EventCard";
import { upcomingEvents } from "./eventsData";
import "./Events.css"; // shared CSS for events page

const UpcomingEvents = () => {
  return (
    <section className="upcoming-events">
        <div className="section-header center">
      <h2 className="curly-title">Upcoming Events</h2>
      </div>
      <div className="events-grid">
        {upcomingEvents.map(event => (
          <EventCard
            key={event.id}
            title={event.title}
            date={event.date}
            time={event.time}
            description={event.description}
            image={event.image}
            registrationLink={event.registrationLink}
          />
        ))}
      </div>
    </section>
  );
};

export default UpcomingEvents;

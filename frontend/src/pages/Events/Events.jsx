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
    

      {/* Events content */}
      <div className="events-page">
      <div style={{ margin: "1rem 0" }}>
<Link to="/" className="back-home-btn">
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

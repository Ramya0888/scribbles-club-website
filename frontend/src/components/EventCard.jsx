// src/components/EventCard.jsx
import React from "react";
import "./EventCard.css"; // Optional: create separate CSS for EventCard

const EventCard = ({ title, date, time, description, image, registrationLink }) => {
  return (
    <div className="event-card">
      <img src={image} alt={title} className="event-image" />
      <div className="event-details">
        <h3>{title}</h3>
        <p className="event-date-time">{date} | {time}</p>
        <p className="event-desc">{description}</p>
        {registrationLink && (
          <a href={registrationLink} target="_blank" rel="noopener noreferrer" className="register-btn">
            Register Now
          </a>
        )}
      </div>
    </div>
  );
};

export default EventCard;

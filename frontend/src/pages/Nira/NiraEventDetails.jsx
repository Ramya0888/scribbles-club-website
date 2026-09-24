import React from 'react';
import { Link, useParams } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { getNiraEvent, niraDays } from '../../data/niraEvents';
import './NiraPage.css';

export default function NiraEventDetails() {
  const { eventId } = useParams();
  const event = getNiraEvent(eventId);

  if (!event) {
    return (
      <div className="nira-page">
        <Navbar />
        <main className="nira-details nira-details-empty">
          <p className="eyebrow">NIRA 2026</p>
          <h1>Event not found</h1>
          <Link className="nira-back-link" to="/nira">← Back to NIRA</Link>
        </main>
        <Footer />
      </div>
    );
  }

  const day = niraDays[event.day];

  return (
    <div className="nira-page">
      <Navbar />
      <main className="nira-details">
        <Link className="nira-back-link" to="/nira">← Back to NIRA</Link>
        <p className="eyebrow">{day.label} · {event.category}</p>
        <h1 className="nira-event-title">{event.name}</h1>
        <p className="nira-details-date">{day.date}</p>
        {event.poster && (
          <img className="nira-event-poster" src={event.poster} alt={`${event.name} poster`} />
        )}
        <dl className="nira-details-meta">
          <div><dt>TIME</dt><dd>{event.time}</dd></div>
          <div><dt>VENUE</dt><dd>{event.venue}</dd></div>
          {event.cashPrize && <div><dt>CASH PRIZE</dt><dd>{event.cashPrize}</dd></div>}
        </dl>
        {event.description && (
          <section className="nira-event-content" aria-labelledby="event-description-title">
            <h2 id="event-description-title">Description</h2>
            <p>{event.description}</p>
          </section>
        )}
        {event.eventPlan && (
          <section className="nira-event-content" aria-labelledby="event-plan-title">
            <h2 id="event-plan-title">Event Plan</h2>
            <ol>
              {event.eventPlan.map((step) => <li key={step}>{step}</li>)}
            </ol>
          </section>
        )}
        {event.rules && (
          <section className="nira-event-content" aria-labelledby="event-rules-title">
            <h2 id="event-rules-title">Rules</h2>
            <ul>
              {event.rules.map((rule) => <li key={rule}>{rule}</li>)}
            </ul>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
}
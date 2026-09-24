import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { niraDays, niraEvents } from '../../data/niraEvents';
import './NiraPage.css';

const NIRA_RETURN_KEY = 'scribbles-nira-return-position';

function EventCard({ event }) {
  const saveReturnPosition = () => {
    try {
      sessionStorage.setItem(NIRA_RETURN_KEY, JSON.stringify({
        scrollY: window.scrollY,
        selectedDay: event.day,
      }));
    } catch {
      // Navigation still works if session storage is unavailable.
    }
  };

  return (
    <Link className="nira-event-card" to={`/nira/event/${event.id}`} onClick={saveReturnPosition}>
      <div className="nira-event-card-heading">
        <p className="nira-event-category">{event.category}</p>
        <h3>{event.name}</h3>
        {event.cashPrize && <span className="nira-cash-prize-tag">Has Cash Prize</span>}
      </div>
      <dl className="nira-event-meta">
        <div><dt>TIME</dt><dd>{event.time}</dd></div>
        <div><dt>VENUE</dt><dd>{event.venue}</dd></div>
      </dl>
      <span className="nira-event-link">View event <span aria-hidden="true">→</span></span>
    </Link>
  );
}

function EventGroup({ title, events }) {
  const headingId = `nira-${title.toLowerCase().replaceAll(' ', '-')}-title`;
  const alignmentClass = title === 'GENERAL EVENTS' ? '' : ' nira-event-group--right';

  return (
    <section className={`nira-event-group${alignmentClass}`} aria-labelledby={headingId}>
      <div className="nira-section-heading">
        <h3 id={headingId}>{title}</h3>
      </div>
      <div className="nira-events-grid">
        {events.map((event) => <EventCard key={event.id} event={event} />)}
      </div>
    </section>
  );
}

export default function NiraPage() {
  const [selectedDay, setSelectedDay] = useState(1);
  const returnPositionRef = useRef(null);
  const selectedDayInfo = niraDays[selectedDay];
  const eventsForDay = niraEvents.filter((event) => event.day === selectedDay);

  useEffect(() => {
    try {
      returnPositionRef.current = JSON.parse(sessionStorage.getItem(NIRA_RETURN_KEY));
    } catch {
      returnPositionRef.current = null;
    }

    if (returnPositionRef.current) setSelectedDay(returnPositionRef.current.selectedDay);
  }, []);

  useEffect(() => {
    const returnPosition = returnPositionRef.current;
    if (!returnPosition) {
      window.scrollTo(0, 0);
      return undefined;
    }

    const restoreScroll = () => {
      window.requestAnimationFrame(() => {
        window.scrollTo(0, returnPosition.scrollY);
        returnPositionRef.current = null;
        sessionStorage.removeItem(NIRA_RETURN_KEY);
      });
    };
    const agendaImage = document.querySelector('.nira-agenda-frame img');
    let restoreTimer;

    if (agendaImage && !agendaImage.complete) {
      agendaImage.addEventListener('load', restoreScroll, { once: true });
    } else {
      restoreTimer = window.setTimeout(restoreScroll, 0);
    }

    return () => {
      agendaImage?.removeEventListener('load', restoreScroll);
      if (restoreTimer) window.clearTimeout(restoreTimer);
    };
  }, [selectedDay]);

  return (
    <div className="nira-page">
      <Navbar />
      <main className="nira-content">
        <header className="nira-hero">
          <p className="eyebrow">Scribbles presents</p>
          <img className="nira-hero-logo" src="/Nira/Nira_logo.png" alt="NIRA logo" />
          <p className="nira-tagline">The Symphony of Creativity</p>
          <div className="nira-dates" aria-label="NIRA event dates">
            {Object.values(niraDays).map((day) => (
              <div key={day.label}>
                <span>{day.date}</span>
                <strong>{day.label}</strong>
              </div>
            ))}
          </div>
        </header>

        <section className="nira-section" aria-labelledby="agenda-title">
          <div className="nira-section-heading">
            <p className="eyebrow">Choose your day</p>
            <h2 id="agenda-title">OFFICIAL AGENDA</h2>
          </div>
          <div className="nira-day-selector" role="tablist" aria-label="Select NIRA day">
            {Object.entries(niraDays).map(([dayNumber, day]) => {
              const dayValue = Number(dayNumber);
              return (
                <button
                  key={day.label}
                  type="button"
                  role="tab"
                  aria-selected={selectedDay === dayValue}
                  className={selectedDay === dayValue ? 'is-selected' : ''}
                  onClick={() => setSelectedDay(dayValue)}
                >
                  {day.label}
                </button>
              );
            })}
          </div>
          <div className="nira-agenda-frame" key={selectedDay}>
            <a href={selectedDayInfo.agendaImage} target="_blank" rel="noreferrer">
              <img src={selectedDayInfo.agendaImage} alt={`${selectedDayInfo.label} official NIRA agenda`} />
            </a>
          </div>
        </section>

        <section className="nira-section nira-events-section" aria-labelledby="explore-events-title">
          <div className="nira-section-heading">
            <p className="eyebrow">Everything on the schedule</p>
            <h2 id="explore-events-title">EXPLORE EVENTS</h2>
          </div>
          {selectedDay === 2 ? (
            ['WORKSHOPS', 'SIGNATURE EVENTS', 'GENERAL EVENTS'].map((category) => (
              <EventGroup
                key={category}
                title={category}
                events={eventsForDay.filter((event) => event.category === category)}
              />
            ))
          ) : (
            <div className="nira-events-grid">
              {eventsForDay.map((event) => <EventCard key={event.id} event={event} />)}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}
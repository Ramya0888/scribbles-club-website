import React, { useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer";

// Create 7 items per section with placeholder images/quotes
const officeBearers = Array.from({ length: 7 }).map((_, i) => ({
  name: [
    "Sowmya",
    "Venkatraman",
    "Lavanyalakshmi",
    "Ramkumar",
    "Mahima",
    "Suren",
    "Sujith",
  ][i],
  role: "Past Office Bearer",
  image: `/team/office_${i + 1}.jpg`,
  quote:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.",
}));

const alumni = Array.from({ length: 7 }).map((_, i) => ({
  name: [
    "Aishwarya",
    "Pranav",
    "Keerthi",
    "Harish",
    "Divya",
    "Sanjay",
    "Nithya",
  ][i],
  role: "Alumni",
  image: `/team/alumni_${i + 1}.jpg`,
  quote:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur blandit tempus porttitor. Integer posuere erat a ante.",
}));

const webTeam = Array.from({ length: 7 }).map((_, i) => ({
  name: [
    "Abirami",
    "Hashim",
    "Ramya",
    "Sathish",
    "Gurumoorthi",
    "Subi Pinsha",
    "Deepak",
  ][i],
  role: "Web Development Team",
  image: `/team/web_${i + 1}.jpg`,
  linkedin:
    [
      "https://linkedin.com/in/abirami",
      "https://linkedin.com/in/hashim",
      "https://linkedin.com/in/ramya",
      "https://linkedin.com/in/sathish",
      "https://linkedin.com/in/gurumoorthi",
      "https://linkedin.com/in/subipinsha",
      "https://linkedin.com/in/deepak",
    ][i],
  quote:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed posuere consectetur est at lobortis. Donec ullamcorper nulla non metus.",
}));

function TestimonialsRow({ title, items, scrollerId }) {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="section" style={{ marginTop: "2rem" }}>
      <div className="section-header">
        <h3 style={{ fontSize: "1.8rem" }}>{title}</h3>
      </div>

      <div style={{ width: "100%", overflow: "hidden", position: "relative" }} id={scrollerId}>
        <div
          className="no-scrollbar"
          style={{
            display: "flex",
            gap: "1rem",
            overflowX: "auto",
            scrollBehavior: "smooth",
            paddingBottom: "1rem",
          }}
        >
          {items.map((m, i) => (
            <div key={i} style={{ flex: "0 0 auto" }}>
              <div
                className="card"
                onClick={() => setOpenIndex(i === openIndex ? null : i)}
                style={{
                  width: 300,
                  borderRadius: 16,
                  boxShadow: "var(--card-shadow)",
                  background: "#fff",
                  cursor: "pointer",
                }}
              >
                <div style={{ padding: "0.75rem 1rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                    <div
                      style={{
                        width: 60,
                        height: 60,
                        borderRadius: "50%",
                        overflow: "hidden",
                        border: "3px solid #5bb3ff",
                        flex: "0 0 auto",
                      }}
                    >
                      <img src={m.image} alt={m.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    </div>
                    <div>
                      <div style={{ fontWeight: 600 }}>{m.name}</div>
                      <div className="muted" style={{ fontSize: "0.9rem" }}>{m.role}</div>
                    </div>
                  </div>

                  {openIndex === i && (
                    <div
                      className="muted"
                      style={{
                        marginTop: "0.75rem",
                        fontSize: "0.98rem",
                        lineHeight: 1.7,
                        background: "#f9fafb",
                        borderRadius: 12,
                        padding: "0.75rem 0.9rem",
                      }}
                    >
                      {m.quote}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          className="scroll-arrow"
          onClick={() =>
            document.querySelector(`#${scrollerId} .no-scrollbar`)?.scrollBy({ left: -280, behavior: "smooth" })
          }
          style={{
            position: "absolute",
            left: 0,
            top: "45%",
            transform: "translateY(-50%)",
            width: 48,
            height: 48,
            borderRadius: "50%",
            border: "2px solid rgba(0,0,0,0.1)",
            background: "rgba(255,255,255,0.95)",
            backdropFilter: "blur(10px)",
            cursor: "pointer",
            fontSize: 26,
            color: "#333",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 10,
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          }}
        >
          ‹
        </button>

        <button
          className="scroll-arrow"
          onClick={() =>
            document.querySelector(`#${scrollerId} .no-scrollbar`)?.scrollBy({ left: 280, behavior: "smooth" })
          }
          style={{
            position: "absolute",
            right: 0,
            top: "45%",
            transform: "translateY(-50%)",
            width: 48,
            height: 48,
            borderRadius: "50%",
            border: "2px solid rgba(0,0,0,0.1)",
            background: "rgba(255,255,255,0.95)",
            backdropFilter: "blur(10px)",
            cursor: "pointer",
            fontSize: 26,
            color: "#333",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 10,
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          }}
        >
          ›
        </button>
      </div>
    </section>
  );
}

export default function TestimonialsPage() {
  return (
    <div className="page" style={{ position: "relative", overflow: "hidden" }}>
      <div className="pastel-rain-layer" style={{ marginTop: "80px" }}>
        {Array.from({ length: 60 }).map((_, i) => (
          <span
            key={i}
            className="pastel-drop"
            style={{
              left: `${Math.random() * 100}%`,
              animationDuration: `${9 + Math.random() * 8}s`,
              animationDelay: `${Math.random() * 5}s`,
              opacity: 0.3 + Math.random() * 0.5,
              width: `${4 + Math.random() * 6}px`,
              height: `${4 + Math.random() * 6}px`,
              "--hue": Math.floor(180 + Math.random() * 360),
            }}
          />
        ))}
      </div>
      <Link className="back-link" to="/">← Back to Home</Link>
      <header className="section-header center">
        <p className="eyebrow">Member Reflections</p>
        <h2 className="curly-title">Testimonials</h2>
      </header>
      <section className="section" style={{ maxWidth: 900, margin: "0 auto" }}>
        <h3 style={{ fontSize: "1.6rem" }}>Overview</h3>
        <p className="muted" style={{ fontSize: "1.05rem", lineHeight: 1.8 }}>
          Highlight personal experiences and reflections from members, alumni, and developers.
          Click a card to read a short note about their journey with Scribbles.
        </p>
      </section>
      {/* Short Video Snippets */}
      <section className="section">
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <div style={{ marginBottom: "1rem" }}>
            <p className="eyebrow">Short Video Snippets</p>
            <h3 style={{ fontSize: "1.8rem" }}>Member Stories in Motion</h3>
          </div>
          <div
            className="video-wrapper"
            style={{
              position: "relative",
              paddingBottom: "56.25%", // 16:9
              height: 0,
              overflow: "hidden",
              borderRadius: "var(--radius-lg)",
              boxShadow: "var(--card-shadow)",
              background: "#000",
            }}
          >
            <iframe
              style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              title="Scribbles Testimonials Snippet"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <p className="muted" style={{ marginTop: "1rem" }}>
            Short clips where members share favorite Scribbles memories and experiences.
            This is a placeholder; we’ll swap in the real videos later.
          </p>
        </div>
      </section>
      <TestimonialsRow title="Past Office Bearers" items={officeBearers} scrollerId="t-row-office" />
      <TestimonialsRow title="Alumni" items={alumni} scrollerId="t-row-alumni" />
      <TestimonialsRow title="The Web Development Team" items={webTeam} scrollerId="t-row-web" />
      <Footer />
    </div>
  );
}

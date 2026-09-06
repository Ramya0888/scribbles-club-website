import React, { useState } from "react";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";

const officeBearers = [
  { name: "Sowmya", role: "Past President", image: "/team/sowmya.jpeg", quote: "Scribbles gave me a canvas for everything I couldn't say in words. Four years later, the club still feels like my second home." },
  { name: "Venkatraman", role: "Past President", image: "/team/ven.jpeg", quote: "Leading this club taught me that art is less about talent and more about showing up for each other, every single week." },
  { name: "Lavanyalakshmi", role: "Past Secretary", image: "/team/lav.jpeg", quote: "From scouting venues to hunting for paint at the last minute, every event was chaos — and I'd do it all over again." },
  { name: "Ramkumar S", role: "Past Treasurer", image: "/team/ram.JPG", quote: "I joined to draw and stayed for the people. The budget sheets were never pretty, but the friendships always were." },
  { name: "Mahima S", role: "Past Events Head", image: "/team/mah.jpg", quote: "Planning speed art events taught me how a little music, a lot of enthusiasm, and one shared wall can bring a whole college together." },
  { name: "Suren M", role: "Past Events Head", image: "/team/sur.jpeg", quote: "Scribbles is where I learned that the best ideas are drawn in chalk, erased, and drawn again — often mid-event." },
  { name: "Sujith P", role: "Past Design Head", image: "", quote: "Every poster I designed started as an ugly sketch. The club taught me to ship it anyway, then make it beautiful." },
];

const alumni = [
  { name: "Dharshini E", role: "Alumni, Social Media", image: "/team/dharsE.jpg", quote: "Even after graduation, Scribbles still sends me updates faster than my friends do. Once family, always family." },
  { name: "Roopa Varshni R", role: "Alumni, Creatives", image: "/team/roop.png", quote: "The late-night poster sessions and the smell of paint thinner — I genuinely miss every bit of it." },
  { name: "Sadha Shree N", role: "Alumni, Marketing", image: "/team/sad.jpg", quote: "Scribbles taught me that engagement beats reach, and that a hand-painted hoarding beats any banner ad." },
  { name: "Devika S", role: "Alumni, Marketing", image: "/team/dev.jpg", quote: "Some of my closest friends today are people I first met holding a flattened paintbrush at fresher's ink." },
  { name: "Rishitha K P", role: "Alumni, Events", image: "/team/image.png", quote: "If you ever see me at a resale paint stall, it's because Scribbles rewired things: I look at art supply prices for fun now." },
  { name: "Santoshi", role: "Alumni, Coordinator", image: "/team/sant.jpg", quote: "Our coordinator badge was heavier than it looked, but the clap when an event goes right was worth everything." },
  { name: "Yazhvendhan", role: "Alumni, Coordinator", image: "/team/yaz.jpeg", quote: "I joined for the lettering workshops. I stayed because of the people who have since left — and the ones who never will." },
];

const webTeam = [
  { name: "Abirami", role: "Web Development Team", image: "/team/abi.webp", linkedin: "https://www.linkedin.com/in/abirami-ramanathan-707521285/", quote: "Building this website was like painting with code — every sprint had a design review and a smile in Slack." },
  { name: "Hashim M", role: "Web Development Team", image: "/team/has.jpeg", linkedin: "https://www.linkedin.com/in/hashim-m-160b96340/", quote: "Shipping the new site felt exactly like finishing a mural: paint inspection by everyone, and then applause." },
  { name: "Ramya S", role: "Web Development Team", image: "/team/ramy.jpg", linkedin: "https://www.linkedin.com/in/ramyalnkdn/", quote: "The club taught me that a website is art too — and that we get to choose the palette." },
  { name: "Sathish J", role: "Web Development Team", image: "/team/sath.webp", quote: "Deploy day felt like gallery night: nerve-racking, then beautiful when it finally stuck." },
  { name: "Gurumoorthi R", role: "Web Development Team", image: "", quote: "I wrote a lot of code and went to more workshops, and I wouldn't have it any other way." },
  { name: "Subi Pinsha P", role: "Web Development Team", image: "", quote: "Pairing with the design team showed me what a pixel of patience can do for a whole layout." },
{ name: "Deepak S", role: "Web Development Team", image: "", quote: "The best part of this club isn't the dashboard — it's the people you get to build it for." },
];

function TestimonialsRow({ title, items, scrollerId }) {
  const [openIndex, setOpenIndex] = useState(null);
  const scrollerRef = React.useRef(null);
  const [canLeft, setCanLeft] = React.useState(false);
  const [canRight, setCanRight] = React.useState(true);
  const drag = React.useRef({ down: false, moved: false, x: 0, start: 0 });
  const check = React.useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 12);
    setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 12);
  }, []);
  React.useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    check();
    el.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    return () => { el.removeEventListener("scroll", check); window.removeEventListener("resize", check); };
  }, [check]);
  const onDown = (e) => { drag.current = { down: true, moved: false, x: e.clientX ?? e.touches?.[0]?.clientX ?? 0, start: scrollerRef.current.scrollLeft }; };
  const onMove = (e) => {
    if (!drag.current.down) return;
    const x = e.clientX ?? e.touches?.[0]?.clientX ?? 0;
    const dx = x - drag.current.x;
    if (Math.abs(dx) > 6) drag.current.moved = true;
    scrollerRef.current.scrollLeft = drag.current.start - dx;
  };
  const onUp = () => { setTimeout(() => { drag.current.down = false; }, 0); };
  return (
    <section className="section" style={{ marginTop: "2rem" }}>
      <div className="section-header">
        <h3 style={{ fontSize: "clamp(1.3rem, 3vw, 1.6rem)" }}>{title}</h3>
      </div>
      <div style={{ width: "100%", overflow: "hidden", position: "relative" }} id={scrollerId}>
        <div ref={scrollerRef} className="no-scrollbar" onMouseDown={onDown} onMouseMove={onMove} onMouseUp={onUp} onMouseLeave={onUp} onTouchStart={onDown} onTouchMove={onMove} onTouchEnd={onUp}
          style={{ display: "flex", gap: "1rem", overflowX: "auto", scrollBehavior: drag.current.moved ? "auto" : "smooth", paddingBottom: "1rem", scrollSnapType: "x mandatory", scrollPaddingInline: 12 }}>
          {items.map((m, i) => (
            <div key={`${scrollerId}-${i}`} style={{ flex: "0 0 auto", scrollSnapAlign: "start" }}>
              <div role="button" tabIndex={0} aria-expanded={openIndex === i} onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setOpenIndex(i === openIndex ? null : i); } }} onClick={() => { if (drag.current.moved) return; setOpenIndex(i === openIndex ? null : i); }}
                className="card" style={{ width: 280, borderRadius: 16, boxShadow: "var(--card-shadow)", background: "#fff" }}>
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
                      <img
                        src={m.image || "/logo.png"}
                        alt={m.name}
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = "/logo.png";
                        }}
                      />
                    </div>
                    <div>
                      <div style={{ fontWeight: 600 }}>{m.name}</div>
                      <div className="muted" style={{ fontSize: "0.9rem" }}>{m.role}</div>
                    </div>
                  </div>

                    {openIndex === i && (
                    <div className="muted" style={{ marginTop: "0.75rem", fontSize: "0.95rem", lineHeight: 1.65, background: "#f9fafb", borderRadius: 12, padding: "0.75rem 0.9rem" }}>{m.quote}</div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        <button className="scroll-arrow" aria-label="Scroll left" disabled={!canLeft} onClick={() => scrollerRef.current?.scrollBy({ left: -300, behavior: "smooth" })} style={{ position: "absolute", left: 8, top: "50%", transform: "translateY(-50%)", width: 42, height: 42, borderRadius: "50%", border: "2px solid rgba(0,0,0,0.1)", background: "rgba(255,255,255,0.95)", backdropFilter: "blur(10px)", fontSize: 22, color: "#333", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 10, boxShadow: "0 4px 12px rgba(0,0,0,0.15)" }}>‹</button>
        <button className="scroll-arrow" aria-label="Scroll right" disabled={!canRight} onClick={() => scrollerRef.current?.scrollBy({ left: 300, behavior: "smooth" })} style={{ position: "absolute", right: 8, top: "50%", transform: "translateY(-50%)", width: 42, height: 42, borderRadius: "50%", border: "2px solid rgba(0,0,0,0.1)", background: "rgba(255,255,255,0.95)", backdropFilter: "blur(10px)", fontSize: 22, color: "#333", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 10, boxShadow: "0 4px 12px rgba(0,0,0,0.15)" }}>›</button>
      </div>
    </section>
  );
}

export default function TestimonialsPage() {
  const drops = React.useMemo(() => Array.from({ length: 28 }).map(() => ({
    left: Math.random() * 100, duration: 9 + Math.random() * 8, delay: Math.random() * 5, opacity: 0.3 + Math.random() * 0.4, size: 4 + Math.random() * 6, hue: Math.floor(180 + Math.random() * 180),
  })), []);
  return (
    <div className="page" style={{ position: "relative", overflow: "hidden" }}>
      <div className="pastel-rain-layer" aria-hidden="true">
        {drops.map((d, i) => (
          <span key={i} className="pastel-drop" style={{ left: `${d.left}%`, animationDuration: `${d.duration}s`, animationDelay: `${d.delay}s`, opacity: d.opacity, width: `${d.size}px`, height: `${d.size}px`, "--hue": d.hue }} />
        ))}
      </div>
      <Navbar />
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
              src="https://www.youtube.com/embed/dQw4w9WgXcQ?rel=0"
              title="Scribbles Testimonials Snippet"
              frameBorder="0"
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
            ></iframe>
          </div>
          <p className="muted" style={{ marginTop: "1rem" }}>
            Short clips where members share favorite Scribbles memories and experiences.
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

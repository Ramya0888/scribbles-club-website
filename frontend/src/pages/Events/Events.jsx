import React from "react";
import CountdownTimer from "./CountdownTimer";
import PastEvents from "./PastEvents";
import UpcomingEvents from "./UpcomingEvents";
import Navbar from "../../components/Navbar";
import "./Events.css";
import "../../styles/ContactPastelRain.css";

const Events = () => {
  const dropCount = 50;
  const thoorigaEvents = [
    {
      title: "Speed Art Battle",
      date: "21 Feb 2026",
      description: "A high-energy timed art challenge where participants create artwork based on a common theme. Unique twists like unlocking materials through puzzles and mid-round restrictions test both creativity and adaptability.",
      image: "https://res.cloudinary.com/djcyst7fi/image/upload/v1774625184/speed_art_nwngcp.jpg"
    },
    {
      title: "Paint Balls",
      date: "21 Feb 2026",
      description: "Teams recreate a given image while opponents try to disrupt them using water balloons. A fun mix of strategy, teamwork, and chaos on the playground.",
      image: "https://res.cloudinary.com/djcyst7fi/image/upload/v1774625140/paint_ball_sun1qq.jpg"
    },
    {
      title: "Art Without Hands",
      date: "21 Feb 2026",
      description: "Participants create artwork using unconventional tools like sponges, leaves, and straws instead of their hands. A fun and challenging way to explore creativity differently.",
      image: "https://res.cloudinary.com/djcyst7fi/image/upload/v1774625031/Art_without_hands_v8ygnv.jpg"
    },
    {
      title: "Pass the Canvas",
      date: "21 Feb 2026",
      description: "A collaborative art event where participants pass their canvas when music stops and continue each other’s work. The result is a unique group masterpiece filled with mixed ideas.",
      image: "https://res.cloudinary.com/djcyst7fi/image/upload/v1774625143/pass_the_canvas_jtof8u.jpg"
    },
    {
      title: "Mandala / Zentangle Art",
      date: "21 Feb 2026",
      description: "A calming art session focused on creating intricate mandala or zentangle patterns. Perfect for relaxation, focus, and artistic expression.",
      image: "https://res.cloudinary.com/djcyst7fi/image/upload/v1774625283/mandola_rk9kth.jpg"
    },
    {
      title: "Run and Draw",
      date: "21 Feb 2026",
      description: "One teammate observes a reference image and describes it verbally while the other draws it. Communication skills and memory play a key role in recreating the artwork.",
      image: "https://res.cloudinary.com/djcyst7fi/image/upload/v1774859689/run_and_draw_ly8t27.jpg"
    },
    {
      title: "Mystery Box Craft",
      date: "21 Feb 2026",
      description: "Participants create crafts using randomly assigned materials from a mystery box. Creativity, teamwork, and innovation are key to building something unique.",
      image: "https://res.cloudinary.com/djcyst7fi/image/upload/v1774625230/Mystery_box_challenge_rgiqot.jpg"
    },
    {
      title: "Sell the Scribble",
      date: "21 Feb 2026",
      description: "Teams create quick artwork and pitch it confidently like a business idea. Inspired by Shark Tank, this event rewards creativity, humor, and presentation skills.",
      image: "https://res.cloudinary.com/djcyst7fi/image/upload/v1774625181/sell_the_scribble_t1mse3.jpg"
    },
    {
      title: "Hand and Face Painting",
      date: "21 Feb 2026",
      description: "A vibrant event where Scribbles members painted creative designs on participants’ hands and faces. It added color, fun, and an artistic vibe to the entire event atmosphere.",
      image: "https://res.cloudinary.com/djcyst7fi/image/upload/v1774625076/Face_painting_uk8ktj.jpg"
    },
    {
      title: "Musical Sketch Challenge",
      date: "21 Feb 2026",
      description: "A fun pre-event where participants sketch stick-figure dance moves based on popular songs played. Quick thinking and creativity help capture the most recognizable moves within the time limit.",
      image: "https://res.cloudinary.com/djcyst7fi/image/upload/v1774625280/Musical_sketch_qtb8tf.jpg"
    },
    {
      title: "No Hands Painting Challenge",
      date: "21 Feb 2026",
      description: "A quirky pre-event where participants create artwork without using their dominant hand. Using elbows or the non-dominant hand, this challenge tests coordination, adaptability, and creativity.",
      image: "https://res.cloudinary.com/djcyst7fi/image/upload/v1774625107/No_hands_painting_o3owpj.jpg"
    },
    {
      title: "Colour Recall Challenge",
      date: "21 Feb 2026",
      description: "A memory-based pre-event where participants recreate a colored image after observing it briefly. Accuracy in colors and details determines the winner under time pressure.",
      image: "https://res.cloudinary.com/djcyst7fi/image/upload/v1774625031/colour_recall_rywpvv.jpg"
    },
   
  ];
  
  const techofesEvents = [
    {
      title: "Art Mayhem",
      date: "28 Feb 2026",
      description: "A high-energy team-based art competition combining creativity with chaos. Participants recreate artworks from memory and draw under physical distractions, testing focus, teamwork, and adaptability.",
      image: "https://res.cloudinary.com/djcyst7fi/image/upload/v1774887294/art_mayeham_zim3mg.jpg"
    },
    {
      title: "Beat Drop Brush Drop",
      date: "27 Feb 2026",
      description: "A fun, fast-paced team event blending art with music and movie decoding. From identifying films through drawings to sketching along with beats, it challenges creativity and quick thinking.",
      image: "https://res.cloudinary.com/djcyst7fi/image/upload/v1774887306/brushdrop_ksa84h.jpg"
    }
  ];

  return (
    <div
      className="events-page"
      style={{ position: "relative", overflow: "hidden" }}
    >
      {/* Pastel Rain Layer */}
      <div className="contact-pastel-rain-layer">
        {Array.from({ length: dropCount }).map((_, i) => (
          <span
            key={i}
            className="contact-pastel-drop"
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

      {/* All site navigation lives in the shared navbar */}
      <Navbar />

      {/* Hero Section */}
      <div className="events-title page-title-top">
  <h2 className="curly-title main-title">Events</h2>
</div>
<div style={{ position: "relative", zIndex: 2 }}>



{/* 🔥 Upcoming Event Title */}
{/*<div className="upcoming-main-title">
  <h2 className="curly-title">Upcoming Event</h2>
</div>*/}

{/* ⏳ Countdown */}
{/*<CountdownTimer targetDate="2026-02-19T09:00:00" />*/}

{/* 🌟 Featured Event Card 
<div className="featured-event-card">
  <img
    src="https://res.cloudinary.com/djcyst7fi/image/upload/v1766840314/Screenshot_2025-12-27_182504_mlr1lj.png"
    alt="Featured Event"
  />

  <div className="featured-content">
    <h3>Thooriga ’26</h3>
    <p>
      Experience a vibrant celebration of creativity with interactive art,
      games, workshops, and colorful expressions all in one place.
    </p>
  </div>
</div>*/}

{/* 🔽 Existing grid */}
<section className="thooriga-hero" style={{ position: "relative", zIndex: 2 }}>
        
        
        <p className="scribbles-presents">Our Signature Event</p>

        <h1 className="thooriga-arch">
          {"Thooriga’26".split("").map((ch, i) => (
            <span key={i} style={{ "--i": i }}>
              {ch}
            </span>
          ))}
        </h1>

        <p className="thooriga-tagline">
          A celebration where art meets joy, and fun sets the rhythm.
        </p>

        <div className="thooriga-intro-card">
          <p>
            Thooriga is an immersive experience filled with colours, creativity,
            laughter, and playful games alongside interactive workshops,
            vibrant stalls, and a gallery that brings ideas to life. This isn’t
            just an art event — it’s a space to create, explore, play, and connect.
            From hands-on experiences to moments of joyful chaos, every corner
            promises something exciting.
          </p>
        </div>
     </section>




</div>
{/* 🎯 Past Events Section */}
<div style={{ position: "relative", zIndex: 2 }}>
<div className="events-title">
{/* 🎨 Thooriga Section */}
  <h3 className="curly-title">Events from Thooriga’26</h3>
  <PastEvents events={thoorigaEvents} />

</div>
<div>
<UpcomingEvents />
</div>
      
      


  



  {/* 🎭 Techofes Section */}
<div className="events-title">
{/* 🎨 Thooriga Section */}
  <h3 className="curly-title">Events from Techofes’26</h3>
  <PastEvents events={techofesEvents} />

</div>

</div>
      
    </div>
  );
};

export default Events;
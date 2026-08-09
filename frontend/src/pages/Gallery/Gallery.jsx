import React, { useState, useEffect, useRef } from "react";
import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';

// Workshop events data with vibrant colors
const workshopEvents = [
  {
    id: "key-holder",
    title: "Key Holder Workshop",
    subtitle: "Craft Your Perfect Key Holder",
    description: "Learn to create beautiful, functional key holders with resin and clay art techniques.",
    folderPath: "/Key Holder Workshop/Key Holder Workshop",
    gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    gradientLight: "linear-gradient(135deg, rgba(102,126,234,0.1) 0%, rgba(118,75,162,0.1) 100%)",
    color1: "#667eea",
    color2: "#764ba2",
    icon: "🔑",
    glowColor: "#764ba2"
  },
  {
    id: "resin-keychain",
    title: "Resin Keychain Workshop",
    subtitle: "Design Unique Resin Keychains",
    description: "Create stunning, personalized keychains using colorful resin and embedded elements.",
    folderPath: "/Resin Keychain Workshop/Resin Keychain Workshop",
    gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    gradientLight: "linear-gradient(135deg, rgba(240,147,251,0.1) 0%, rgba(245,87,108,0.1) 100%)",
    color1: "#f093fb",
    color2: "#f5576c",
    icon: "🔗",
    glowColor: "#f5576c"
  },
  {
    id: "tote-bag",
    title: "Tote Bag & Resin Art",
    subtitle: "Fashion Meets Art",
    description: "Design your own tote bag and complement it with beautiful resin accessories.",
    folderPath: "/Tote bag and resin art/Tote bag and resin art",
    gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    gradientLight: "linear-gradient(135deg, rgba(79,172,254,0.1) 0%, rgba(0,242,254,0.1) 100%)",
    color1: "#4facfe",
    color2: "#00f2fe",
    icon: "👜",
    glowColor: "#00f2fe"
  },
];

// Image Card Component with 3D effect
const ImageCard = ({ src, alt, index, gradient, color1, color2 }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [imgError, setImgError] = useState(false);

  return (
    <div
      style={{
        position: "relative",
        flex: "0 0 auto",
        width: "320px",
        margin: "0 12px",
        borderRadius: "24px",
        overflow: "hidden",
        background: `linear-gradient(135deg, ${color1}20, ${color2}20)`,
        boxShadow: isHovered 
          ? `0 30px 50px -15px rgba(0,0,0,0.3), 0 0 0 3px ${color1}80, 0 0 20px ${color2}` 
          : "0 15px 35px -10px rgba(0,0,0,0.2)",
        transform: isHovered ? "translateY(-12px) scale(1.02)" : "translateY(0) scale(1)",
        transition: "all 0.4s cubic-bezier(0.34, 1.2, 0.64, 1)",
        cursor: "pointer",
        backdropFilter: "blur(10px)",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated gradient border on hover */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          padding: "2px",
          borderRadius: "24px",
          background: `linear-gradient(135deg, ${color1}, ${color2}, ${color1})`,
          opacity: isHovered ? 1 : 0,
          transition: "opacity 0.3s ease",
          pointerEvents: "none",
        }}
      />
      
      <div
        style={{
          position: "relative",
          width: "100%",
          paddingBottom: "100%",
          overflow: "hidden",
          background: `linear-gradient(135deg, ${color1}10, ${color2}10)`,
        }}
      >
        {!isLoaded && !imgError && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: `linear-gradient(135deg, ${color1}30, ${color2}30)`,
            }}
          >
            <div style={{
              width: "40px",
              height: "40px",
              border: `3px solid ${color1}40`,
              borderTopColor: color1,
              borderRadius: "50%",
              animation: "spin 0.8s linear infinite"
            }} />
          </div>
        )}
        
        {!imgError ? (
          <img
            src={src}
            alt={alt}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transition: "transform 0.5s cubic-bezier(0.34, 1.2, 0.64, 1)",
              transform: isHovered ? "scale(1.1)" : "scale(1)",
              opacity: isLoaded ? 1 : 0,
            }}
            onLoad={() => setIsLoaded(true)}
            onError={() => setImgError(true)}
          />
        ) : (
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              background: `linear-gradient(135deg, ${color1}20, ${color2}20)`,
              color: "#999",
              fontSize: "14px",
            }}
          >
            <span style={{ fontSize: "48px", marginBottom: "12px", opacity: 0.5 }}>🎨</span>
            <span style={{ fontFamily: "system-ui", fontWeight: 500 }}>Image coming soon</span>
          </div>
        )}
        
        {/* Overlay with gradient */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `linear-gradient(135deg, ${color1}00 0%, ${color2}40 100%)`,
            opacity: isHovered ? 0.6 : 0,
            transition: "opacity 0.3s ease",
            pointerEvents: "none",
          }}
        />
      </div>
      
      {/* Image number badge */}
      <div
        style={{
          position: "absolute",
          bottom: "16px",
          right: "16px",
          background: `linear-gradient(135deg, ${color1}, ${color2})`,
          backdropFilter: "blur(8px)",
          padding: "6px 14px",
          borderRadius: "30px",
          fontSize: "12px",
          fontWeight: "bold",
          color: "white",
          fontFamily: "'Poppins', system-ui, sans-serif",
          opacity: isHovered ? 1 : 0.8,
          transition: "all 0.3s ease",
          transform: isHovered ? "scale(1.05)" : "scale(1)",
          boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
        }}
      >
        {String(index + 1).padStart(2, '0')}
      </div>
    </div>
  );
};

// Gallery Row Component
const ArtisticGalleryRow = ({ event }) => {
  const scrollRef = useRef(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  useEffect(() => {
    const loadImages = async () => {
      setLoading(true);
      const loadedImages = [];
      let consecutiveFailures = 0;
      let counter = 1;
      
      while (consecutiveFailures < 3 && counter <= 50) {
        const extensions = ['.jpg', '.jpeg', '.png', '.webp', '.JPG', '.JPEG', '.PNG'];
        let found = false;
        
        for (const ext of extensions) {
          const imgPath = `${event.folderPath}/image${counter}${ext}`;
          const imgExists = await new Promise((resolve) => {
            const img = new Image();
            img.onload = () => resolve(true);
            img.onerror = () => resolve(false);
            img.src = imgPath;
          });
          
          if (imgExists) {
            loadedImages.push(imgPath);
            found = true;
            consecutiveFailures = 0;
            break;
          }
        }
        
        if (!found) consecutiveFailures++;
        counter++;
      }
      
      setImages(loadedImages);
      setLoading(false);
    };
    
    loadImages();
  }, [event.folderPath]);

  const checkScrollPosition = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeftArrow(scrollLeft > 30);
      setShowRightArrow(scrollLeft + clientWidth < scrollWidth - 30);
    }
  };

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -380 : 380;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const scrollElement = scrollRef.current;
    if (scrollElement) {
      scrollElement.addEventListener("scroll", checkScrollPosition);
      checkScrollPosition();
      return () => scrollElement.removeEventListener("scroll", checkScrollPosition);
    }
  }, [images]);

  if (loading) {
    return (
      <section style={{ margin: "80px 0", textAlign: "center", padding: "60px" }}>
        <div style={{
          width: "60px",
          height: "60px",
          margin: "0 auto",
          background: `conic-gradient(from 0deg, ${event.color1}, ${event.color2}, ${event.color1})`,
          borderRadius: "50%",
          animation: "spin 1s linear infinite"
        }} />
        <p style={{ marginTop: "24px", color: "#666", fontFamily: "'Poppins', system-ui" }}>
          Loading {event.title}...
        </p>
      </section>
    );
  }

  if (images.length === 0) {
    return null;
  }

  return (
    <section
      style={{
        margin: "80px 0",
        position: "relative",
      }}
    >
      {/* Animated gradient background */}
      <div
        style={{
          position: "absolute",
          top: -50,
          left: "10%",
          right: "10%",
          height: "calc(100% + 100px)",
          background: `radial-gradient(ellipse at 50% 0%, ${event.color1}30, transparent 70%)`,
          borderRadius: "200px",
          pointerEvents: "none",
          zIndex: 0,
          animation: "pulse 3s ease-in-out infinite",
        }}
      />

      {/* Workshop Header with artistic design */}
      <div
        style={{
          textAlign: "center",
          marginBottom: "50px",
          position: "relative",
          zIndex: 2,
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "12px",
            background: `linear-gradient(135deg, ${event.color1}20, ${event.color2}20)`,
            padding: "8px 28px",
            borderRadius: "60px",
            marginBottom: "20px",
            backdropFilter: "blur(10px)",
            border: `1px solid ${event.color1}40`,
          }}
        >
          <span style={{ fontSize: "32px", filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.1))" }}>{event.icon}</span>
          <span
            style={{
              fontFamily: "'Poppins', system-ui, sans-serif",
              fontSize: "13px",
              letterSpacing: "4px",
              textTransform: "uppercase",
              background: event.gradient,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontWeight: 700,
            }}
          >
            Exclusive Workshop
          </span>
        </div>
        
        <h2
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "clamp(42px, 6vw, 64px)",
            fontWeight: 700,
            margin: "0 0 16px 0",
            background: event.gradient,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            letterSpacing: "-0.02em",
          }}
        >
          {event.title}
        </h2>
        
        <p
          style={{
            fontFamily: "'Poppins', system-ui, sans-serif",
            fontSize: "17px",
            color: "#555",
            maxWidth: "600px",
            margin: "0 auto",
            lineHeight: 1.6,
            fontWeight: 400,
          }}
        >
          {event.description}
        </p>
        
        {/* Decorative line */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "8px",
            marginTop: "24px",
          }}
        >
          <div style={{ width: "50px", height: "3px", background: event.gradient, borderRadius: "3px" }} />
          <div style={{ width: "15px", height: "3px", background: event.gradient, borderRadius: "3px" }} />
          <div style={{ width: "50px", height: "3px", background: event.gradient, borderRadius: "3px" }} />
        </div>
      </div>

      {/* Gallery Scroller */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          padding: "0 20px",
        }}
      >
        {showLeftArrow && (
          <button
            onClick={() => scroll("left")}
            style={{
              position: "absolute",
              left: "0px",
              top: "50%",
              transform: "translateY(-50%)",
              width: "48px",
              height: "48px",
              borderRadius: "50%",
              background: `linear-gradient(135deg, ${event.color1}, ${event.color2})`,
              border: "none",
              cursor: "pointer",
              fontSize: "28px",
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 20,
              boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-50%) scale(1.1)";
              e.currentTarget.style.boxShadow = "0 6px 25px rgba(0,0,0,0.3)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(-50%) scale(1)";
              e.currentTarget.style.boxShadow = "0 4px 15px rgba(0,0,0,0.2)";
            }}
          >
            ‹
          </button>
        )}

        <div
          ref={scrollRef}
          style={{
            display: "flex",
            gap: "24px",
            overflowX: "auto",
            scrollBehavior: "smooth",
            padding: "20px 60px",
            scrollbarWidth: "thin",
          }}
          className="gallery-scroll"
        >
          {images.map((imgSrc, idx) => (
            <ImageCard
              key={idx}
              src={imgSrc}
              alt={`${event.title} - Image ${idx + 1}`}
              index={idx}
              gradient={event.gradient}
              color1={event.color1}
              color2={event.color2}
            />
          ))}
        </div>

        {showRightArrow && images.length > 4 && (
          <button
            onClick={() => scroll("right")}
            style={{
              position: "absolute",
              right: "0px",
              top: "50%",
              transform: "translateY(-50%)",
              width: "48px",
              height: "48px",
              borderRadius: "50%",
              background: `linear-gradient(135deg, ${event.color1}, ${event.color2})`,
              border: "none",
              cursor: "pointer",
              fontSize: "28px",
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 20,
              boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-50%) scale(1.1)";
              e.currentTarget.style.boxShadow = "0 6px 25px rgba(0,0,0,0.3)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(-50%) scale(1)";
              e.currentTarget.style.boxShadow = "0 4px 15px rgba(0,0,0,0.2)";
            }}
          >
            ›
          </button>
        )}
      </div>
    </section>
  );
};

// Main Gallery Page
export default function GalleryPage() {
  return (
    <div
      style={{
        position: "relative",
        overflowX: "hidden",
        background: "linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)",
        minHeight: "100vh",
      }}
    >
      {/* Animated floating particles background */}
      <Navbar />
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          pointerEvents: "none",
          zIndex: 0,
          overflow: "hidden",
        }}
      >
        {Array.from({ length: 100 }).map((_, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${2 + Math.random() * 6}px`,
              height: `${2 + Math.random() * 6}px`,
              background: `hsla(${200 + Math.random() * 160}, 80%, 65%, ${0.3 + Math.random() * 0.5})`,
              borderRadius: "50%",
              animation: `float ${5 + Math.random() * 10}s linear infinite`,
              animationDelay: `${Math.random() * 10}s`,
              filter: "blur(1px)",
            }}
          />
        ))}
        
        {/* Animated gradient orbs */}
        <div
          style={{
            position: "absolute",
            top: "10%",
            left: "-10%",
            width: "500px",
            height: "500px",
            background: "radial-gradient(circle, rgba(102,126,234,0.3) 0%, transparent 70%)",
            borderRadius: "50%",
            animation: "pulse 8s ease-in-out infinite",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "10%",
            right: "-10%",
            width: "600px",
            height: "600px",
            background: "radial-gradient(circle, rgba(240,147,251,0.3) 0%, transparent 70%)",
            borderRadius: "50%",
            animation: "pulse 10s ease-in-out infinite reverse",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: "400px",
            height: "400px",
            background: "radial-gradient(circle, rgba(79,172,254,0.2) 0%, transparent 70%)",
            borderRadius: "50%",
            animation: "pulse 12s ease-in-out infinite",
          }}
        />
      </div>

      {/* Page Header */}
      <header
        style={{
          textAlign: "center",
          padding: "120px 20px 60px",
          position: "relative",
          zIndex: 2,
        }}
      >
        <p
          style={{
            fontFamily: "'Poppins', system-ui, sans-serif",
            fontSize: "12px",
            letterSpacing: "6px",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.7)",
            marginBottom: "20px",
            fontWeight: 500,
          }}
        >
          Discover Our Creative Universe
        </p>
        
        <h1
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "clamp(48px, 10vw, 96px)",
            fontWeight: 700,
            margin: 0,
            background: "linear-gradient(135deg, #fff 0%, #a8c0ff 50%, #3f2b96 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            letterSpacing: "-0.02em",
            textShadow: "0 0 30px rgba(168,192,255,0.3)",
          }}
        >
          Art Gallery
        </h1>
        
        <p
          style={{
            fontFamily: "'Poppins', system-ui, sans-serif",
            fontSize: "18px",
            color: "rgba(255,255,255,0.8)",
            marginTop: "16px",
            maxWidth: "500px",
            marginLeft: "auto",
            marginRight: "auto",
            lineHeight: 1.6,
          }}
        >
          A journey through creativity, craftsmanship, and artistic expression
        </p>
        
        {/* Decorative divider */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "12px",
            marginTop: "32px",
          }}
        >
          <div style={{ width: "60px", height: "2px", background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent)" }} />
          <div style={{ width: "8px", height: "8px", background: "white", borderRadius: "50%", opacity: 0.6 }} />
          <div style={{ width: "60px", height: "2px", background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent)" }} />
        </div>
      </header>

      {/* Workshop Galleries */}
      <div style={{ position: "relative", zIndex: 2, padding: "0 20px 80px" }}>
        {workshopEvents.map((event) => (
          <ArtisticGalleryRow key={event.id} event={event} />
        ))}
      </div>

      <Footer />

      {/* Global Styles */}
      <style>{`
        @keyframes float {
          0% {
            transform: translateY(0px) translateX(0px);
            opacity: 0;
          }
          10% {
            opacity: 0.5;
          }
          90% {
            opacity: 0.5;
          }
          100% {
            transform: translateY(-100vh) translateX(50px);
            opacity: 0;
          }
        }
        
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        
        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
            opacity: 0.3;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.5;
          }
        }
        
        @keyframes shimmer {
          0% {
            background-position: -1000px 0;
          }
          100% {
            background-position: 1000px 0;
          }
        }
        
        .gallery-scroll::-webkit-scrollbar {
          height: 6px;
        }
        
        .gallery-scroll::-webkit-scrollbar-track {
          background: rgba(255,255,255,0.1);
          border-radius: 10px;
        }
        
        .gallery-scroll::-webkit-scrollbar-thumb {
          background: linear-gradient(90deg, #667eea, #764ba2, #f093fb, #f5576c, #4facfe, #00f2fe);
          border-radius: 10px;
        }
        
        .gallery-scroll::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(90deg, #764ba2, #f5576c, #00f2fe);
        }
        
        * {
          box-sizing: border-box;
        }
        
        /* Smooth scroll behavior */
        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </div>
  );
}
import { useEffect, useRef, useState } from "react";

function useReveal(threshold = 0.2) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold }
    );

    if (ref.current) observer.observe(ref.current);
    return () => ref.current && observer.unobserve(ref.current);
  }, [threshold]);

  return [ref, visible];
}

export default function DesignServiceSection() {
  const [sectionRef, visible] = useReveal();

  const images = ["/service.png", "/reception.png", "/comprehensive.png"];

  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  // AUTO SLIDE
  useEffect(() => {
    if (paused) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [paused]);

  return (
    <section
      ref={sectionRef}
      onMouseEnter={() => setPaused(true)}   // pause on hover
      onMouseLeave={() => setPaused(false)}
      style={{
        position: "relative",
        height: "90vh",
        width: "100%",
        overflow: "hidden",
        fontFamily: "serif",
      }}
    >
      {/* BACKGROUND IMAGES */}
      {images.map((img, index) => (
        <div
          key={index}
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url(${img})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            transition: "opacity 1.2s ease",
            opacity: current === index ? 1 : 0,
          }}
        />
      ))}

      {/* DARK OVERLAY */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0,0,0,0.45)",
        }}
      />

      {/* CENTER TEXT */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          color: "#fff",
          padding: "0 20px",

          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(55px)",
          transition: "all 1s ease",
        }}
      >
        <h2 style={{ fontSize: 40, marginBottom: 20 }}>
          Explore Our Comprehensive{" "}
          <span style={{ color: "#ddd" }}>Design Service</span>
        </h2>

        <p style={{ maxWidth: 800, lineHeight: 1.6,fontSize:20,width:900 }}>
 At Meraki Fabric Solution, we specialize in delivering a comprehensive, end-to-end fabric design service specifically curated to meet the sophisticated demands of interior designers, contractors, architects, furniture manufacturers, and homeowners across the UAE. Our dedicated team of experts manages the entire creative lifecycle, from initial concept development and brand alignment to final production, ensuring every textile solution meets your exact functional requirements. By providing professional guidance through a vast selection of textures, custom color palettes, intricate patterns, and high-performance finishing techniques, we empower our clients to transform their vision into elevated, customized spaces
        </p>
      </div>

      {/* CONTROLS */}
      <div
        style={{
          position: "absolute",
          bottom: 30,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: 12,
          zIndex: 3,
        }}
      >
        {images.map((_, index) => (
          <div
            key={index}
            onClick={() => {
              setCurrent(index);
              setPaused(true); // stop auto when user interacts
            }}
            style={{
              width: current === index ? 24 : 10,
              height: 10,
              borderRadius: 20,
              background: "#fff",
              opacity: current === index ? 1 : 0.5,
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
          />
        ))}
      </div>

      {/* PREV / NEXT BUTTONS */}
      <div
        style={{
          position: "absolute",
          width: "100%",
          top: "50%",
          transform: "translateY(-50%)",
          display: "flex",
          justifyContent: "space-between",
          padding: "0 30px",
          zIndex: 3,
        }}
      >
        <button
          onClick={() => {
            setCurrent((prev) =>
              prev === 0 ? images.length - 1 : prev - 1
            );
            setPaused(true);
          }}
          style={{
            background: "rgba(255,255,255,0.2)",
            border: "none",
            color: "#fff",
            fontSize: 24,
            padding: "8px 14px",
            cursor: "pointer",
            borderRadius: 6,
          }}
        >
          ‹
        </button>

        <button
          onClick={() => {
            setCurrent((prev) => (prev + 1) % images.length);
            setPaused(true);
          }}
          style={{
            background: "rgba(255,255,255,0.2)",
            border: "none",
            color: "#fff",
            fontSize: 24,
            padding: "8px 14px",
            cursor: "pointer",
            borderRadius: 6,
          }}
        >
          ›
        </button>
      </div>
    </section>
  );
}
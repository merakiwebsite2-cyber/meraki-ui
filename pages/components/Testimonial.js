import { useState, useEffect, useRef } from "react";

/* ---------- SCROLL REVEAL ---------- */
function useReveal(threshold = 0.2) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
      },
      { threshold }
    );

    if (ref.current) observer.observe(ref.current);

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [threshold]);

  return [ref, visible];
}


const testimonials = [
  {
    name: "Micheal Maron",
    img: "/user1.png",
  },
  {
    name: "Vincet Steve",
    img: "/user2.png",
    featured: true,
  },
  {
    name: "Micheal Maron",
    img: "/user1.png",
  },
];

export default function TestimonialsSection() {
  const [activeTab, setActiveTab] = useState("clients");
  const [sectionRef, visible] = useReveal();

  return (
    <section
      ref={sectionRef}
      style={{
        padding: "120px 80px",
        textAlign: "center",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(40px)",
        transition: "all 1s cubic-bezier(0.22,1,0.36,1)",
        fontFamily: "serif",
      }}
    >
      {/* ---------- TITLE ---------- */}
      <h2 style={{ fontSize: 34, marginBottom: 12 }}>
        Here’s what{" "}
        <span style={{ color: "#3f5f78" }}>
          WARM WORDS OUR CLIENTS
        </span>{" "}
        say
      </h2>

      <p
        style={{
          maxWidth: 600,
          margin: "0 auto 40px",
          fontSize: 14,
          color: "#777",
        }}
      >
        We source and produce fabrics using the finest materials,
        ensuring durability, colorfastness, and a premium feel you
        can trust.
      </p>

      {/* ---------- BUTTONS ---------- */}
      <div style={{ display: "flex", justifyContent: "center", gap: 20 }}>
        {[
          { id: "clients", label: "Our Clients" },
          { id: "creations", label: "Top Customer Creations" },
        ].map((btn) => (
          <button
            key={btn.id}
            onClick={() => setActiveTab(btn.id)}
            style={{
              padding: "12px 36px",
              borderRadius: 6,
              border:
                activeTab === btn.id
                  ? "1px solid #3f5f78"
                  : "1px solid #ccc",
              background:
                activeTab === btn.id ? "#3f5f78" : "#fff",
              color: activeTab === btn.id ? "#fff" : "#333",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
          >
            {btn.label}
          </button>
        ))}
      </div>

      {/* ---------- CARDS ---------- */}
      <div
        style={{
          marginTop: 70,
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 30,
          maxWidth: 1100,
          marginInline: "auto",
        }}
      >
        {testimonials.map((item, i) => (
          <div
            key={i}
            style={{
              background: "#fff",
              borderRadius: 14,
              padding: "50px 30px 40px",
              boxShadow: item.featured
                ? "0 20px 50px rgba(0,0,0,0.12)"
                : "0 10px 30px rgba(0,0,0,0.08)",
              transform: item.featured
                ? "translateY(-10px)"
                : "translateY(0)",
              transition: "all 0.4s ease",
              opacity: visible ? 1 : 0,
              transitionDelay: `${i * 0.15}s`,
            }}
          >
            {/* Avatar */}
            <img
              src={item.img}
              alt={item.name}
              style={{
                width: 60,
                height: 60,
                borderRadius: "50%",
                objectFit: "cover",
                marginBottom: 14,
              }}
            />

            <h4 style={{ marginBottom: 12 }}>{item.name}</h4>

            <p
              style={{
                fontSize: 13,
                color: "#777",
                lineHeight: 1.7,
                marginBottom: 18,
              }}
            >
              We source and produce fabrics using the finest materials,
              ensuring durability, colorfastness, and a premium feel
              you can trust.
            </p>

            {/* Stars */}
            <div style={{ color: "#f6b400" }}>
              ★ ★ ★ ★ ★
            </div>
          </div>
        ))}
      </div>

      {/* ---------- DOTS ---------- */}
      <div
        style={{
          marginTop: 40,
          display: "flex",
          justifyContent: "center",
          gap: 8,
        }}
      >
        {[1, 2, 3, 4].map((d) => (
          <span
            key={d}
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: d === 2 ? "#333" : "#ccc",
            }}
          />
        ))}
      </div>
    </section>
  );
}

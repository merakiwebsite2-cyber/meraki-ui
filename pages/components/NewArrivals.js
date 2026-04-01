import { Button } from "antd";
import { RightOutlined } from "@ant-design/icons";
import { useEffect, useRef, useState } from "react";

/* -------- SCROLL REVEAL -------- */
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

const items = [
  {
    title: "Weekly New Fabrics",
    image: "/weekly_new.png",
    number: "01",
  },
  {
    title: "Latest Patterns",
    image: "/latest_pattern.png",
    number: "02",
  },
  {
    title: "Seasonal Stock",
    image: "/seassonal_arrival.png",
    number: "03",
  },
];

export default function NewArrivalsSection() {
  const [sectionRef, visible] = useReveal();

  return (
    <section
      ref={sectionRef}
      style={{
        padding: "140px 80px",
        background: "#f7f7f5",
        fontFamily: "serif",
        overflow: "hidden",
      }}
    >
      {/* HEADER */}
      <div
        style={{
          maxWidth: 500,
          marginBottom: 100,
          transform: visible ? "translateY(0)" : "translateY(60px)",
          opacity: visible ? 1 : 0,
          transition: "all 1s ease",
        }}
      >
        <h2 style={{ fontSize: 40, color: "#1f3a52", marginBottom: 16 }}>
          New Arrivals
        </h2>

        <p style={{ color: "#666", lineHeight: 1.8 }}>
          Discover curated fabrics crafted for elegance, comfort, and timeless appeal.
        </p>
      </div>

      {/* ASYMMETRIC LAYOUT */}
      <div
        style={{
          display: "flex",
          gap: 40,
          alignItems: "flex-start",
        }}
      >
        {items.map((item, index) => {
          const offsets = [
            { marginTop: 0, height: 420 },
            { marginTop: 80, height: 520 },
            { marginTop: 40, height: 460 },
          ];

          return (
            <div
              key={index}
              style={{
                flex: 1,
                position: "relative",
                marginTop: offsets[index].marginTop,
                height: offsets[index].height,
                overflow: "hidden",
                cursor: "pointer",

                transform: visible
                  ? "translateY(0)"
                  : "translateY(80px)",
                opacity: visible ? 1 : 0,
                transition: `all 1s cubic-bezier(0.22,1,0.36,1) ${
                  index * 0.2
                }s`,
              }}
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = (e.clientX - rect.left) / rect.width;
                const y = (e.clientY - rect.top) / rect.height;

                e.currentTarget.style.transform = `translateY(-10px) scale(1.02) rotateX(${
                  (y - 0.5) * 6
                }deg) rotateY(${(x - 0.5) * 6}deg)`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0) scale(1)";
              }}
            >
              {/* IMAGE */}
              <img
                src={item.image}
                alt={item.title}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  transition: "transform 1s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                }}
              />

              {/* DARK OVERLAY */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.6), transparent)",
                }}
              />

              {/* TEXT CONTENT */}
              <div
                style={{
                  position: "absolute",
                  bottom: 30,
                  left: 30,
                  color: "#fff",
                  transform: visible
                    ? "translateY(0)"
                    : "translateY(20px)",
                  transition: "all 0.8s ease",
                }}
              >
                <Button
                  size="small"
                  style={{
                    background: "#fff",
                    color: "#000",
                    borderRadius: 20,
                    marginBottom: 12,
                    border: "none",
                  }}
                  icon={<RightOutlined />}
                >
                  Explore
                </Button>

                <h3 style={{ fontSize: 22, margin: 0 }}>
                  {item.title}
                </h3>
              </div>

              {/* BIG NUMBER */}
              <span
                style={{
                  position: "absolute",
                  top: 20,
                  right: 20,
                  fontSize: 60,
                  color: "#fff",
                  opacity: 0.15,
                  fontWeight: 600,
                }}
              >
                {item.number}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
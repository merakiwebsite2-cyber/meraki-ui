import { Row, Col } from "antd";
import { useEffect, useRef, useState } from "react";

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


const reasons = [
  {
    number: "01",
    title: "Premium-Grade Fabrics, Tested for Quality",
    desc:
      "We source and produce fabrics using the finest materials, ensuring durability, colorfastness, and a premium feel you can trust.",
    bg: "#8fa3b3",
    dark: true,
  },
  {
    number: "02",
    title: "Trend-Focused Designs & Wide Variety",
    desc:
      "From classic weaves to modern prints, we stay ahead of trends—offering a wide selection to match every style, purpose, and season.",
    bg: "#c7d2d9",
  },
  {
    number: "03",
    title: "Consistent Supply & Timely Delivery",
    desc:
      "With strong production capacity and careful inventory management, we ensure seamless availability and on-time delivery for all order sizes.",
    bg: "#eef1f3",
  },
];

export default function WhyWeSection() {
  const [sectionRef, visible] = useReveal();

  return (
    <section
      ref={sectionRef}
      style={{
        padding: "120px 80px",
        background: "#fff",
        fontFamily: "serif",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(40px)",
        transition: "all 1s cubic-bezier(0.22, 1, 0.36, 1)",
      }}
    >
      {/* -------- HEADER -------- */}
      <div style={{ maxWidth: 900 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 24,
            marginBottom: 24,
          }}
        >
          <h2 style={{ fontSize: 28, fontWeight: 400 }}>Why We</h2>

          {/* animated divider */}
          <div
            style={{
              height: 1,
              background: "#cfcfcf",
              flex: 1,
              transform: visible ? "scaleX(1)" : "scaleX(0)",
              transformOrigin: "left",
              transition: "transform 1.2s ease",
            }}
          />
        </div>

        <p
          style={{
            color: "#666",
            lineHeight: 1.8,
            maxWidth: 760,
            opacity: visible ? 1 : 0,
            transition: "opacity 1s ease 0.4s",
          }}
        >
          Lorem Ipsum is that it has a more-or-less normal distribution of
          letters, as opposed to using 'Content here, content here', making it
          look like readable English. Many desktop publishing packages and web
          page editors now use Lorem Ipsum as their default model text, and a
          search for 'lorem ipsum' will uncover many web sites still in their
          infancy. Various versions have evolved over the years, sometimes by
          accident, sometimes on purpose (injected humour and the like).
        </p>
      </div>

      {/* -------- CARDS -------- */}
      <Row gutter={32} style={{ marginTop: 80 }}>
        {reasons.map((item, index) => (
          <Col md={8} key={index}>
            <div
              style={{
                height: "100%",
                padding: 32,
                background: item.bg,
                color: item.dark ? "#fff" : "#000",
                borderRadius: 6,
                position: "relative",
                opacity: visible ? 1 : 0,
                transform: visible
                  ? "translateY(0)"
                  : "translateY(30px)",
                transition: `all 0.7s ease ${0.4 + index * 0.15}s`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-8px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              {/* Number */}
              <span
                style={{
                  fontSize: 36,
                  fontWeight: 500,
                  opacity: item.dark ? 0.8 : 0.3,
                  display: "block",
                  marginBottom: 16,
                }}
              >
                {item.number}
              </span>

              <h4
                style={{
                  fontSize: 18,
                  marginBottom: 16,
                  lineHeight: 1.4,
                }}
              >
                {item.title}
              </h4>

              <p
                style={{
                  fontSize: 14,
                  lineHeight: 1.7,
                  opacity: item.dark ? 0.9 : 0.8,
                }}
              >
                {item.desc}
              </p>
            </div>
          </Col>
        ))}
      </Row>
    </section>
  );
}

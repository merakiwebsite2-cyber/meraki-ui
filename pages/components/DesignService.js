import { Row, Col } from "antd";
import { RightOutlined } from "@ant-design/icons";
import { useEffect, useRef, useState } from "react";

/* -------- REVEAL HOOK -------- */
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


export default function DesignServiceSection() {
  const [sectionRef, visible] = useReveal();

  return (
    <section
      ref={sectionRef}
      style={{
        padding: "120px 80px",
        background: "#fff",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(40px)",
        transition: "all 1s cubic-bezier(0.22, 1, 0.36, 1)",
        fontFamily: "serif",
      }}
    >
      {/* -------- HEADER -------- */}
      <div style={{ textAlign: "center", marginBottom: 60 }}>
        <h2
          style={{
            fontSize: 36,
            letterSpacing: visible ? 2 : 8,
            transition: "letter-spacing 1s ease",
          }}
        >
          Explore Our Comprehensive{" "}
          <span style={{ color: "#1f3a52" }}>Design Service</span>
        </h2>

        <p
          style={{
            maxWidth: 720,
            margin: "20px auto 0",
            color: "#666",
            lineHeight: 1.7,
            opacity: visible ? 1 : 0,
            transition: "opacity 1s ease",
          }}
        >
          Lorem Ipsum is that it has a more-or-less normal distribution of
          letters, as opposed to using 'Content here, content here', making it
          look like readable English. Many desktop publishing packages and web
          design
        </p>
      </div>

      {/* -------- CONTENT -------- */}
      <Row gutter={60} align="middle">
        {/* IMAGE */}
        <Col md={12}>
          <div
            style={{
              overflow: "hidden",
              borderRadius: 24,
              transform: visible ? "translateX(0)" : "translateX(-40px)",
              opacity: visible ? 1 : 0,
              transition:
                "all 1.1s cubic-bezier(0.22, 1, 0.36, 1)",
            }}
          >
            <img
              src="/comprehensive.png"
              alt="Design Service"
              style={{
                width: "100%",
                height: "auto",
                display: "block",
              }}
            />
          </div>
        </Col>

        {/* LIST */}
        <Col md={12}>
          <div style={{ borderTop: "1px solid #ddd" }}>
            {[
              "HOSPITALITY & RESIDENTIAL",
              "COMMERCIAL DESIGN",
              "CUSTOM INTERIORS",
            ].map((item, index) => (
              <div
                key={index}
                style={{
                  padding: "24px 0",
                  borderBottom: "1px solid #ddd",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  cursor: "pointer",
                  transition: "all 0.4s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.paddingLeft = "12px";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.paddingLeft = "0px";
                }}
              >
                <span style={{ color: "#999" }}>
                  {String(index + 1).padStart(2, "0")}
                </span>

                <strong style={{ flex: 1, marginLeft: 20 }}>
                  {item}
                </strong>

                <RightOutlined
                  style={{
                    color: "#1f3a52",
                    fontSize: 18,
                  }}
                />
              </div>
            ))}
          </div>
        </Col>
      </Row>

      {/* -------- STATS -------- */}
      <Row
        gutter={40}
        style={{
          marginTop: 100,
          textAlign: "center",
        }}
      >
        {[
          { value: "40", label: "Years Experience" },
          { value: "1200+", label: "Projects Completed" },
          { value: "1580+", label: "Clients Satisfaction" },
        ].map((stat, i) => (
          <Col md={8} key={i}>
            <div
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(20px)",
                transition: `all 0.6s ease ${0.2 + i * 0.15}s`,
              }}
            >
              <h2 style={{ fontSize: 44 }}>{stat.value}</h2>
              <p style={{ color: "#666" }}>{stat.label}</p>
            </div>
          </Col>
        ))}
      </Row>
    </section>
  );
}

import { Row, Col, Button } from "antd";
import { RightOutlined } from "@ant-design/icons";
import { useEffect, useRef, useState } from "react";

/* -------- SCROLL REVEAL -------- */
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
        padding: "120px 80px",
        background: "#f7f7f5",
        fontFamily: "serif",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(40px)",
        transition: "all 1s cubic-bezier(0.22, 1, 0.36, 1)",
      }}
    >
      {/* -------- HEADER -------- */}
      <div style={{ maxWidth: 640, marginBottom: 60 }}>
        <h2
          style={{
            fontSize: 36,
            color: "#1f3a52",
            marginBottom: 16,
          }}
        >
          New Arrivals
        </h2>

        <p style={{ color: "#666", lineHeight: 1.7 }}>
          From classic weaves to modern prints, we stay ahead of trends—offering
          a wide selection to match every style, purpose, and season.
        </p>
      </div>

      {/* -------- CARDS -------- */}
      <Row gutter={40}>
        {items.map((item, index) => (
          <Col md={8} key={index}>
            <div
              style={{
                background: "#fff",
                borderRadius: 16,
                overflow: "hidden",
                position: "relative",
                transform: visible
                  ? "translateY(0)"
                  : "translateY(30px)",
                opacity: visible ? 1 : 0,
                transition: `all 0.7s ease ${0.2 + index * 0.15}s`,
                boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-6px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              {/* IMAGE */}
              <div style={{ overflow: "hidden" }}>
                <img
                  src={item.image}
                  alt={item.title}
                  style={{
                    width: "100%",
                    height: 260,
                    objectFit: "cover",
                    transition: "transform 0.6s ease",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "scale(1.05)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                />
              </div>

              {/* CONTENT */}
              <div style={{ padding: 24 }}>
                <Button
                  size="small"
                  style={{
                    background: "#5a748c",
                    color: "#fff",
                    borderRadius: 20,
                    marginBottom: 16,
                    border: "none",
                  }}
                  icon={<RightOutlined />}
                >
                  Grab The Deal
                </Button>

                <h4 style={{ fontSize: 18, marginBottom: 0 }}>
                  {item.title}
                </h4>
              </div>

              {/* NUMBER */}
              <span
                style={{
                  position: "absolute",
                  bottom: 16,
                  right: 20,
                  fontSize: 48,
                  color: "#000",
                  opacity: 0.08,
                  fontWeight: 600,
                }}
              >
                {item.number}
              </span>
            </div>
          </Col>
        ))}
      </Row>
    </section>
  );
}

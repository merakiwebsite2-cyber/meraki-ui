import { Input, Card, Row, Col } from "antd";
import { SearchOutlined, HeartOutlined } from "@ant-design/icons";
import { useEffect, useRef, useState } from "react";

/* -------------------- DATA -------------------- */
const products = [
  { title: "Curtains", image: "/curtain.png" },
  { title: "Wall Coverings", image: "/wall.png" },
  { title: "Trims", image: "/trim.png" },
  { title: "Sheer", image: "/sheer.png" },
  { title: "Cushion", image: "/cusion.png" },
  { title: "Upholstery", image: "/uphoistry.png" },
  { title: "Furniture", image: "/furniture.png" },
  { title: "Rugs", image: "/rugs.png" },
];

/* -------------------- SCROLL REVEAL HOOK -------------------- */
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


/* -------------------- COMPONENT -------------------- */
export default function ProductsSection() {
  const [sectionRef, visible] = useReveal();

  return (
    <section
      ref={sectionRef}
      style={{
        padding: "120px 60px",
        background: "#fff",
        fontFamily: "serif",

        /* Premium reveal */
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: "all 1s cubic-bezier(0.22, 1, 0.36, 1)",
      }}
    >
      {/* -------------------- HEADING -------------------- */}
      <div style={{ marginBottom: 50 }}>
        <p
          style={{
            fontSize: 16,
            marginBottom: 6,
            color: "#333",
          }}
        >
          Where quality fabric meets
        </p>

        <h2
          style={{
            fontSize: 48,
            fontWeight: 400,
            letterSpacing: visible ? 2 : 10,
            color: "#1f3a52",
            transition: "letter-spacing 1.2s ease",
          }}
        >
          TIMELESS DESIGN
        </h2>
      </div>

      {/* -------------------- HEADER ROW -------------------- */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 50,
        }}
      >
        <h3 style={{ fontSize: 40, fontWeight: 400 }}>Products</h3>

        <Input
          prefix={<SearchOutlined />}
          placeholder="Search"
          style={{
            width: 280,
            borderRadius: 20,
            transition: "all 0.3s ease",
          }}
          onFocus={(e) =>
            (e.target.style.boxShadow =
              "0 0 0 3px rgba(31,58,82,0.15)")
          }
          onBlur={(e) => (e.target.style.boxShadow = "none")}
        />
      </div>

      {/* -------------------- PRODUCTS GRID -------------------- */}
      <Row gutter={[24, 36]}>
        {products.map((item, index) => (
          <Col xs={24} sm={12} md={8} lg={6} key={index}>
            <section
              hoverable
              bodyStyle={{ padding: 0 }}
              style={{
                borderRadius: 22,
                border: "none",
                overflow: "hidden",

                /* Staggered reveal */
                opacity: visible ? 1 : 0,
                transform: visible
                  ? "translateY(0)"
                  : "translateY(30px)",
                transition:
                  "all 0.7s cubic-bezier(0.22, 1, 0.36, 1)",
                transitionDelay: `${index * 80}ms`,
              }}
            >
              {/* IMAGE */}
              <div style={{ overflow: "hidden" }}>
                <img
                  src={item.image}
                  alt={item.title}
                  style={{
                    height: 400,
                    width: "100%",
                    objectFit: "cover",
                    transition: "transform 0.9s ease",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform =
                      "scale(1.06)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform =
                      "scale(1)")
                  }
                />
              </div>

              {/* FOOTER */}
              <div
                style={{
                  padding: "14px 18px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span style={{ fontSize: 14 }}>{item.title}</span>

                <HeartOutlined
                  style={{
                    color: "#999",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "#1f3a52";
                    e.currentTarget.style.transform = "scale(1.15)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "#999";
                    e.currentTarget.style.transform = "scale(1)";
                  }}
                />
              </div>
            </section>
          </Col>
        ))}
      </Row>
    </section>
  );
}

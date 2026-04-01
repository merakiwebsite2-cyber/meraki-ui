import { Row, Col } from "antd";
import { HeartOutlined } from "@ant-design/icons";
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

/* -------------------- SCROLL REVEAL -------------------- */
function useReveal(threshold = 0.2) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
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
        padding: "80px 60px",
        background: "#fff",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(30px)",
        transition: "all 1s ease",
      }}
    >
      {/* -------------------- HEADING -------------------- */}
      <div style={{ textAlign: "center", marginBottom: 60 }}>
        <div
          style={{
            fontFamily: "'Quicksand', sans-serif",
            fontSize: 36,
            color: "#1f3a52",
          }}
        >
          Quality you can feel,
        </div>

        <h1
          style={{
            fontFamily: "'Satisfy'",
            fontSize: 60,
            color: "#1f3a52",
            margin: 0,
          }}
        >
          Design that never fades.
        </h1>
      </div>

      {/* -------------------- PRODUCTS GRID -------------------- */}
      <Row gutter={[24, 36]}>
        {products.map((item, index) => (
          <Col xs={24} sm={12} md={8} lg={6} key={index}>
            <div
              style={{
                borderRadius: 10,
                overflow: "hidden",
                position: "relative",
                cursor: "pointer",

                opacity: visible ? 1 : 0,
                transform: visible
                  ? "translateY(0)"
                  : "translateY(30px)",
                transition: "all 0.6s ease",
                transitionDelay: `${index * 100}ms`,
              }}
            >
              {/* IMAGE */}
              <img
                src={item.image}
                alt={item.title}
                style={{
                  width: "100%",
                  height: 400,
                  objectFit: "cover",
                  transition: "transform 0.8s ease",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "scale(1.08)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
              />

              {/* OVERLAY */}
              <div
                className="overlay"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  background: "rgba(0,0,0,0.45)",
                  opacity: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "opacity 0.4s ease",
                }}
              >
                <div
                  className="overlay-text"
                  style={{
                    color: "#fff",
                    fontSize: 24,
                    fontFamily: "'Quicksand', sans-serif",
                    letterSpacing: "1px",
                    transform: "translateY(20px)",
                    opacity: 0,
                    transition: "all 0.4s ease",
                  }}
                >
                  {item.title}
                </div>
              </div>

              {/* HOVER HANDLER */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                }}
                onMouseEnter={(e) => {
                  const parent = e.currentTarget.parentElement;
                  const overlay = parent.querySelector(".overlay");
                  const text = parent.querySelector(".overlay-text");

                  overlay.style.opacity = 1;
                  text.style.opacity = 1;
                  text.style.transform = "translateY(0)";
                }}
                onMouseLeave={(e) => {
                  const parent = e.currentTarget.parentElement;
                  const overlay = parent.querySelector(".overlay");
                  const text = parent.querySelector(".overlay-text");

                  overlay.style.opacity = 0;
                  text.style.opacity = 0;
                  text.style.transform = "translateY(20px)";
                }}
              />

              {/* HEART ICON */}
              {/* <div
                style={{
                  position: "absolute",
                  bottom: 15,
                  right: 15,
                  color: "#fff",
                }}
              >
                <HeartOutlined
                  style={{
                    fontSize: 18,
                    cursor: "pointer",
                    transition: "transform 0.3s ease",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "scale(1.2)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                />
              </div> */}
            </div>
          </Col>
        ))}
      </Row>
    </section>
  );
}
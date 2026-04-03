import { Row, Col } from "antd";
import { useEffect, useRef, useState } from "react";

/* -------------------- DATA -------------------- */
const products = [
  { title: "Curtains", image: "/curtain.png" },
  { title: "Wall Coverings", image: "/wall.png" },
  { title: "Trims", image: "/trim.png" },
  { title: "Sheer", image: "/sheer.png" },
  { title: "Cushion", image: "/cusion.png" },
  { title: "Upholstery", image: "/uphoistry.png" },
  // { title: "Furniture", image: "/furniture.png" },
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
const [screenWidth, setScreenWidth] = useState(1024); // default safe value

  const isMobile = screenWidth < 768;

useEffect(() => {
  const handleResize = () => setScreenWidth(window.innerWidth);

  handleResize(); // set initial value after mount

  window.addEventListener("resize", handleResize);
  return () => window.removeEventListener("resize", handleResize);
}, []);

  /* -------------------- CLICK HANDLER -------------------- */
  const handleClick = (item) => {
    const token = localStorage.getItem("token");

    if (!token) {
      window.location.href = "/login";
    } else {
      window.location.href = `/products?category=${item.title}`;
    }
  };

  return (
    <section
      ref={sectionRef}
      style={{
        padding:
          screenWidth < 480
            ? "40px 15px"
            : screenWidth < 768
            ? "50px 20px"
            : "80px 60px",
        background: "#fff",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(30px)",
        transition: "all 1s ease",
      }}
    >
      {/* HEADING */}
      <div style={{ textAlign: "center", marginBottom: 40 }}>
        <div
          style={{
            fontFamily: "'Quicksand', sans-serif",
            fontSize:
              screenWidth < 480
                ? 16
                : screenWidth < 768
                ? 22
                : 36,
            color: "#1f3a52",
          }}
        >
          Quality you can feel,
        </div>

        <h1
          style={{
            fontFamily: "'Satisfy'",
            fontSize:
              screenWidth < 480
                ? 26
                : screenWidth < 768
                ? 36
                : 60,
            color: "#1f3a52",
            margin: 0,
          }}
        >
          Design that never fades.
        </h1>
      </div>

      {/* GRID */}
      <Row gutter={[16, 24]}>
        {products.map((item, index) => (
          <Col xs={24} sm={12} md={8} lg={6} key={index}>
            <div
              onClick={() => handleClick(item)}
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

              /* HOVER EFFECT (DESKTOP ONLY) */
              onMouseEnter={(e) => {
                if (isMobile) return;

                const img = e.currentTarget.querySelector("img");
                const overlay = e.currentTarget.querySelector(".overlay");
                const text = e.currentTarget.querySelector(".overlay-text");

                img.style.transform = "scale(1.08)";
                overlay.style.opacity = 1;
                text.style.opacity = 1;
                text.style.transform = "translateY(0)";
              }}
              onMouseLeave={(e) => {
                if (isMobile) return;

                const img = e.currentTarget.querySelector("img");
                const overlay = e.currentTarget.querySelector(".overlay");
                const text = e.currentTarget.querySelector(".overlay-text");

                img.style.transform = "scale(1)";
                overlay.style.opacity = 0;
                text.style.opacity = 0;
                text.style.transform = "translateY(20px)";
              }}
            >
              {/* IMAGE */}
              <img
                src={item.image}
                alt={item.title}
                style={{
                  width: "100%",
                  height:
                    screenWidth < 480
                      ? 220
                      : screenWidth < 768
                      ? 280
                      : 400,
                  objectFit: "cover",
                  transition: "transform 0.8s ease",
                }}
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

                  opacity: isMobile ? 1 : 0,

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
                    fontSize: 22,
                    fontFamily: "'Quicksand', sans-serif",

                    transform: isMobile
                      ? "translateY(0)"
                      : "translateY(20px)",
                    opacity: isMobile ? 1 : 0,

                    transition: "all 0.4s ease",
                  }}
                >
                  {item.title}
                </div>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </section>
  );
}
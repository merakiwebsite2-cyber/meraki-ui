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


/* ---------- GALLERY ITEM ---------- */
function GalleryItem({
  img,
  visible,
  delay,
  height = "100%",
  style = {},
}) {
  return (
    <div
      style={{
        ...style,
        borderRadius: 22,
        overflow: "hidden",
        background: "#fff",
        boxShadow: "0 12px 30px rgba(0,0,0,0.08)",
        transform: visible ? "translateY(0)" : "translateY(40px)",
        opacity: visible ? 1 : 0,
        transition: `all 0.8s cubic-bezier(0.22,1,0.36,1) ${delay}s`,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform =
          "translateY(-6px) scale(1.02)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform =
          "translateY(0) scale(1)";
      }}
    >
      <img
        src={img}
        alt=""
        style={{
          width: "100%",
          height,
          objectFit: "cover",
          display: "block",
        }}
      />
    </div>
  );
}


/* ---------- MAIN SECTION ---------- */
export default function TrendingWorkSection() {
  const [sectionRef, visible] = useReveal();

  return (
    <section
      ref={sectionRef}
      style={{
        padding: "120px 80px",
        background: "linear-gradient(180deg, #d9e1e6 0%, #ffffff 45%)",
        fontFamily: "serif",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(40px)",
        transition: "all 1s cubic-bezier(0.22, 1, 0.36, 1)",
      }}
    >
      {/* ---------- TOP CONTENT ---------- */}
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto 120px",
          background: "#fff",
          borderRadius: 10,
          overflow: "hidden",
          boxShadow: "0 30px 60px rgba(0,0,0,0.06)",
        }}
      >
        <Row>
          {/* IMAGE */}
          <Col md={10}>
            <div
              style={{
                height: "100%",
                overflow: "hidden",
                transform: visible
                  ? "translateY(0)"
                  : "translateY(40px)",
                opacity: visible ? 1 : 0,
                transition:
                  "all 1s cubic-bezier(0.22, 1, 0.36, 1)",
              }}
            >
              <img
                src="/trending.png"
                alt="Trending Work"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
              />
            </div>
          </Col>

          {/* TEXT */}
          <Col md={14}>
            <div style={{ padding: "60px 50px" }}>
              <h3 style={{ fontSize: 22, fontWeight: 400, marginBottom: 16 }}>
                Trending Work From Us
              </h3>

              <p
                style={{
                  fontSize: 14,
                  lineHeight: 1.8,
                  color: "#666",
                  opacity: visible ? 1 : 0,
                  transition: "opacity 1s ease 0.3s",
                }}
              >
                Lorem Ipsum is that it has a more-or-less normal distribution of
                letters, making it look like readable English. Many desktop
                publishing packages and web page editors now use Lorem Ipsum as
                their default model text.
                     Lorem Ipsum is that it has a more-or-less normal distribution of
                letters, making it look like readable English. Many desktop
                publishing packages and web page editors now use Lorem Ipsum as
                their default model text.
                     Lorem Ipsum is that it has a more-or-less normal distribution of
                letters, making it look like readable English. Many desktop
                publishing packages and web page editors now use Lorem Ipsum as
                their default model text.
                     Lorem Ipsum is that it has a more-or-less normal distribution of
                letters, making it look like readable English. Many desktop
                publishing packages and web page editors now use Lorem Ipsum as
                their default model text.
                     Lorem Ipsum is that it has a more-or-less normal distribution of
                letters, making it look like readable English. Many desktop
                publishing packages and web page editors now use Lorem Ipsum as
                their default model text.
                     Lorem Ipsum is that it has a more-or-less normal distribution of
                letters, making it look like readable English. Many desktop
                publishing packages and web page editors now use Lorem Ipsum as
                their default model text.
                     Lorem Ipsum is that it has a more-or-less normal distribution of
                letters, making it look like readable English. Many desktop
                publishing packages and web page editors now use Lorem Ipsum as
                their default model text.
                
              </p>
            </div>
          </Col>
        </Row>
      </div>

      {/* ---------- TITLE ---------- */}
      <div style={{ textAlign: "center", marginBottom: 80 }}>
        <h2
          style={{
            fontSize: 28,
            letterSpacing: visible ? 3 : 10,
            transition: "letter-spacing 1s ease",
            color: "#1f3a52",
          }}
        >
          CREATIVE PROJECTS THAT DEFINE
          <span
            style={{
              fontFamily: "cursive",
              fontWeight: 400,
              marginLeft: 8,
            }}
          >
            Our Style
          </span>
        </h2>
      </div>


{/* ---------- UNEVEN GALLERY ---------- */}
<div
  style={{
    maxWidth: 1400,
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "1fr 1.4fr 1fr",
    gridAutoRows: "180px",
    gap: 24,
  }}
>
  {/* LEFT TOP */}
  <GalleryItem
    img="/cusion.png"
    visible={visible}
    delay={0.2}
    style={{ gridColumn: "1", gridRow: "1 / span 1" }}
  />

  {/* LEFT BOTTOM */}
  <GalleryItem
    img="/trim.png"
    visible={visible}
    delay={0.35}
    style={{ gridColumn: "1", gridRow: "2 / span 2" }}
    height={390}
  />

  {/* CENTER LARGE (TOP) */}
  <GalleryItem
    img="/weekly_new.png"
    visible={visible}
    delay={0.5}
    style={{ gridColumn: "2", gridRow: "1 / span 2" }}
    height={360}
  />

  {/* CENTER WIDE (BOTTOM) */}
  <GalleryItem
    img="/wall.png"
    visible={visible}
    delay={0.8}
    style={{ gridColumn: "2", gridRow: "3 / span 1" }}
    height={220}
  />

  {/* RIGHT TOP */}
  <GalleryItem
    img="/comprehensive.png"
    visible={visible}
    delay={0.6}
    style={{ gridColumn: "3", gridRow: "1 / span 1" }}
  />

  {/* RIGHT MIDDLE */}
  <GalleryItem
    img="/curtain.png"
    visible={visible}
    delay={0.9}
    style={{ gridColumn: "3", gridRow: "2 / span 1" }}
  />

  {/* RIGHT BOTTOM */}
  <GalleryItem
    img="/furniture.png"
    visible={visible}
    delay={1.1}
    style={{ gridColumn: "3", gridRow: "3 / span 1" }}
  />
</div>


    </section>
  );
}

import { useEffect, useRef, useState } from "react";

/* ---------- SCROLL REVEAL ---------- */
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

  /* ✅ SSR SAFE SCREEN WIDTH */
  const [screenWidth, setScreenWidth] = useState(1024);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleResize = () => setScreenWidth(window.innerWidth);
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = screenWidth < 768;

  return (
    <section
      ref={sectionRef}
      style={{
        padding:
          screenWidth < 480
            ? "60px 20px"
            : screenWidth < 768
            ? "80px 40px"
            : "120px 80px",
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
          margin: "0 auto 80px",
          position: "relative",
          borderRadius: 10,
          overflow: "hidden",
          boxShadow: "0 30px 60px rgba(0,0,0,0.06)",
        }}
      >
        {/* IMAGE */}
        <img
          src="/trending.png"
          alt="Trending Work"
          style={{
            width: "100%",
            height:
              screenWidth < 480
                ? 300
                : screenWidth < 768
                ? 500
                : 920,
            objectFit: "cover",
            display: "block",
          }}
        />

        {/* TEXT BOX */}
        <div
          style={{
            position: isMobile ? "relative" : "absolute",

            right: isMobile ? "auto" : 77,
            top: isMobile ? "auto" : "56%",
            transform: isMobile ? "none" : "translateY(-50%)",

            width: isMobile ? "100%" : "45%",
            marginTop: isMobile ? 20 : 0,

            background: "rgba(90, 45, 25, 0.75)",
            padding:
              screenWidth < 480
                ? "20px"
                : screenWidth < 768
                ? "25px"
                : "40px 35px",

            borderRadius: 6,
            color: "#fff",

            opacity: visible ? 1 : 0,
            transition: "all 1s ease",
          }}
        >
          <h2
            style={{
              fontSize:
                screenWidth < 480
                  ? 20
                  : screenWidth < 768
                  ? 24
                  : 30,
              marginBottom: 20,
              fontFamily: "'Quicksand', sans-serif",
            }}
          >
            Trending Work From Us
          </h2>

          <p
            style={{
              fontSize:
                screenWidth < 480
                  ? 13
                  : screenWidth < 768
                  ? 14
                  : 16,
              lineHeight: 1.8,
              color: "#f1f1f1",
            }}
          >
            <b>Introducing one of our most talked-about creations — Kohler:</b>
          <br/>
          The Desert Chapter, a signature fabric design by Marco Maximus, unveiled in the creative hub of Dubai Design District. Inspired by the raw beauty and timeless elegance of the Arabian desert, The Desert Chapter captures warm sand tones, sun-washed textures, and subtle geometric movement. The design reflects a harmonious balance between heritage influence and modern luxury making it a standout choice for high-end interior concepts. With its refined detailing and premium finish, Kohler - The Desert Chapter embodies contemporary sophistication while honoring regional inspiration. Designed for designers, architects, and luxury homeowners, this trending work represents innovation rooted in culture. Experience a fabric that tells a story - where desert inspiration meets modern design excellence.
          </p>
        </div>
      </div>

      {/* ---------- TITLE ---------- */}
      <div style={{ textAlign: "center", marginBottom: 60 }}>
        <h2
          style={{
            fontSize:
              screenWidth < 480
                ? 22
                : screenWidth < 768
                ? 30
                : 40,
            letterSpacing: visible ? 3 : 10,
            transition: "letter-spacing 1s ease",
            color: "#1f3a52",
          }}
        >
          CREATIVE PROJECTS THAT DEFINE
          <span style={{ marginLeft: 8 }}>
            Our Style
          </span>
        </h2>
      </div>

      {/* ---------- UNEVEN GRID (UNCHANGED STRUCTURE) ---------- */}
      <div
        style={{
          maxWidth: 1400,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns:
            screenWidth < 768
              ? "1fr"
              : screenWidth < 1024
              ? "1fr 1fr"
              : "1fr 1.4fr 1fr",
          gridAutoRows: screenWidth < 768 ? "auto" : "180px",
          gap: 24,
        }}
      >
        <GalleryItem img="/cusion1.png" visible={visible} delay={0.2} style={{ gridColumn: "1", gridRow: "1 / span 1" }} />
        <GalleryItem img="/trim1.png" visible={visible} delay={0.35} style={{ gridColumn: "1", gridRow: "2 / span 2" }} height={screenWidth < 768 ? 220 : 390} />
        <GalleryItem img="/weekly_new1.png" visible={visible} delay={0.5} style={{ gridColumn: "2", gridRow: "1 / span 2" }} height={screenWidth < 768 ? 220 : 360} />
        <GalleryItem img="/wall1.png" visible={visible} delay={0.8} style={{ gridColumn: "2", gridRow: "3 / span 1" }} height={screenWidth < 768 ? 220 : 220} />
        <GalleryItem img="/comprehensive1.png" visible={visible} delay={0.6} style={{ gridColumn: "3", gridRow: "1 / span 1" }} />
        <GalleryItem img="/curtain1.png" visible={visible} delay={0.9} style={{ gridColumn: "3", gridRow: "2 / span 1" }} />
        <GalleryItem img="/cusion1.png" visible={visible} delay={1.1} style={{ gridColumn: "3", gridRow: "3 / span 1" }} />
      </div>
    </section>
  );
}
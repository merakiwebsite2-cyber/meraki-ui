import { Button } from "antd";
import { useEffect, useRef, useState } from "react";

/* ---------- REVEAL HOOK (same pattern you use) ---------- */
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

/* ---------------- COMPONENT ---------------- */
export default function DesignSection() {
  const [sectionRef, visible] = useReveal();

  return (
    <div
      ref={sectionRef}
      className="design-section mt-2"
      style={{
        /* Section reveal */
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(30px)",
        transition: "all 1s cubic-bezier(0.22, 1, 0.36, 1)",
      }}
    >
      <div className="design-content mt-3">
        {/* HEADING */}
        <h2
          style={{
            transition: "opacity 0.8s ease",
            opacity: visible ? 1 : 0,
          }}
        >
          Customized Your{" "}
          <span
            style={{
              display: "inline-block",
              letterSpacing: visible ? 2 : 8,
              transition: "letter-spacing 1.1s ease",
            }}
          >
            DESIGN
          </span>{" "}
          product HERE
        </h2>

        {/* PARAGRAPH */}
        <p
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(16px)",
            transition:
              "all 0.9s cubic-bezier(0.22, 1, 0.36, 1)",
            transitionDelay: "0.15s",
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

        {/* BUTTON */}
        <Button
          type="primary"
          size="large"
          className="appointment-btn"
          style={{
            marginTop: 20,
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(12px)",
            transition:
              "all 0.6s cubic-bezier(0.22, 1, 0.36, 1)",
            transitionDelay: "0.3s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow =
              "0 10px 30px rgba(0,0,0,0.15)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          Request for appointment
        </Button>
      </div>
    </div>
  );
}

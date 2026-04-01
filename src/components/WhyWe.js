import { useEffect, useRef, useState } from "react";

const sections = [
  {
    title: "Premium Fabrics",
    desc: "Crafted with precision and quality materials.",
    image: "/fabrics1.png",
  },
  {
    title: "Timeless Designs",
    desc: "Modern elegance blended with tradition.",
    image: "/fabrics2.png",
  },
  {
    title: "Reliable Supply",
    desc: "Consistent delivery you can trust.",
    image: "/fabrics3.png",
  },
];

export default function WhyWeZaraStyle() {
  const containerRef = useRef(null);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const rect = containerRef.current.getBoundingClientRect();
      const scrollProgress = Math.min(
        Math.max(-rect.top / window.innerHeight, 0),
        sections.length - 1
      );

      setCurrent(Math.round(scrollProgress));
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        height: `${sections.length * 100}vh`, // 🔥 controls scroll length
        position: "relative",
      }}
    >
      {/* STICKY CONTAINER */}
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          overflow: "hidden",
        }}
      >
        {sections.map((item, index) => {
          let transform = "translateX(100%)";

          if (index === current) {
            transform = "translateX(0)";
          } else if (index < current) {
            transform = "translateX(-100%)";
          }

          return (
            <div
              key={index}
              style={{
                position: "absolute",
                inset: 0,
                transform,
                transition: "transform 0.8s ease",
              }}
            >
              {/* IMAGE */}
              <img
                src={item.image}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />

              {/* OVERLAY */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(to right, rgba(0,0,0,0.5), transparent)",
                }}
              />

              {/* TEXT */}
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "10%",
                  transform: "translateY(-50%)",
                  color: "#fff",
                  maxWidth: 400,
                }}
              >
                <h2 style={{ fontSize: 48 }}>{item.title}</h2>
                <p>{item.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
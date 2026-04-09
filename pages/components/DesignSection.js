import { Button } from "antd";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
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
    const router = useRouter();
   const handleAppointmentClick = () => {
    router.push("/login");
  };
  const [sectionRef, visible] = useReveal();

  return (
    <section className="fabric-section">

      {/* LEFT IMAGE AREA */}
      <div className="fabric-image-wrapper">

        {/* Background FIRST */}
        <img
          src="/downimage.png"
          className="fabric-bg"
          alt="map"
        />

        {/* Person SECOND */}
        <img
          src="/upimage.png"
          className="fabric-person"
          alt="person"
        />

      </div>

      {/* RIGHT TEXT AREA */}
      <div className="fabric-content">

        <h2>
          Best Fabric Supplier in Dubai – Custom
          Upholstery & Curtain Fabrics UAE
        </h2>

        <p>
          Looking for a reliable fabric supplier in Dubai for your interior
          project? Meraki Fabric Solution is a leading provider of premium
          upholstery fabrics, curtain fabrics, sofa materials, and custom
          interior textiles in Dubai and across the UAE.
        </p>

        <p>
          We specialize in high-quality fabrics for villas, apartments,
          offices, hotels, restaurants, and commercial spaces. From blackout
          curtain fabrics and luxury velvet to linen, jacquard, and
          performance textiles, we offer durable, elegant, and fully
          customizable fabric solutions tailored to your needs.
        </p>

        <button
          className="appointment-btn"
          onClick={handleAppointmentClick}
        >
          Request for appointment
        </button>

      </div>

    </section>
  );
}

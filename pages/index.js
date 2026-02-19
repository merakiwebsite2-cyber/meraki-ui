import Navbar from "../pages/components/Navbar";
import AnimateOnScroll from "../pages/components/AnimateOnscroll";
import ProductsSection from "../pages/components/ProductsSection";
import DesignSection from "../pages/components/DesignSection";
import DesignServiceSection from "./components/DesignService";
import NewArrivals from "./components/NewArrivals"
import WhyWe from "./components/WhyWe"
import TrendingWorkSection from "./components/TrendingWorkSection";
import TestimonialsSection from "./components/Testimonial";
import { useEffect, useRef, useState } from "react";
function useReveal(threshold = 0.2) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisible(true),
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return [ref, visible];
}
export default function Home() {
    const [sectionRef, visible] = useReveal();
  return (
    <>
      {/* HERO SECTION */}
      <div className="hero">
        <Navbar />

        <div className="hero-content">
          <AnimateOnScroll y={20}>
              <h2
          style={{
            fontSize: 48,
            fontWeight: 400,
            letterSpacing: visible ? 2 : 10,
            color: "#1f3a52",
            transition: "letter-spacing 1.2s ease",
          }}
        >Find your perfect fabric</h2>
          </AnimateOnScroll>
          <p>
            Lorem Ipsum is that it has a more-or-less normal distribution of
            letters, as opposed to using Content here.      Lorem Ipsum is that it has a more-or-less normal distribution of
            letters, as opposed to using Content here.
          </p>
             <p>
            Lorem Ipsum is that it has a more-or-less normal distribution of
            letters, as opposed to using Content here.
          </p>
             <p>
            Lorem Ipsum is that it has a more-or-less normal distribution of
            letters, as opposed to using Content here.
          </p>
        </div>
      </div>

      {/* SECOND SECTION */}
      <DesignSection className="mt-4" />
      <ProductsSection />
      <DesignServiceSection />
      <NewArrivals />
      <WhyWe/>
      <TrendingWorkSection/>
      <TestimonialsSection/>
    </>
  );
}


import Navbar from "./components/Navbar";
import AnimateOnScroll from "./components/AnimateOnscroll";
import ProductsSection from "./components/ProductsSection";
import DesignSection from "./components/DesignSection";
import DesignServiceSection from "./components/DesignService";
// import NewArrivals from "./components/NewArrivals";
import WhyWe from "./components/WhyWe";
import TrendingWorkSection from "./components/TrendingWorkSection";
import TestimonialsSection from "./components/Testimonial";
// import PageWrapper from "./pagewrapper";

export default function Home() {
  return (
    
    <>
   
      {/* HERO SECTION */}
      <div className="hero">
            <video
          className="hero-video"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/bannervideo.mp4" type="video/mp4" />
        </video>
        <Navbar />

        {/* <div className="hero-left-box"> */}
          <div>
            <img src="./logo.png"/>
            {/* <h1 className="hero-title">
              Find your perfect <br />
              <span>FABRIC</span>
            </h1>

            <p className="hero-text">
              Find your perfect fabric, designed to match your style and elevate your space.Discover luxurious textures, rich colors, and timeless patterns crafted with care.From modern elegance to classic charm, we have materials for every vision.Experience quality you can see, feel, and trust.Transform your interiors with fabrics that make a lasting impression.
            </p> */}

            {/* <p className="hero-text">
        From modern elegance to classic charm, we have materials for every vision.
        Experience quality you can see and feel.
      </p> */}
          </div>
        </div>
      {/* </div> */}

      {/* OTHER SECTIONS */}
      <DesignSection className="mt-4" />
      <ProductsSection />
      <DesignServiceSection />
      {/* <NewArrivals /> */}
      <TrendingWorkSection />
      {/* <WhyWe /> */}
      
      {/* <TestimonialsSection /> */}
    </>
  );
}
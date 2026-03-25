import React, { useState, useRef, useEffect } from "react";

import HeroHeader from "../components/HeroHeader";
import AdvantagesBlock from "../components/AdvantagesBlock";
import PricingSection from "../components/PricingSection";
import HowItWorks from "../components/HowItWorks";

import "./Home.css"

const Home = ({ activeService, setActiveService }) => {

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  const modalRef = useRef(null);

  return (
    <div className="home">
      <div className="hero-wrapper">
        <HeroHeader />
      </div>
      <div className="advantages-wrapper">
        <AdvantagesBlock />
      </div>
      <div className="pricing-wrapper">
        <PricingSection />
      </div>

      <div className="process-wrapper">
        <HowItWorks />
      </div>      
    </div>
  );
};

export default Home;

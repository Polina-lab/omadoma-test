import React, { useState, useRef } from "react";

import HeroHeader from "../components/HeroHeader";
import BuyerRequestBlock from "../components/BuyerRequestBlock";
import Services from "../pages/Services";
import ServiceDetails from "../components/ServiceDetails";
import CategoryBlock from "../components/CategoryBlock";
import Process from "../pages/Process";
import Advantages from "../pages/Advantages";
import Partners from "../pages/Partners";
import "./Home.css"

const Home = () => {

  const [activeService, setActiveService] = useState(null);

  const lastScrollPosition = useRef(0);

  const handleServiceClick = (serviceKey) => {
    lastScrollPosition.current = window.scrollY; // запоминаем позицию
    setActiveService(serviceKey);
  };

const handleClose = () => { setActiveService(null); setTimeout(() => { window.scrollTo({ top: lastScrollPosition.current, behavior: "smooth" }); }, 50); };


  const modalRef = useRef(null);

  return (
    <div className="home">
      <div className="hero-wrapper">
        <HeroHeader />
      </div>
      <div className="buyer-banner-wrapper">
        <BuyerRequestBlock />
      </div>
      <div className="services-wrapper">
        <div className="services-bg" />
        <Services activeService={activeService} setActiveService={handleServiceClick} />
        </div>

        {activeService && (
          <ServiceDetails
            ref={modalRef}
            serviceKey={activeService}
            onClose={handleClose}
          />
        )}


      <div className="category-wrapper">
        <CategoryBlock />
      </div>
      <div className="process-advantages-wrapper">
        <Process />
        <Advantages />
      </div>
      <div className="partners-wrapper">
        <Partners />
      </div>
    </div>
  );
};

export default Home;

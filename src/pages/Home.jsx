import React, { useState } from "react";

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
        <Services activeService={activeService} setActiveService={setActiveService} />
        </div>

        {activeService && (
          <ServiceDetails
            serviceKey={activeService}
            onClose={() => setActiveService(null)}
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

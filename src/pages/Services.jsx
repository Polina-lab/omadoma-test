import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import ServiceDetails from "../components/ServiceDetails";
import "./Services.css";


import brokerageIcon from "../assets/services/icon-brokerage.svg";
import brokerageIconHover from "../assets/services/icon-brokerage-hover.svg";

import managementIcon from "../assets/services/icon-management.svg";
import managementIconHover from "../assets/services/icon-management-hover.svg";

import renovationIcon from "../assets/services/icon-renovation.svg";
import renovationIconHover from "../assets/services/icon-renovation-hover.svg";

import valuationIcon from "../assets/services/icon-valuation.svg";
import valuationIconHover from "../assets/services/icon-valuation-hover.svg";

import mediaIcon from "../assets/services/icon-media.svg";
import mediaIconHover from "../assets/services/icon-media-hover.svg";

import investmentIcon from "../assets/services/icon-investment.svg";
import investmentIconHover from "../assets/services/icon-investment-hover.svg";

import financingIcon from "../assets/services/icon-financing.svg";
import financingIconHover from "../assets/services/icon-financing-hover.svg";

const serviceList = [
  { key: "brokerage", iconDefault: brokerageIcon, iconHover: brokerageIconHover },
  { key: "management", iconDefault: managementIcon, iconHover: managementIconHover },
  { key: "renovation", iconDefault: renovationIcon, iconHover: renovationIconHover },
  { key: "valuation", iconDefault: valuationIcon, iconHover: valuationIconHover },
  { key: "media", iconDefault: mediaIcon, iconHover: mediaIconHover },
  { key: "investment", iconDefault: investmentIcon, iconHover: investmentIconHover },
  { key: "financing", iconDefault: financingIcon, iconHover: financingIconHover }
];

const Services = ({ activeService, setActiveService, onClose, modalRef }) => {

  const { t } = useTranslation();

    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    //console.log("isMobile:", isMobile, "width:", window.innerWidth);
  
      useEffect(() => {
      const handleResize = () => {
          setIsMobile(window.innerWidth <= 768);
      };
  
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
      }, []);

  const handleCardClick = (key) => {
    setActiveService(prev => (prev === key ? null : key));
  };

  return (
    <section id="services" className="services-section">
      <h2 className="services-title">{t("services.title")}</h2>
      <div className="services-grid">
        {serviceList.map(({ key, iconDefault, iconHover }) => (
          <React.Fragment key={key}>
            <div className={`service-card ${activeService === key ? "active" : ""}`} onClick={() => handleCardClick(key)}
            >
              <div className="service-layout">
                <div className="service-icon-wrapper">
                  <img src={iconDefault} alt="" className="icon-default service-icon" />
                  <img src={iconHover} alt="" className="icon-hover service-icon" />
                </div>

                <div className="service-content">
                  <h3 className="service-name">{t(`services.${key}.title`)}</h3>
                  <p className="service-description">{t(`services.${key}.description`)}</p>
                  <span className="service-link">{t("services.readMore")}</span>
                </div>
              </div>
            </div>

            {isMobile && activeService === key && (
              <ServiceDetails
                ref={modalRef}
                serviceKey={activeService}
                onClose={onClose}
              />
            )}

          </React.Fragment>
        ))}
      </div>
    </section>
  );
};

export default Services;

import React, { useState, useEffect } from "react";
import { useTranslation, Trans } from "react-i18next";
import "./Advantages.css";

import speed from "../assets/advantages/speed.svg";
import speedHover from "../assets/advantages/speed-hover.svg";
import investment from "../assets/advantages/investment.svg";
import investmentHover from "../assets/advantages/investment-hover.svg";
import database from "../assets/advantages/database.svg";
import databaseHover from "../assets/advantages/database-hover.svg";
import business from "../assets/advantages/business.svg";
import businessHover from "../assets/advantages/business-hover.svg";
import personal from "../assets/advantages/personal.svg";
import personalHover from "../assets/advantages/personal-hover.svg";
import regions from "../assets/advantages/regions.svg";
import regionsHover from "../assets/advantages/regions-hover.svg";

const advantages = [
  { key: "speed", icon: speed, iconHover: speedHover },
  { key: "investment", icon: investment, iconHover: investmentHover },
  { key: "database", icon: database, iconHover: databaseHover },
  { key: "business", icon: business, iconHover: businessHover },
  { key: "personal", icon: personal, iconHover: personalHover },
  { key: "regions", icon: regions, iconHover: regionsHover }
];

const Advantages = () => {
  const { t } = useTranslation();
  const [hovered, setHovered] = useState(null);
  const [active, setActive] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  //console.log("isMobile:", isMobile, "width:", window.innerWidth);
    
  useEffect(() => {
  const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
  };

  window.addEventListener("resize", handleResize);
  return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!isMobile) {
      setActive(null);
    }
  }, [isMobile]);



  return (
    <section id="advantages">
      <div className="advantages-block">
        <h2 className="advantages-title">
          {t("advantages.title")}
          </h2>
        <div className="advantages-list">
          {advantages.map((item) => (
            <div key={item.key}
              className={`advantage-item ${
                hovered === item.key || active === item.key ? "hovered" : ""
              }`}
              onMouseEnter={() => !isMobile && setHovered(item.key)}
              onMouseLeave={() => !isMobile && setHovered(null)}
              onClick={() => isMobile && setActive(prev => prev === item.key ? null : item.key)}
              >
                <div className="advantage-line" />
              <div className="advantage-bg" />
              <img
                            src={
                hovered === item.key || active === item.key
                  ? item.iconHover
                  : item.icon
              }

              alt={t(`advantages.${item.key}.title`)} className="advantage-icon" />
              <div className="advantage-text">
                <h4>{t(`advantages.${item.key}.title`)}</h4>
                <p>{t(`advantages.${item.key}.description`)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Advantages;

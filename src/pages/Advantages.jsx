import React, { useState } from "react";
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

  return (
    <div className="advantages-block">
      <h2 className="advantages-title">
        <Trans i18nKey="advantages.title" components={[
                      <span className="gray" />,
                      <span className="orange2" />
                    ]} />
        </h2>
      <div className="advantages-list">
        {advantages.map((item) => (
          <div key={item.key}
            className={`advantage-item ${hovered === item.key ? "hovered" : ""}`}
            onMouseEnter={() => setHovered(item.key)}
            onMouseLeave={() => setHovered(null)}>
              <div className="advantage-line" />
            <div className="advantage-bg" />
            <img
            src={hovered === item.key ? item.iconHover : item.icon}
            alt={t(`advantages.${item.key}.title`)} className="advantage-icon" />
            <div className="advantage-text">
              <h4>{t(`advantages.${item.key}.title`)}</h4>
              <p>{t(`advantages.${item.key}.description`)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Advantages;

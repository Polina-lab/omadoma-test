import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import "./AdvantagesBlock.css";
import ReactDOM from "react-dom";

import price from "../assets/advantages/price.svg";
import best from "../assets/advantages/best.svg";
import strategy from "../assets/advantages/strategy.svg";
import camera from "../assets/advantages/camera.svg";
import support from "../assets/advantages/support.svg";
import fast from "../assets/advantages/fast.svg";

const advantagesData = [
  { key: "price", icon: price },
  { key: "best", icon: best },
  { key: "strategy", icon: strategy },
  { key: "camera", icon: camera },
  { key: "support", icon: support },
  { key: "fast", icon: fast }
];

const AdvantagesBlock = () => {
  const { t } = useTranslation();

  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % advantagesData.length);
  };

  const prev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? advantagesData.length - 1 : prev - 1
    );
  };

  return (
    <>
    <div className="adv-banner">
      <div className="adv-content">
          {advantagesData.map((adv, index) => {
          const isActive = index === currentIndex;
          return (
            <div
              className={`adv-item ${isActive ? "active" : "hidden"}`}
              key={adv.key}
            >
              <h3 className="adv-title">{t(`advantages.${adv.key}.title`)}</h3>
              <img className="adv-icon" src={adv.icon} alt={adv.key} />
              <p className="adv-desc">{t(`advantages.${adv.key}.description`)}</p>
            </div>
          );
        })}
      </div>
      <div className="adv-slider-controls">
        <button className="adv-prev" onClick={prev}>
          &#8592;
        </button>
        <button className="adv-next" onClick={next}>
          &#8594;
        </button>
      </div>
    </div>
    </>
  );
};

export default AdvantagesBlock;

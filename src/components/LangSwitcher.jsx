import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import "./LangSwitcher.css";
import estFlag from "../assets/flag-est.svg";
import enFlag from "../assets/flag-en.svg";
import ruFlag from "../assets/flag-ru.svg";
import arrowDown from "../assets/arrow-down.svg";
import arrowUp from "../assets/arrow-up.svg";

const LangSwitcher = () => {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);

  const currentLang = i18n.language;
  const toggleMenu = () => setOpen(!open);
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setOpen(false);
  };

  const flagMap = {
    et: estFlag,
    en: enFlag,
    ru: ruFlag,
  };

  return (
    <div className="lang-switcher">
      <button className="lang-button" onClick={toggleMenu}>
        <img src={flagMap[currentLang]} alt={currentLang} className="flag-icon" preserveAspectRatio="xMidYMid meet" />

        <span className="lang-label">{currentLang.toUpperCase()}</span>
        <img src={open ? arrowUp : arrowDown} alt="toggle" className="arrow-icon" />
      </button>

      {open && (
        <div className="lang-menu">
          {["et", "en", "ru"].map((lng) => (
            lng !== currentLang && (
              <button key={lng} onClick={() => changeLanguage(lng)} className="lang-option">
                <img src={flagMap[lng]} alt={lng} className="flag-icon" />
                <span>{lng.toUpperCase()}</span>
              </button>
            )
          ))}
        </div>
      )}
    </div>
  );
};

export default LangSwitcher;

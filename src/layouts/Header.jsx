import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Header = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <header style={{ background: "#eee", padding: "10px" }}>
      <nav>
        <ul style={{ display: "flex", gap: "20px", listStyle: "none" }}>
          <li><Link to="/">{i18n.t("nav.home")}</Link></li>
          <li><Link to="/services">{i18n.t("nav.services")}</Link></li>
          <li><Link to="/process">{i18n.t("nav.process")}</Link></li>
          <li><Link to="/contact">{i18n.t("nav.contact")}</Link></li>
        </ul>
      </nav>
      <div style={{ marginTop: "10px" }}>
        <button onClick={() => changeLanguage("et")}>ET</button>
        <button onClick={() => changeLanguage("en")}>EN</button>
        <button onClick={() => changeLanguage("ru")}>RU</button>
      </div>
    </header>
  );
};

export default Header;

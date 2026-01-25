import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./TopMenu.css";
import logoUrl from "../assets/logo.svg";
import LangSwitcher from "../components/LangSwitcher";

const TopMenu = () => {
  const { i18n, t } = useTranslation();
  const location = useLocation();
  const [langOpen, setLangOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setLangOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 1);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`top-menu ${scrolled ? "scrolled" : "initial"}`}>
      <div className="menu-inner">
        <div className="logo-block">
          <img src={logoUrl} alt="GloReal Investments" className="logo-icon" />
        </div>

        <nav className="nav-links">
          <Link to="/" className={location.pathname === "/" ? "active" : ""}>{t("nav.home")}</Link>
          <Link to="/services" className={location.pathname === "/services" ? "active" : ""}>{t("nav.services")}</Link>
          <Link to="/advantages" className={location.pathname === "/advantages" ? "active" : ""}>{t("nav.advantages")}</Link>
          <Link to="/process" className={location.pathname === "/process" ? "active" : ""}>{t("nav.process")}</Link>
          <Link to="/contact" className={location.pathname === "/contact" ? "active" : ""}>{t("nav.contact")}</Link>
        </nav>

        <div className="lang-dropdown">
          <LangSwitcher />
        </div>
      </div>  
    </header>
  );
};

export default TopMenu;

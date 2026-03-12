import React, { useState, useEffect } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom"
import { Link as ScrollLink } from "react-scroll";
import { useTranslation } from "react-i18next";
import "./TopMenu.css";
import logoUrl from "../assets/logo.svg";
import LangSwitcher from "../components/LangSwitcher";

const TopMenu = () => {
  const { i18n, t } = useTranslation();
  const location = useLocation();
  const [langOpen, setLangOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
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

  useEffect(() => {
  const firstLink = document.querySelector(".nav-links a");
  if (firstLink) {
    firstLink.classList.add("active");
  }
}, []);


  return (
    <header className={`top-menu ${scrolled ? "scrolled" : "initial"}`}>
      <div className="menu-inner">

        <button
          className={`burger ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <nav className={`mobile-menu ${menuOpen ? "show" : ""}`}>
          <ScrollLink to="home" smooth={true} duration={500} offset={-80} onClick={() => setMenuOpen(false)}>
            {t("nav.home")}
          </ScrollLink>
          <ScrollLink to="services" smooth={true} duration={500} offset={-80} onClick={() => setMenuOpen(false)}>
            {t("nav.services")}
          </ScrollLink>
          <ScrollLink to="brokerage" smooth={true} duration={500} offset={-80} onClick={() => setMenuOpen(false)}>
            {t("nav.objects")}
          </ScrollLink>
          <ScrollLink to="team" smooth={true} duration={500} offset={-80} onClick={() => setMenuOpen(false)}>
            {t("nav.team")}
          </ScrollLink>
          <ScrollLink to="process" smooth={true} duration={500} offset={-80} onClick={() => setMenuOpen(false)}>
            {t("nav.process")}
          </ScrollLink>
          <ScrollLink to="advantages" smooth={true} duration={500} offset={-80} onClick={() => setMenuOpen(false)}>
            {t("nav.advantages")}
          </ScrollLink>
          <ScrollLink to="contact" smooth={true} duration={500} offset={-80} onClick={() => setMenuOpen(false)}>
            {t("nav.contact")}
          </ScrollLink>
        </nav>


        <div className="logo-block" onClick={() => { window.location.href = "/"; }} >
          <img src={logoUrl} alt="GloReal Investments" className="logo-icon" />
        </div>

        <nav className="nav-links">
          <ScrollLink to="home" smooth={true} duration={500} offset={0} spy={true} activeClass="active" isDynamic={true}>
            {t("nav.home")}
          </ScrollLink>
          <ScrollLink to="services" smooth={true} duration={500} offset={-80} spy={true} activeClass="active" isDynamic={true}>
            {t("nav.services")}
          </ScrollLink>
          <ScrollLink to="brokerage" smooth={true} duration={500} offset={-80} spy={true} activeClass="active" isDynamic={true}>
            {t("nav.objects")}
          </ScrollLink>
          <ScrollLink to="team" smooth={true} duration={500} offset={-80} spy={true} activeClass="active" isDynamic={true}>
            {t("nav.team")}
          </ScrollLink>
          <ScrollLink to="process" smooth={true} duration={500} offset={-80} spy={true} activeClass="active" isDynamic={true}>
            {t("nav.process")}
          </ScrollLink>
          <ScrollLink to="advantages" smooth={true} duration={500} offset={-80} spy={true} activeClass="active" isDynamic={true}>
            {t("nav.advantages")}
          </ScrollLink>
          <ScrollLink to="contact" smooth={true} duration={500} offset={-80} spy={true} activeClass="active" isDynamic={true}>
            {t("nav.contact")}
          </ScrollLink>
        </nav>


        <div className="lang-dropdown">
          <LangSwitcher />
        </div>
      </div>  
    </header>
  );
};

export default TopMenu;

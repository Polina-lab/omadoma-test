import React, { useState, useEffect } from "react";
import { Link as RouterLink, NavLink, useLocation } from "react-router-dom"
import { Link as ScrollLink } from "react-scroll";
import { useTranslation } from "react-i18next";
import "./TopMenu.css";
import { CONTACT } from "../constants/contact";
import logoUrl from "../assets/logo-horizontal.svg";
import logoMobile from "../assets/logo.svg";
import phoneMobile from "../assets/phone-mobile.svg";
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
          <RouterLink to="/" onClick={() => setMenuOpen(false)}>
            {t("nav.home")}
          </RouterLink>
          <RouterLink to="/services" onClick={() => setMenuOpen(false)}>
            {t("nav.services")}
          </RouterLink>
          {/*<RouterLink to="/" className="disabled-link" onClick={() => setMenuOpen(false)}>
            {t("nav.works")}
          </RouterLink>*/}
          <RouterLink to="/" className="disabled-link" onClick={() => setMenuOpen(false)}>
            {t("nav.about")}
          </RouterLink>
          <a
            href="#footer"
            onClick={() => setMenuOpen(false)}
            className="connect-btn-mobile"
          >
            {t("nav.connect")}
          </a>
          <a href={`tel:${CONTACT.phone}`} className="phone">
            <img 
              src={phoneMobile}
              alt="phone"
              className="phone-icon"
            />
            <span className="text">{CONTACT.phoneFormatted}</span>
          </a>
        </nav>


        <div className="logo-block" onClick={() => { window.location.href = "/"; }} >
          <img src={logoUrl} alt="OMADOMA" className="logo-icon" />
          <img src={logoMobile} alt="OMADOMA" className="logo-icon-mobile" />
          <a href="tel:+37258378573" className="phone">
            <span className="phone-text">+372 5837 8573</span>
          </a>
        </div>
          
        <div className="right-block">
          <nav className="nav-links">
            <NavLink to="/" end>
              {t("nav.home")}
            </NavLink>
            <NavLink to="/services">
              {t("nav.services")}
            </NavLink>
            {/*<NavLink to="/" className="disabled-link">
              {t("nav.works")}
            </NavLink>*/}
            <NavLink to="/" className="disabled-link">
              {t("nav.about")}
            </NavLink>
          </nav>

            <a href="#footer" className="btn-solid-green connect-btn">
              {t("nav.connect")}
            </a>


          <div className="lang-dropdown">
            <LangSwitcher />
          </div>
        </div>
      </div>  
    </header>
  );
};

export default TopMenu;

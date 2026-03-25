import { Link } from "react-router-dom";
import { useTranslation, Trans } from "react-i18next";
import React, { useState, useEffect } from "react";
import "./Footer.css";

import { CONTACT } from "../constants/contact";

import logo from "../assets/logo.svg";
import mapImg from "../assets/map-estonia.png";

import facebookIcon from "../assets/footer/facebook.svg";
import twitterIcon from "../assets/footer/browser.svg";
import instagramIcon from "../assets/footer/instagram.svg";

export default function Footer() {
  const { t } = useTranslation();

  const [contact, setContact] = useState("");
  const [formMessage, setFormMessage] = useState({ text: "", type: "" }); 

  const checkLang = (curr) => {
    if (curr==="et") return "Эстонский"
    else if (curr==="ru") return "Русский"
    else if (curr==="en") return "Английский"
    else return "не понятно"
  }
  
   const autoClearMessage = () => {
    setTimeout(() => setFormMessage({ text: "", type: "" }), 4000); // 2 секунды
  };

  const validateContact = (value) => {
    const email =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phone =
      /^[+]?[\d\s\-()]{7,20}$/;
    return email.test(value) || phone.test(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateContact(contact)) {
      setFormMessage({ text: t("pricing.form.errorContact"), type: "error" });

      autoClearMessage();
      return;
    }
    try {
      await emailjs.send(
        "service_76jh06b",
        "template_6bz4fb7",
        {
          type:"Contact request",
          contact: contact,
          lang: checkLang(i18n.language)
        },
        "iwhgtRN9BAWM9YCiN"
      );

      setFormMessage({ text: t("pricing.form.success"), type: "success" });
      setContact(""); // очищаем поле

      autoClearMessage();
    } catch (err) {
      console.error(err);
      setFormMessage({ text: t("pricing.form.errorContact"), type: "error" });
      autoClearMessage();
    }
  };

  return (
    <footer className="footer" id="footer">

      <div className="footer-inner">

        {/* LEFT */}
        <div className="footer-left">

          <p className="footer-top-text">
            {t("footer.topText")}
          </p>

          <div className="footer-columns">

            <div className="footer-col">
              <h4>{t("footer.contact")}</h4>

              <a href={`tel:${CONTACT.phone}`}>
                {CONTACT.phoneFormatted}
              </a>

              <a href="mailto:info@omadoma.ee">
                info@omadoma.ee
              </a>

              <div className="socials">
                  <div className="social-icon facebook">
                    <a href="https://www.facebook.com/" target="_blank" rel="noopener">
                    <img src={facebookIcon} alt="Facebook" /></a>
                  </div>
                  <div className="social-icon">
                    <a href="" target="_blank" rel="noopener">
                    <img src={twitterIcon} alt="Twitter" /></a>
                  </div>
                  <div className="social-icon">
                    <a href="https://instagram.com" target="_blank" rel="noopener">
                    <img src={instagramIcon} alt="Instagram" /></a>
                  </div>
              </div>
            </div>

            <div className="footer-col">
              <h4>{t("footer.links")}</h4>

              <Link to="/">{t("nav.home")}</Link>
              <Link to="/about">{t("nav.about")}</Link>
              <Link to="/privacy">{t("footer.privacy")}</Link>
              <Link to="/cookies">{t("footer.cookies")}</Link>
              <Link to="/terms">{t("footer.terms")}</Link>
            </div>

          </div>
        </div>

        {/* CENTER */}
        <div className="footer-center">

          <img src={logo} alt="logo" className="footer-logo" />

          <button className="btn-outline">
            {t("footer.viewWorks")}
          </button>

          <button className="btn-solid" onClick={() => (window.location.href = "/services")}>
            {t("footer.services")}
          </button>

        </div>

        {/* RIGHT */}
        <div className="footer-right">

          <img src={mapImg} alt="map" className="footer-map" />

          <div className="footer-overlay">

            <h4>{t("footer.workAllEstonia")}</h4>


            <form
              className="footer-input" // оставляем стиль футера
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
            >
              <input
                type="text"
                placeholder={t("hero.mailPhone")}
                value={contact}
                onChange={(e) => setContact(e.target.value)}
              />
              <button type="submit" onClick={handleSubmit}>→</button>
            </form>
            {formMessage.text && (
                <span className={`form-message ${formMessage.type}`}>
                  {formMessage.text}
                </span>
              )}
            {/*<div className="footer-input">
              <input
                placeholder={t("hero.mailPhone")}
              />
              <button>→</button>
            </div>*/}

          </div>

        </div>

      </div>

      <div className="footer-bottom">
        <p>
          <Trans
          i18nKey="footer.rights"
          values={{ year: new Date().getFullYear() }}
          components={[
            <span className="brown-bold" />
          ]} />
        </p>
      </div>

    </footer>
  );
}
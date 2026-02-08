import React from "react";
import { useTranslation, Trans } from "react-i18next";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import "./Footer.css";
import ContactBlock from "../pages/ContactBlock";

import logo from "../assets/logo.svg";

import iconPhone from "../assets/footer/phone.svg";
import iconEmail from "../assets/footer/mail.svg";
import iconLocation from "../assets/footer/location.svg";

import facebookIcon from "../assets/footer/facebook.svg";
import twitterIcon from "../assets/footer/browser.svg";
import instagramIcon from "../assets/footer/instagram.svg";

const Footer = () => {
  const { t } = useTranslation();
  const location = useLocation();

  const hideContactBlockOn = [
    "/privacy",
    "/cookies",
    "/terms"
  ];

  const shouldHideContactBlock = hideContactBlockOn.includes(location.pathname);



  const address = t("footer.contact.address");
  const encoded = encodeURIComponent(address);
  const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);

  const mapLink = isIOS
    ? `https://maps.apple.com/?q=${encoded}`
    : `https://www.google.com/maps?q=${encoded}`;


  return (
    <div className="footer-bg-wrapper">
      <div className="footer-bg-decor">
        <div className="footer-content">
          {!shouldHideContactBlock && (
            <div className="contact-wrapper">
              <ContactBlock />
            </div>
          )}

          <footer className="footer">
            <div className="footer-grid">
              <div className="footer-brand">
                <p className="footer-slogan">{t("footer.slogan")}</p>
                <img src={logo} alt="GloReal Investments" className="footer-logo" />
                <div className="footer-social">
                  <div className="social-icon">
                    <a href="https://facebook.com" target="_blank" rel="noopener">
                    <img src={facebookIcon} alt="Facebook" /></a>
                  </div>
                  <div className="social-icon">
                    <a href="https://twitter.com" target="_blank" rel="noopener">
                    <img src={twitterIcon} alt="Twitter" /></a>
                  </div>
                  <div className="social-icon">
                    <a href="https://instagram.com" target="_blank" rel="noopener">
                    <img src={instagramIcon} alt="Instagram" /></a>
                  </div>
                </div>
              </div>

              <div className="footer-social-buttons">
                <button className="btn btn-outline-green">{t("footer.buttons.sell")}</button>
                <button className="btn btn-solid-green">{t("footer.buttons.quick")}</button>
              </div>

              <div className="footer-contact">
                <h4>{t("footer.contact.title")}</h4>
                <p><a href={`tel:${t("footer.contact.phone")}`}><img src={iconPhone} alt="" /> {t("footer.contact.phone")}</a></p>
                <p><a href={`mailto:${t("footer.contact.email")}`}><img src={iconEmail} alt="" /> {t("footer.contact.email")}</a></p>
                <p><a href={mapLink} target="_blank" rel="noopener noreferrer">
                    <img src={iconLocation} alt="location" className="contact-icon" />
                    <span>{address}</span>
                </a></p>
              </div>

              <div className="footer-links">
                <h4>{t("footer.links.title")}</h4>
                <ul>
                  <Link
                    to="https://www.kv.ee/maakler/gloreal"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <li>{t("footer.links.offers")}</li>
                  </Link>
                  <li><a href="/broker">{t("footer.links.broker")}</a></li>
                  <li><a href="/management">{t("footer.links.management")}</a></li>
                  <li><a href="/valuation">{t("footer.links.valuation")}</a></li>
                </ul>
              </div>

              <div className="footer-legal">
                <h4>{t("footer.legal.title")}</h4>
                <ul>
                  <li><a href="/privacy">{t("footer.legal.privacy")}</a></li>
                  <li><a href="/cookies">{t("footer.legal.cookies")}</a></li>
                  <li><a href="/terms">{t("footer.legal.terms")}</a></li>
                </ul>
              </div>
            </div>

            <div className="footer-bottom">
              <p>
                <Trans i18nKey="footer.bottom" components={[
                  <span className="blue2" />,
                  <span className="green2" />
                ]} />
              </p>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Footer;

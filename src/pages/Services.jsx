import React, { useState, useEffect } from "react";
import { useTranslation, Trans } from "react-i18next";
import "./Services.css";
import emailjs from "@emailjs/browser";

import fotoIcon from "../assets/services/camera.svg";
import fotoIconHover from "../assets/services/camera-hover.svg";

import textIcon from "../assets/services/text.svg";
import textIconHover from "../assets/services/text-hover.svg";

import adIcon from "../assets/services/ad.svg";
import adIconHover from "../assets/services/ad-hover.svg";

import priceadviceIcon from "../assets/services/priceadvice.svg";
import priceadviceIconHover from "../assets/services/priceadvice-hover.svg";

import consultIcon from "../assets/services/strategy.svg";
import consultIconHover from "../assets/services/strategy-hover.svg";

import showIcon from "../assets/services/show.svg";
import showIconHover from "../assets/services/show-hover.svg";

import negotiationIcon from "../assets/services/negotiation.svg";
import negotiationIconHover from "../assets/services/negotiation-hover.svg";

import prepareIcon from "../assets/services/prepare.svg";
import prepareIconHover from "../assets/services/prepare-hover.svg";

import supportIcon from "../assets/services/support.svg";
import supportIconHover from "../assets/services/support-hover.svg";

import PricingSection from "../components/PricingSection";

const serviceList = [
  { key: "ready", iconDefault: adIcon, iconHover: adIconHover },
  { key: "consult", iconDefault: priceadviceIcon, iconHover: priceadviceIconHover },
  { key: "prepare", iconDefault: supportIcon, iconHover: supportIconHover },
  { key: "foto", iconDefault: fotoIcon, iconHover: fotoIconHover }
  /*{ key: "consult", iconDefault: consultIcon, iconHover: consultIconHover },
  { key: "show", iconDefault: showIcon, iconHover: showIconHover },
  { key: "negotiation", iconDefault: negotiationIcon, iconHover: negotiationIconHover },
  { key: "prepare", iconDefault: prepareIcon, iconHover: prepareIconHover },
  { key: "support", iconDefault: supportIcon, iconHover: supportIconHover }*/
];

const Services = () => {

  const { t, i18n } = useTranslation();

  const checkLang = (curr) => {
    if (curr==="et") return "Эстонский"
    else if (curr==="ru") return "Русский"
    else if (curr==="en") return "Английский"
    else return "не понятно"
  }

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isOpen, setIsOpen] = useState(false);
  const [openService, setOpenService] = useState(null);
  const [formMessage, setFormMessage] = useState({ text: "", type: "" }); 

  const areas = t("pricing.form.areas", { returnObjects: true });

  const [contact, setContact] = useState("");

  const [form, setForm] = useState({
    name: "",
    contact: "",
    city: "",
    area: "",
    selectedPackage: null,
    selectedService: []
  });

    const estoniaData = {
    Harjumaa: ["Tallinn", "Maardu", "Keila"],
    Tartumaa: ["Tartu"],
    Pärnumaa: ["Pärnu"],
    "Ida-Virumaa": ["Narva", "Jõhvi", "Kohtla-Järve", "Sillamäe"]
  };


  const handleSelectPackage = (type) => {
    setForm(prev => ({
      ...prev,
      selectedPackage: type,
      selectedService: []
    }));
  };

  const handleSelectService = (key) => {
    setForm(prev => {
      const selected = prev.selectedService.includes(key)
        ? prev.selectedService.filter(k => k !== key)
        : [...prev.selectedService, key];

      return { ...prev, selectedService: selected, selectedPackage: null };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

  if (!validateContact(form.contact)) {
    setFormMessage({ text: t("pricing.form.error"), type: "error" });
    autoClearMessage();
    return;
  }

  if (form.selectedService.length === 0 && !form.selectedPackage) {
    setFormMessage({ text: t("pricing.form.error"), type: "error" });
    autoClearMessage();
    return;
  }

    try {
      await emailjs.send(
        "service_76jh06b",
        "template_llsx5xp",
        {
          type: form.selectedPackage ? form.selectedPackage : form.selectedService.join(", "),
          name: form.name,
          contact: form.contact,
          city: form.city,
          area: form.area,
          lang: checkLang(i18n.language)
        },
        "iwhgtRN9BAWM9YCiN"
      );

      setFormMessage({ text: t("pricing.form.success"), type: "success" });
      setForm({
      name: "",
      contact: "",
      city: "",
      area: "",
      selectedPackage: null,
      selectedService: []
    });
    autoClearMessage();

    } catch (err) {
      console.error(err);
      setSuccessMessage(t("pricing.form.error"));
    }
  };

  const autoClearMessage = () => {
    setTimeout(() => setFormMessage({ text: "", type: "" }), 4000); // 2 секунды
  };

  useEffect(() => {
  const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
  };

  window.addEventListener("resize", handleResize);
  return () => window.removeEventListener("resize", handleResize);
  }, []);  

  const validateContact = (value) => {
    const email =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phone =
      /^[+]?[\d\s\-()]{7,20}$/;
    return email.test(value) || phone.test(value);
  };

  const handleSubmitContact = async (e) => {
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

  const handleCardClick = (key) => {
  setOpenService(prev => (prev === key ? null : key));
};

  const handleSelectAndScroll = (key) => {
    
    setOpenService(null);
    setForm(prev => {
      const selected = prev.selectedService.includes(key)
        ? prev.selectedService.filter(k => k !== key)  // снять выбор
        : [key];  // ставим только эту услугу, если кликаем на карточку (можно оставить массив на несколько)

      return {
        ...prev,
        selectedService: selected,
        selectedPackage: null // отключаем пакет при выборе услуги
      };
    });

    if (isMobile) {
      setTimeout(() => {
        const form = document.getElementById("contact-form");
        if (form) {
          const top = form.getBoundingClientRect().top + window.scrollY - 130; // отступ сверху
          window.scrollTo({
            top,
            behavior: "smooth"
          });
        }
      }, 100);
    }

    if (!isMobile) {
      document.getElementById("contact-form")?.scrollIntoView({
        behavior: "smooth",
        block: "start" // вместо default, чтобы не скроллить до футера
      });
    }
  };

  useEffect(() => {
  const handleClickOutside = () => setIsOpen(false);
  document.addEventListener("click", handleClickOutside);

  return () => document.removeEventListener("click", handleClickOutside);
}, []);

  return (
    <div className="services-bg">
      <section id="services" className="services-section">
        <h2 className="services-title">{t("services.title")}</h2>
        <form className="hero-form" onSubmit={(e)=>{
              e.preventDefault();
              handleSubmitContact();
            }}>
          <input
            type="text"
            placeholder={t("hero.mailPhone")}
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            className="hero-input"
          />
          <button
            className="hero-submit"
            onClick={handleSubmitContact}
          >
            {t("hero.freeCall")}
          </button>
        </form>
        {formMessage.text && (
            <div className={`form-message error-top ${formMessage.type}`}>
              {formMessage.text}
            </div>
          )}
        <PricingSection
          variant="simple"
          showFlex={false}
          expandable={true}
          onSelectPackage={(type) => {
            handleSelectPackage(type);
            document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth" });
          }}
        />
        <h2 className="single-title">{t("services.singleTitle")}</h2>
        <p className="single-description">{t("services.singleDesc")}</p>
        <h3 className="single-services">{t("services.singleServices")}</h3>
        <div className="services-grid">
          {serviceList.map(({ key, iconDefault, iconHover }) => (
            <>
            <React.Fragment key={key}>
              <div className={`service-card ${form.selectedService.includes(key) ? "active" : ""} ${openService === key ? "open" : ""}`} onClick={() => handleCardClick(key)}
              >
                <div className="service-layout">
                  <div className="service-icon-wrapper">
                    <img src={iconDefault} alt="" className="icon-default service-icon" />
                    <img src={iconHover} alt="" className="icon-hover service-icon" />
                  </div>

                  <div className="service-content">

                    <h3 className="service-name">{t(`services.${key}.title`)}</h3>
                    <span className="service-price">{t(`services.${key}.price`)}</span>
                    <p className="service-description">{t(`services.${key}.description`)}</p>
                    <span className="service-link">{openService === key ? "Sulge" : t("services.readMore")}</span>
                    {isMobile && openService === key && (
                        <div className="expanded-content">
                          
                          <p>{t(`services.${key}.fullDescription`)}</p>

                          <ul className="check">
                            {t(`services.${key}.includes`, { returnObjects: true }).map((item, i) => (
                              <li key={i}>{item}</li>
                            ))}
                          </ul>

                          <p className="extra">{t(`services.${key}.extra`)}</p>

                          <button
                            className="select-btn"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSelectAndScroll(key);
                            }}
                          >
                            Vali teenus
                          </button>
                        </div>
                    )}
                  </div>
                </div>
              </div>
              
            </React.Fragment>
            {/*{!isMobile && openService === key && (
                <div className="service-expanded">
                  <div className="expanded-content">
                    
                    <p>{t(`services.${key}.fullDescription`)}</p>

                    <ul className="check">
                      {t(`services.${key}.includes`, { returnObjects: true }).map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>

                    {key === "foto" && t(`services.${key}.priceExtra.prices`, { returnObjects: true }).length > 0 && (
                      <div className="price-extra">
                        <p className="price-extra-title">{t(`services.${key}.priceExtra.title`)}</p>
                        <ul>
                          {t(`services.${key}.priceExtra.prices`, { returnObjects: true }).map((line, i) => (
                            <li key={i}>
                              <Trans
                                i18nKey={`services.${key}.priceExtra.prices.${i}`}
                                components={[ <span className="brown-bold" /> ]}
                              />
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <p className="extra">{t(`services.${key}.extra`)}</p>

                    <button
                      className="select-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelectAndScroll(key);
                      }}
                    >
                      Vali teenus
                    </button>
                  </div>
                </div>
              )}*/}
              </>
          ))}
        </div>
        {/* 💻 DESKTOP EXPANDED ВНИЗУ */}
{!isMobile && openService && (
  <div className="service-expanded">
    <div className="expanded-content">
      
      <div className="first-step">
        <p>{t(`services.${openService}.fullDescription`)}</p>

        <p className="extra">{t(`services.${openService}.extra`)}</p>
      </div>

      <ul className="check">
        {t(`services.${openService}.includes`, { returnObjects: true }).map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>

      {openService === "foto" &&
        t(`services.${openService}.priceExtra.prices`, { returnObjects: true }).length > 0 && (
          <div className="price-extra">
            {/*<p className="price-extra-title">
              {t(`services.${openService}.priceExtra.title`)}
            </p>*/}
            <ul>
              {t(`services.${openService}.priceExtra.prices`, { returnObjects: true }).map((line, i) => (
                <li key={i}>
                  <Trans
                    i18nKey={`services.${openService}.priceExtra.prices.${i}`}
                    components={[<span className="brown-bold" />]}
                  />
                </li>
              ))}
            </ul>
          </div>
        )}
    </div>
    <div className="expended-button"><button
          className="select-btn"
          onClick={(e) => {
            e.stopPropagation();
            handleSelectAndScroll(openService);
          }}
        >
          Vali teenus
        </button></div>
  </div>
)}
        <form id="contact-form" className="contact-form-block" onSubmit={handleSubmit}>
          <h3>{t("services.formTitle")}</h3>
          <div className="form-grid">
            <input
              placeholder={t("pricing.form.name")}
              value={form.name}
              onChange={(e) => setForm(prev => ({ ...prev, name: e.target.value }))}
              required
            />
            <div className="input-wrapper">
              {!form.contact && (
                <span className={`fake-placeholder ${formMessage.type === "error" ? "error-placeholder" : ""}`}>
                  <Trans
                    i18nKey="pricing.form.contact"
                    components={[<span className="brown-bold bigger" />]}
                  />
                </span>
                
              )}
              <input
                value={form.contact}
                onChange={(e) => setForm({ ...form, contact: e.target.value })}
                  style={{
                  borderColor: formMessage.type === "error" ? "red" : "var(--color-gray)",
                  color: "var(--color-brown)"
                }}
                required/>
            </div>
            <select
              value={form.city}
              onChange={(e) =>setForm({ ...form, city: e.target.value })}
              style={{ color: form.city ? "var(--color-brown)" : "var(--color-gray)" }}>
              <option value="" disabled>
                {t("pricing.form.city")}
              </option>
              {Object.entries(estoniaData).map(([region, cities]) => (
                <optgroup key={region} label={region}>
                  {cities.map((city) => (
                    <option key={city} value={`${region}, ${city}`}>
                      {city}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
            <select
            value={form.area}
            onChange={(e) => setForm({ ...form, area: e.target.value })}
            style={{ color: form.area ? "var(--color-brown)" : "var(--color-gray)" }}>
            <option value="" disabled>{t("pricing.form.area")}</option>
            {areas.map((item, i) => (
              <option key={i} value={item}>
                {item}
              </option>
            ))}
          </select>
            {/* ПАКЕТЫ */}
            <div className="packages-select">
              <div className="form-packages">
                <label>{t("pricing.form.service")}</label>
                <button
                  type="button"
                  className={form.selectedPackage === "basic" ? "active basic" : "basic"}
                  onClick={() => handleSelectPackage("basic")}
                >
                  {t("pricing.basic.type")}
                </button>
                 <button
                  type="button"
                  className={form.selectedPackage === "full" ? "active full" : "full"}
                  onClick={() => handleSelectPackage("full")}
                >
                  {t("pricing.full.type")}
                </button>
            </div>
            {formMessage.type === "error" && <p className="hint">{t("pricing.form.serviceHint")}</p>}
            {/* ВЫБОР УСЛУГИ */}
              <div className="custom-select">
                {/* поле */}
                <div
                  className={`select-header ${isOpen ? "open" : ""}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsOpen(!isOpen);}}
                  style={{
                    color: form.selectedService.length > 0 ? "var(--color-brown)" : "var(--color-gray)"}}>
                  {form.selectedService.length
                    ? form.selectedService.map(key => t(`services.${key}.title`)).join(", ")
                    : t("pricing.form.selectService")}
                </div>
                {/* список */}
                {isOpen && (
                  <div className="select-dropdown">
                    {serviceList.map(({ key }) => (
                      <div
                        key={key}
                        className={`option ${
                          form.selectedService.includes(key) ? "selected" : ""}`}
                         onClick={() => handleSelectService(key)}>
                        {t(`services.${key}.title`)}
                      </div>))}
                  </div>)}
              </div>
            </div>
            <textarea
              placeholder={t("pricing.form.comment")}
              value={form.comment || ""}
              onChange={(e) => setForm(prev => ({ ...prev, comment: e.target.value }))}
            />
          </div>
          {formMessage.text && (
            <div className={`form-message ${formMessage.type}`}>
              {formMessage.text}
            </div>
          )}
          <button className="submit-btn" onClick={handleSubmit}>
            {t("pricing.form.submit")}
          </button>
        </form>
      </section>
    </div>
  );
};

export default Services;

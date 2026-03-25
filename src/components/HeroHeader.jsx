import React, { useState, useEffect } from "react";
import { useTranslation, Trans } from "react-i18next";
import { Link } from "react-router-dom";
import "./HeroHeader.css";
import emailjs from "@emailjs/browser";

const HeroHeader = () => {
  const { t, i18n } = useTranslation();
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
    <section id="home" className="hero-header">
      <div className="hero-bg-right" />
      <div className="hero-bg">
        <div className="hero-content">
          <h2>{t("hero.subtitle")}</h2>
          <p>{t("hero.description")}</p>
          <form className="hero-form" onSubmit={(e)=>{
                  e.preventDefault();
                  handleSubmit();
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
              onClick={handleSubmit}
            >
              {t("hero.freeCall")}
            </button>
          </form>
          {formMessage.text && (
            <div className={`form-message error-hero ${formMessage.type}`}>
              {formMessage.text}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default HeroHeader;

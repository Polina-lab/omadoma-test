import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import mailMain from "../../assets/team/mail.svg";
import phoneMain from "../../assets/team/phone.svg";
import mailRegular from "../../assets/team/mail-green.svg";
import phoneRegular from "../../assets/team/phone-green.svg";

import FormSuccessSecond from "../forms/FormSuccessSecond";

import { renderRecaptcha } from "../../utils/recaptcha";

import { Link as ScrollLink } from "react-scroll";


const TeamCard = ({ agent, activeId, setActiveId }) => {
  const { t, i18n } = useTranslation();

  const open = activeId === agent.id;

  const [submitted, setSubmitted] = useState(false);

  //console.log("language now: "+i18n.language);

  useEffect(() => {
        renderRecaptcha("recaptcha-contactform-liliana", "recaptchaContactLiliana", "6LfPDXIsAAAAAFwt-mPrn_86Mcs502uX8_fxdM14");
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = window.grecaptcha.getResponse(window.recaptchaContactLiliana);

        if (!token) {
        alert("Please confirm you are not a robot.");
        return;
        }

        const response = await fetch("https://gloreal.ee/send-mail.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                formType: "contactLiliana",
                ...formData,
                lang: i18n.language,
                recaptchaToken: token
            }),
            });

        const result = await response.json();
        console.log("Result from server:", result);
        if (result.success) {
        setSubmitted(true);
        window.grecaptcha.reset(window.recaptchaContactLiliana);
        } else {
        alert("Error sending message");
        }
    };

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  useEffect(() => {
    const handleResize = () => {
        setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
    }, []);

  const isMain = agent.type === "main";

  return (
    <div
      className={`team-card ${open ? "open" : ""} ${isMain ? "main" : "regular"}`}
      onClick={() => {
        if (open) setActiveId(null);
        else setActiveId(agent.id);
      }}
    >
      <div className="team-inner">

        {/* Фото слева */}
        <img src={agent.image} alt={t(agent.nameKey)} className="team-photo" />

        {/* Цветной квадрат за фото */}
        <div className={`team-bg ${isMain ? "bg-main" : "bg-regular"} ${open ? "expanded" : ""}`}>
          <div className="team-top-row">
            <div>
              <div className="team-name">{t(agent.nameKey)}</div>
              <div className="team-position">{t(agent.positionKey)}</div>
            </div>

            {!open && <div className="team-arrow">→</div>}
            {open && <div className="team-close" onClick={(e) => { e.stopPropagation(); setActiveId(null); setSubmitted(false) }}>✕</div>}
          </div>


          {open && (
            <div className={`team-extra ${isMain ? "main-extra" : "regular-extra"}`} onClick={(e) => e.stopPropagation()}>
              <div className="team-extra-left">
                <p className="team-description">{t(agent.descriptionKey)}</p>

                <p className="team-contact">
                  <a href={`tel:${agent.phone}`}> <img src={isMain ? phoneMain : phoneRegular} alt="phone" /> {agent.phone} </a>
                  <a href={`mailto:${agent.email}`}> <img src={isMain ? mailMain : mailRegular} alt="email" /> {agent.email} </a>
                </p>

                {isMain && (
                  <ScrollLink
                    to="contact"
                    smooth={true}
                    duration={600}
                    offset={-80}
                    onClick={(e) => e.stopPropagation()}
                    className="team-main-btn btn-solid-white-green"
                  >
                    {t("team.contactButton")}
                  </ScrollLink>
                )}

                
                {!isMobile && !isMain && !submitted && (
                  <button className="team-regular-btn btn-outline-green" onClick={handleSubmit}>
                    {t("team.form.send")}
                  </button>
                )}
              </div>

              {submitted ? (
                  <FormSuccessSecond />
                ) : (
                <>
                
              {!isMain && (
                <div className="team-extra-right">
                  <form className="team-form" onSubmit={handleSubmit}>
                    <input name="name" onChange={handleChange} type="text" placeholder={t("team.form.name")} />
                    <input name="phone" onChange={handleChange} type="text" placeholder={t("team.form.phone")} />
                    <input name="email" onChange={handleChange} type="email" placeholder={t("team.form.email")} />
                    <textarea name="message" onChange={handleChange} placeholder={t("team.form.message")} />
                    <div id="recaptcha-contactform-liliana" className="g-recaptcha"></div>
                    {isMobile && (
                      <>
                      
                      <button className="team-regular-btn btn-outline-green" type="submit">
                        {t("team.form.send")}
                      </button>
                      </>
                    )}
                  </form>
                </div>
              )}</>)}
            </div>
            
          )}

        </div>
      </div>
    </div>
  );
};

export default TeamCard;

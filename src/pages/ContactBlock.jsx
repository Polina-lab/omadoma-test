import React from "react";
import "./ContactBlock.css";
import agentPhoto from "../assets/german.jpg";
import { useTranslation, Trans } from "react-i18next";
import { Link as ScrollLink } from "react-scroll";

import iconPhone from "../assets/phone.svg";
import iconEmail from "../assets/mail.svg";


const ContactBlock = () => {
    const { t } = useTranslation();

  return (
    <section id="contact">
        <div className="contact-block">
        <div className="contact-agent">
            <div className="agent-photo-wrapper">
                <img src={agentPhoto} alt={t("contact.agent.name")} className="agent-photo" />
            </div>
            <div className="agent-info">
                <h3 className="agent-name">
                    <Trans i18nKey="contact.agent.name" components={[
                            <a href="https://www.maakleritekoda.ee/et/maaklerite-register/german-randla/394"/>
                ]} />
                    </h3>
                <div className="agent-contact">
                    <a href={`tel:${t("contact.agent.phone")}`} className="contact-line">
                        <img src={iconPhone} alt="phone" className="contact-icon" />
                        <span>{t("contact.agent.phone")}</span>
                    </a>

                    <a href={`mailto:${t("contact.agent.email")}`} className="contact-line">
                        <img src={iconEmail} alt="email" className="contact-icon" />
                        <span>{t("contact.agent.email")}</span>
                    </a>
                </div>


                <div className="agent-meta">
                    <span>{t("contact.agent.cert")}</span>
                    <span>{t("contact.agent.title")}</span>
                    <span>{t("contact.agent.reg")}</span>
                </div>
            </div>
        </div>

        <div className="contact-form">
            <h2>
                {t("contact.title")}
            </h2>
            <p>
                <Trans i18nKey="contact.description" components={[
                            <ScrollLink to="services"  className="services-link" smooth={true} duration={500} offset={-80} spy={true} isDynamic={true}>
                            </ScrollLink>
                ]} />
            </p>

            <form className="form-grid">
                <input type="text" placeholder={t("contact.form.name")} />
                <input type="tel" placeholder={t("contact.form.phone")} />
                <input type="email" placeholder={t("contact.form.email")} />
                <input type="text" placeholder={t("contact.form.topic")} />
                <textarea placeholder={t("contact.form.message")} rows="4" />
                <div className="form-button">
                <button type="submit">{t("contact.form.submit")}</button>
                </div>
            </form>
        </div>
        </div>
    </section>
  );
};

export default ContactBlock;

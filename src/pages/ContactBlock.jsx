import React from "react";
import "./ContactBlock.css";
import agentPhoto from "../assets/german.jpg";
import { useTranslation, Trans } from "react-i18next";

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
                            <span className="blue2 underline" />,
                            <span className="green2 underline" />
                    ]} />
                    </h3>
                <div className="agent-contact">
                    <div className="contact-line">
                        <img src={iconPhone} alt="phone" className="contact-icon" />
                        <span>{t("contact.agent.phone")}</span>
                    </div>
                    <div className="contact-line">
                        <img src={iconEmail} alt="email" className="contact-icon" />
                        <span>{t("contact.agent.email")}</span>
                    </div>
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
                <Trans i18nKey="contact.title" components={[
                            <span className="blue2" />,
                            <span className="green2" />,
                            <span className="orange2" />
                ]} />
            </h2>
            <p>
                <Trans i18nKey="contact.description" components={[
                            <a href="/services" className="orange underline" />
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

import React, { useState, useEffect } from "react";
import "./ContactBlock.css";
import agentPhoto from "../assets/german.jpg";
import { useTranslation, Trans } from "react-i18next";
import { Link as ScrollLink } from "react-scroll";
import FormSuccessSecond from "../components/forms/FormSuccessSecond";
import { renderRecaptcha } from "../utils/recaptcha";

import iconPhone from "../assets/phone.svg";
import iconEmail from "../assets/mail.svg";


const ContactBlock = () => {
    const { t, i18n } = useTranslation();

    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        topic: "",
        message: ""
    });

    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };



    useEffect(() => {
        renderRecaptcha("recaptcha-contactform", "recaptchaContactId", "6LfPDXIsAAAAAFwt-mPrn_86Mcs502uX8_fxdM14");
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        //const formElement = e.target;
        //const formDataToSend = new FormData(formElement);

        //Object.keys(formData).forEach(key => {
           // formDataToSend.append(key, formData[key]);
        //});

        const token = window.grecaptcha.getResponse(window.recaptchaContactId);
        //const token = "test";

        if (!token) {
        alert("Please confirm you are not a robot.");
        return;
        }

        //console.log("Data to server:", formDataToSend);

       /* const response = await fetch("https://gloreal.ee/send-mail.php", {
        method: "POST",
        body: formDataToSend,
        });*/

        console.log("Data to server:", formData);

        const response = await fetch("https://gloreal.ee/send-mail.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                formType: "contact",
                ...formData,
                lang: i18n.language,
                recaptchaToken: token
            }),
            });

        const result = await response.json();
        console.log("Result from server:", result);
        if (result.success) {
        setSubmitted(true);
        window.grecaptcha.reset(window.recaptchaContactId);
        } else {
        alert("Error sending message");
        }
    };

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
                {submitted ? (
        <FormSuccessSecond />
      ) : (
        <form className="form-grid" onSubmit={handleSubmit}>
            <input name="name" type="text" placeholder={t("contact.form.name")} onChange={handleChange} />
            <input name="phone" type="tel" placeholder={t("contact.form.phone")} onChange={handleChange} />
            <input name="email" type="email" placeholder={t("contact.form.email")} onChange={handleChange} />
            <input name="topic" type="text" placeholder={t("contact.form.topic")} onChange={handleChange} />
            <textarea name="message" placeholder={t("contact.form.message")} rows="4" onChange={handleChange} />
            
            {/* reCAPTCHA */}
            <div id="recaptcha-contactform" className="g-recaptcha"></div>

            <div className="form-button">
                <button type="submit">{t("contact.form.submit")}</button>
            </div>
        </form>
      )}
        </div>
        </div>
    </section>
  );
};

export default ContactBlock;

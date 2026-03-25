import { useState, useEffect } from "react";
import { useTranslation, Trans } from "react-i18next";
import emailjs from "@emailjs/browser";

export default function ServiceFormOverlay({ onClose, type }) {
  const { t, i18n } = useTranslation();

  const checkLang = (curr) => {
    if (curr==="et") return "Эстонский"
    else if (curr==="ru") return "Русский"
    else if (curr==="en") return "Английский"
    else return "не понятно"
  }

  const areas = t("pricing.form.areas", { returnObjects: true });

  const [formMessage, setFormMessage] = useState({ text: "", type: "" });

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
      const handleResize = () => setIsMobile(window.innerWidth <= 768);
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);

  const validateContact = (value) => {
    const email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phone = /^[+]?[\d\s\-()]{7,20}$/;
    return email.test(value) || phone.test(value);
  };

  const estoniaData = {
    Harjumaa: ["Tallinn", "Maardu", "Keila"],
    Tartumaa: ["Tartu"],
    Pärnumaa: ["Pärnu"],
    "Ida-Virumaa": ["Narva", "Jõhvi", "Kohtla-Järve", "Sillamäe"]
  };

  const [form, setForm] = useState({
    name: "",
    contact: "",
    city: "",
    area: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.contact || !validateContact(form.contact)) {
      setFormMessage({ text: t("pricing.form.requiredContact"), type: "error" });
      setTimeout(() => setFormMessage({ text: "", type: "" }), 10000);
      return;
    }

    try {
      await emailjs.send(
        "service_76jh06b",
        "template_llsx5xp",
        {
          type,
          name: form.name,
          contact: form.contact,
          city: form.city,
          area: form.area,
          lang: checkLang(i18n.language)
        },
        "iwhgtRN9BAWM9YCiN"
      );

      setFormMessage({ text: t("pricing.form.success"), type: "success" });
      setForm({ name: "", contact: "", city: "", area: "" });

      setTimeout(() => setFormMessage({ text: "", type: "" }), 10000);
      onClose();
    } catch (err) {
      console.error(err);
      setFormMessage({ text: t("pricing.form.error"), type: "error" });
      setTimeout(() => setFormMessage({ text: "", type: "" }), 10000);
    }
  };

  return (
    <div className={`overlay ${isMobile ? "mobile" : ""}`}>

      {/* закрытие */}
      
      {!isMobile && (
                <button className="overlay-close" onClick={onClose}>✕</button>)}

      <form className="overlay-form" onSubmit={handleSubmit}>
        {isMobile && (
                <button className="overlay-close" onClick={onClose}>✕</button>)}
          <input
            placeholder={t("pricing.form.name")}
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
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
          onChange={(e) => setForm({ ...form, city: e.target.value })}
          style={{ color: form.city ? "var(--color-brown)" : "var(--color-gray)" }}
        >
          <option value="" disabled>{t("pricing.form.city")}</option>
          {Object.entries(estoniaData).map(([region, cities]) => (
            <optgroup key={region} label={region}>
              {cities.map((city) => (
                <option key={city} value={`${region}, ${city}`}>{city}</option>
              ))}
            </optgroup>
          ))}
        </select>

        <select
          value={form.area}
          onChange={(e) => setForm({ ...form, area: e.target.value })}
          style={{ color: form.area ? "var(--color-brown)" : "var(--color-gray)" }}
        >
          <option value="" disabled>{t("pricing.form.area")}</option>
          {areas.map((item, i) => (
            <option key={i} value={item}>{item}</option>
          ))}
        </select>

        

        {/* кнопка */}
        <button className="btn-pricing" type="submit">
          {t("pricing.form.submit")}
        </button>
        {formMessage.text && (
          <div className={`form-message ${formMessage.type}`}>
            {formMessage.text}
          </div>
        )}
      </form>
    </div>
  );
}
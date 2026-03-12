import React, { useState, useEffect } from "react";
import { useTranslation, Trans } from "react-i18next";
import "./BuyerRequestForm.css";
import "./ModalBlock.css";
import uplSvg from "../assets/upload.svg";
import FormSuccessBlue from "./FormSuccessBlue";
import { useNavigate } from "react-router-dom";
import { renderRecaptcha } from "../utils/recaptcha";

const BuyerRequestForm = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({});

  const [roomsRange, setRoomsRange] = useState({ start: null, end: null });

  const normalize = (v) =>
  typeof v === "string" && v.includes("+") ? parseInt(v) + 1 : Number(v);

  const handleRoomsSelect = (rawValue) => {
    const value = normalize(rawValue);

    setRoomsRange(prev => {
      const { start, end } = prev;

        // 1) Первый выбор
        if (start === null) {
          setFormData(f => ({ ...f, rooms: rawValue }));
          return { start: value, end: null };
        }

        // 2) Второй выбор
        if (end === null) {
          if (value > start) {
            setFormData(f => ({ ...f, rooms: `${start}-${rawValue}` }));
            return { start, end: value };
          } else {
            // если выбрали меньше — начинаем заново
            setFormData(f => ({ ...f, rooms: rawValue }));
            return { start: value, end: null };
          }
        }

        // 3) Если диапазон уже есть:
        // — расширяем диапазон
        if (value > end) {
          setFormData(f => ({ ...f, rooms: `${start}-${rawValue}` }));
          return { start, end: value };
        }

        // — если меньше начала → новый диапазон
        if (value < start) {
          setFormData(f => ({ ...f, rooms: rawValue }));
          return { start: value, end: null };
        }

        // — если внутри диапазона → сброс
        setFormData(f => ({ ...f, rooms: rawValue }));
        return { start: value, end: null };
      });
    };

    const isRoomsActive = (opt) => {
      const value = normalize(opt);
      const { start, end } = roomsRange;

      if (start === null) return false;
      if (end === null) return value === start;

      return value >= start && value <= end;
    };




  // универсальный сбор полей
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // выбор комнат
  const handleButtonSelect = (value) => {
    setFormData({ ...formData, rooms: value });
  };


  // загрузка файлов (имена)
  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files).map((f) => f.name);
    setFormData({ ...formData, files });
  };

  useEffect(() => {
    renderRecaptcha("recaptcha-buyerform", "recaptchaBuyerId", "6LfPDXIsAAAAAFwt-mPrn_86Mcs502uX8_fxdM14");
  }, []);


const handleSubmit = async (e) => {
  e.preventDefault();

  const token = window.grecaptcha.getResponse(window.recaptchaBuyerId);
  //const token = "test";

  if (!token) {
    alert("Please confirm you are not a robot.");
    return;
  }

  const response = await fetch("https://gloreal.ee/send-mail.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        formType: "buyer",
        ...formData,
        lang: i18n.language,
        recaptchaToken: token
      }),
    });

    const result = await response.json();

    if (result.success) {
      setSubmitted(true);
      window.grecaptcha.reset(window.recaptchaBuyerId);
    } else {
      alert("Error sending message");
    }
  };

  const handleClose = () => {
    window.location.href = "/";
  };

  return (
    <div className="modal byuer-request">
      {!submitted ? (
        <div className="modal-content">
          <button className="modal-close" onClick={handleClose} aria-label="Sulge">
            &times;
          </button>

          <h2>{t("buyer.title")}</h2>
          <p className="modal-intro">{t("buyer.description")}</p>

          <form className="modal-form" onSubmit={handleSubmit}>
            {/* NAME + PHONE */}
            <div className="form-row">
              <input
                type="text"
                name="name"
                placeholder={t("form.name")}
                required
                onChange={handleChange}
              />
              <input
                type="tel"
                name="phone"
                placeholder={t("form.phone")}
                required
                onChange={handleChange}
              />
            </div>

            {/* EMAIL + PROPERTY TYPE */}
            <div className="form-row">
              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  className="form-input"
                  placeholder={t("form.email")}
                  required
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <select
                  name="propertyType"
                  className="form-select"
                  required
                  onChange={handleChange}
                >
                  <option value="" disabled selected hidden>
                    {t("form.propertyType")}
                  </option>

                  {Object.entries(t("form.types", { returnObjects: true })).map(
                    ([key, label]) => (
                      <option key={key} value={key}>
                        {label}
                      </option>
                    )
                  )}
                </select>
              </div>
            </div>

            {/* REGION + SIZE RANGE */}
            <div className="form-row">
              <div className="form-group">
                <input
                  type="text"
                  name="region"
                  placeholder={t("buyer.region")}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <div className="price-block">
                  <div className="price-range">
                    <label className="field-label">{t("buyer.size")}</label>

                    <input
                      type="number"
                      name="sizeFrom"
                      placeholder={t("form.priceFrom")}
                      onChange={handleChange}
                    />

                    <span className="price-separator">–</span>

                    <input
                      type="number"
                      name="sizeTo"
                      placeholder={t("form.priceTo")}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* ROOMS + CONDITION */}
            <div className="form-row">
              <div className="form-group">
                <div className="room-buttons">
                  <label className="field-label">{t("buyer.rooms")}</label>

                  <div className="button-group">
                    {[1, 2, 3, 4, 5, "5+"].map((num) => (
                      <button
                        type="button"
                        key={num}
                        className={`room-btn ${isRoomsActive(num) ? "activeDark" : ""}`}
                        onClick={() => handleRoomsSelect(num)}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                </div>
              </div>


              <div className="form-group">
                <select
                  name="condition"
                  className="form-select"
                  onChange={handleChange}
                >
                  <option value="" disabled selected hidden>
                    {t("form.condition")}
                  </option>

                  {Object.entries(
                    t("form.conditionOptions", { returnObjects: true })
                  ).map(([key, label]) => (
                    <option key={key} value={key}>
                      {label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* PRICE RANGE + EXTRA CONDITION */}
            <div className="form-row price-upload-row">
              <div className="price-block">
                <div className="price-range">
                  <label className="field-label">{t("form.desiredPrice")}</label>

                  <input
                    type="number"
                    name="priceFrom"
                    placeholder={t("form.priceFrom")}
                    onChange={handleChange}
                  />

                  <span className="price-separator">–</span>

                  <input
                    type="number"
                    name="priceTo"
                    placeholder={t("form.priceTo")}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-group">
                <select
                  name="financing"
                  className="form-select"
                  onChange={handleChange}
                >
                  <option value="" disabled selected hidden>
                    {t("buyer.financing")}
                  </option>

                  {Object.entries(
                    t("buyer.financingOptions", { returnObjects: true })
                  ).map(([key, label]) => (
                    <option key={key} value={key}>
                      {label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* ADDITIONAL INFO */}
            <textarea
              name="additionalInfo"
              placeholder={t("form.additionalInfo")}
              rows="4"
              onChange={handleChange}
            />
            <div id="recaptcha-buyerform" className="g-recaptcha"></div>
            <button type="submit" className="btn btn-solid-blue">
              {t("form.submit")}
            </button>
          </form>
        </div>
      ) : (
        <FormSuccessBlue onClose={handleClose} />
      )}
    </div>
  );
};

export default BuyerRequestForm;

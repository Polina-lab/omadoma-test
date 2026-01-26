import React, { useState } from "react";
import { useTranslation, Trans } from "react-i18next";
import "./BuyerRequestForm.css";
import "./ModalBlock.css";
import uplSvg from "../assets/upload.svg";
import FormSuccessBlue from "./FormSuccessBlue";
import { useNavigate } from "react-router-dom";

const BuyerRequestForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [submitted, setSubmitted] = useState(false);

const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
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
          <div className="form-row">
            <input type="text" placeholder={t("form.name")} required />
            <input type="tel" placeholder={t("form.phone")} required />
          </div>

          <div className="form-row">
            <div className="form-group">
              <input
                type="email"
                className="form-input"
                placeholder={t("form.email")}
                required
              />
            </div>

            <div className="form-group">
              <select className="form-select" required>
                <option value="" disabled selected hidden>
                  {t("form.propertyType")}
                </option>
                <option value="studio">Stuudio-korter</option>
                <option value="apartment">Korter</option>
                <option value="commercial">Kaubandus</option>
                <option value="office">Büroo</option>
                <option value="service">Teenindus</option>
                <option value="food">Toitlustus</option>
                <option value="storage">Ladu</option>
                <option value="production">Tootmine</option>
                <option value="house">Maja</option>
                <option value="housePart">Majaosa</option>
                <option value="rowhouse">Ridaelamusboks</option>
                <option value="summerhouse">Suvila</option>
                <option value="land">Maatükk</option>
                <option value="parking">Parkimiskoht</option>
                <option value="garage">Garaaž</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <input type="text" placeholder={t("buyer.region")} />
            </div>
            <div className="form-group">
              <div className="price-block">
              <div className="price-range">
                <label className="field-label">{t("buyer.size")}</label>
                <input type="number" placeholder={t("form.priceFrom")} />
                <span className="price-separator">–</span>
                <input type="number" placeholder={t("form.priceTo")} />
              </div>
            </div>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <div className="room-buttons">
              <label className="field-label">{t("buyer.rooms")}</label>
                <div className="button-group">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <button type="button" key={num} className="room-btn">
                      {num}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="form-group">
              <select className="form-select">
                  <option value="" disabled selected hidden>{t("form.condition")}</option>
                  <option value="uus">{t("form.conditionOptions.new")}</option>
                  <option value="heas">{t("form.conditionOptions.good")}</option>
                  <option value="viimistlus">{t("form.conditionOptions.freshFinish")}</option>
                  <option value="renoveeritud">{t("form.conditionOptions.renovated")}</option>
                  <option value="sanTehtud">{t("form.conditionOptions.sanitaryDone")}</option>
                  <option value="keskmine">{t("form.conditionOptions.average")}</option>
                  <option value="sanVajab">{t("form.conditionOptions.sanitaryNeeds")}</option>
                  <option value="kapVajab">{t("form.conditionOptions.capitalNeeds")}</option>
              </select>
            </div>
          </div>

          <div className="form-row price-upload-row">
            <div className="price-block">
              <div className="price-range">
                <label className="field-label">{t("form.desiredPrice")}</label>
                <input type="number" placeholder={t("form.priceFrom")} />
                <span className="price-separator">–</span>
                <input type="number" placeholder={t("form.priceTo")} />
              </div>
            </div>

            <div className="form-group">
              <select className="form-select">
                  <option value="" disabled selected hidden>{t("form.condition")}</option>
                  <option value="uus">{t("form.conditionOptions.new")}</option>
                  <option value="heas">{t("form.conditionOptions.good")}</option>
                  <option value="viimistlus">{t("form.conditionOptions.freshFinish")}</option>
                  <option value="renoveeritud">{t("form.conditionOptions.renovated")}</option>
                  <option value="sanTehtud">{t("form.conditionOptions.sanitaryDone")}</option>
                  <option value="keskmine">{t("form.conditionOptions.average")}</option>
                  <option value="sanVajab">{t("form.conditionOptions.sanitaryNeeds")}</option>
                  <option value="kapVajab">{t("form.conditionOptions.capitalNeeds")}</option>
              </select>
            </div>
          </div>

          <textarea placeholder={t("form.additionalInfo")} rows="4" />

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

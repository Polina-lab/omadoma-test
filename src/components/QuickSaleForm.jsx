import React, { useState } from "react";
import { useTranslation, Trans } from "react-i18next";
import "./ModalBlock.css";
import "./QuickSaleForm.css";
import uplSvg from "../assets/upload.svg";
import FormSuccess from "./FormSuccess";
import { useNavigate } from "react-router-dom";

const QuickSaleForm = () => {
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
    <div className="modal quick-sale">
      {!submitted ? (
      <div className="modal-content">
        <button className="modal-close" onClick={handleClose} aria-label="Sulge">
          &times;
        </button>

        <h2>{t("quickSale.title")}</h2>
        <p className="modal-intro">
            <Trans i18nKey="quickSale.modalIntro" components={[
                <span className="blue" />,
                <span className="green" />,
                <span className="gray" />
                ]} />
        </p>
        <div className="quick-sale-counter2">
           <Trans i18nKey="quickSale.counter" values={{ count: 10 }} components={[<span className="orange" />]} />
        </div>

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
            <input type="text" placeholder={t("form.address")} />
            <input type="text" placeholder={t("form.cadastral")} />
          </div>

          <div className="form-row">
            <div className="form-group">
              <input type="number" placeholder={t("form.size")} />
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

            <div className="upload-block">
              
              <span className="upload-button">
                <span className="upload-label">{t("form.uploadLabel")}</span>
                <div className="upload-end">
                  {t("form.uploadButton")}
                  <img src={uplSvg} alt="upload" className="upload-icon" />
                  <input type="file" multiple accept="image/*,.pdf" />
                </div>
              </span>

              <span className="upload-note">{t("form.uploadNote")}</span>
            </div>
          </div>

          <textarea placeholder={t("form.additionalInfo")} rows="4" />

          <button type="submit" className="btn btn-solid-dblue">
            {t("form.submit")}
          </button>
        </form>
      </div>
      ) : (
          <FormSuccess onClose={handleClose} />
        )}
    </div>
  );
};

export default QuickSaleForm;

import React from "react";
import { brokerageFormConfig } from "./brokerage";
import DynamicForm from "./DynamicForm";

const BrokerageForm = () => (
  <div className="service-modal">
    <DynamicForm config={brokerageFormConfig} />
  </div>
);

export default BrokerageForm;



/*import React, { useState } from "react";
import "./Form.css";
import FormSuccess from "../FormSuccess";
import { useTranslation, Trans } from "react-i18next";
import uplSvg from "../../assets/upload.svg";

const BrokerageForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    propertyType: "",
    message: ""
  });

  const { t } = useTranslation();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    console.log("Brokerage form submitted:", formData);
    // здесь можно добавить отправку на сервер или email
  };

  const [submitted, setSubmitted] = useState(false);
  
  const handleClose = () => {
    window.location.href = "/";
  };

  return (
    <div className="service-modal">
          {!submitted ? (  
            <form className="modal-form service-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder={t("form.name")} required />
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder={t("form.phone")} required />
              </div>
    
              <div className="form-row">
                <div className="form-group">
                  <input
                    type="email"
                    className="form-input"
                    name="email"
                    value={formData.email} onChange={handleChange}
                    placeholder={t("form.email")}
                    required
                  />
                </div>
    
                <div className="form-group">
                  <select name="propertyType" value={formData.propertyType} onChange={handleChange} className="form-select" required>
                    <option value="" disabled selected hidden>
                      {t("form.propertyType")}
                    </option>
                    <option value="studio">{t("form.types.studio")}</option>
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

              <div className="form-row">
                <div className="form-group">
                  <div className="room-buttons">
                  <label className="field-label">{t("form.rooms")}</label>
                  
                    {[1, 2, 3, 4, 5, t("form.rooms")].map((num) => (
                      <button type="button" key={num} className="room-btn">
                        {num}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="form-group">
                  <div className="room-buttons">
                  <label className="field-label">{t("form.wish")}</label>
                  
                    {[t("form.wish"), 'Üürile anda'].map((num) => (
                      <button type="button" key={num} className="room-btn">
                        {num}
                      </button>
                    ))}
                  </div>
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
    
              <textarea name="message" value={formData.message} onChange={handleChange} placeholder={t("form.additionalInfo")} rows="4" />
    
              <button type="submit" className="btn btn-solid-orange">
                {t("services.sendRequest")}
              </button>
            </form>
          ) : (
              <FormSuccess onClose={handleClose} />
            )}
        </div>
        );
};

export default BrokerageForm;*/

import React from "react";
import { useTranslation } from "react-i18next";

const FormSuccessSecond = ({ onClose }) => {
  const { t } = useTranslation();

  return (
    <div className="form-success2">
      <button className="modal-close" onClick={onClose} aria-label="Sulge">
        &times;
      </button>

      <h2>{t("success.title")}</h2>

      <p className="success-message2">
        {t("success.message")}
      </p>
    </div>
  );
};

export default FormSuccessSecond;

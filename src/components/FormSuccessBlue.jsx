import React from "react";
import { useTranslation } from "react-i18next";
import "./FormSuccessBlue.css";

const FormSuccessBlue = ({ onClose }) => {
  const { t } = useTranslation();

  return (
    <div className="form-success">
        <button className="modal-close" onClick={onClose} aria-label="Sulge">
            &times;
        </button>
      <h2>{t("success.title")}</h2>
      <p>
        {t("success.message")
          .split("\n")
          .map((line, idx) => (
            <span key={idx}>
              {line}
              <br />
            </span>
          ))}
      </p>
    </div>
  );
};

export default FormSuccessBlue;
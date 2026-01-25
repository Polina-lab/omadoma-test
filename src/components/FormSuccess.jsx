import React from "react";
import { useTranslation } from "react-i18next";
import "./FormSuccess.css";

const FormSuccess = ({ onClose }) => {
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

      <div className="form-success-hints">
        <p>{t("success.hintTitle")}</p>
        <ul>
          {t("success.hints", { returnObjects: true }).map((hint, idx) => (
            <li key={idx}>{hint}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FormSuccess;
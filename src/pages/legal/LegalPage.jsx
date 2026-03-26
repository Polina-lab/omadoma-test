import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./Legal.css";

const LegalPage = ({ titleKey, contentKey }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="legal-page">
      <div className="legal-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <span className="arrow">←</span> {t("back")}
        </button>

        <h1 className="legal-title">{t(titleKey)}</h1>
      </div>

      <div className="legal-content">
        <p>{t(contentKey)}</p>
      </div>
    </div>
  );
};

export default LegalPage;

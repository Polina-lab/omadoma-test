import React from "react";
import { useTranslation } from "react-i18next";

const FormSuccessSecond = ({ onClose }) => {
  const { t } = useTranslation();

  return (
    <div className="form-success2">

      <h3>{t("success.title")}</h3>

      <p className="success-message2">
        {t("success.message")}
      </p>
    </div>
  );
};

export default FormSuccessSecond;

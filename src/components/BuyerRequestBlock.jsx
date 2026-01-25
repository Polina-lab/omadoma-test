import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import "./BuyerRuguestBlock.css";
import ReactDOM from "react-dom";
import BuyerRequestForm from "./BuyerRequestForm";

const BuyerRequestBlock = () => {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
    <div className="buyer-banner">
      <div className="banner-content">
        <div className="banner-text">
          <h3>{t("buyerBanner.title")}</h3>
          <p>{t("buyerBanner.description")}</p>
        </div>
      <button className="btn btn-solid-white"
      onClick={() => setIsModalOpen(true)}>
        {t("buyerBanner.button")}
      </button>
      </div>
    </div>
    {isModalOpen &&
  ReactDOM.createPortal(
    <BuyerRequestForm onClose={() => setIsModalOpen(false)} />,
    document.body
  )
}
    </>
  );
};

export default BuyerRequestBlock;

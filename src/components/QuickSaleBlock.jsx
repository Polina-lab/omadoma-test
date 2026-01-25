import React, { useState } from "react";
import { useTranslation, Trans  } from "react-i18next";
import QuickSaleForm from "./QuickSaleForm";
import ReactDOM from "react-dom";

const QuickSaleBlock = () => {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
    <section className="quick-sale-block">
        <h3 className="quick-sale-title">{t("quickSale.title")}</h3>
        <p className="quick-sale-description">
          {t("quickSale.description")}
        </p>
        <div className="quick-sale-counter">
          <Trans i18nKey="quickSale.counter" values={{ count: 10 }} components={[<span className="count" />]} />
        </div>
        <button
          className="btn btn-solid-dblue"
          onClick={() => setIsModalOpen(true)}
        >
          {t("quickSale.button")}
        </button>
    </section>
    
    {isModalOpen &&
  ReactDOM.createPortal(
    <QuickSaleForm onClose={() => setIsModalOpen(false)} />,
    document.body
  )
}

    </>
  );
};

export default QuickSaleBlock;


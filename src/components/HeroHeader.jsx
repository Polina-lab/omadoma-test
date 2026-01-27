import React from "react";
import { useTranslation, Trans } from "react-i18next";
import QuickSaleBlock from "../components/QuickSaleBlock";
import { Link } from "react-router-dom";
import "./HeroHeader.css";

const HeroHeader = () => {
  const { t } = useTranslation();

  return (
    <section id="home" className="hero-header">
      <div className="hero-bg-left" />
      <div className="hero-bg-right" />
      <div className="hero-content">
        <h2>{t("hero.subtitle")}</h2>
        <p><Trans i18nKey="hero.description" components={[ <span className="blue" />,
                                    <span className="green" />,
                                    <span className="gray italic" />
                                    ]} /></p>
        <div className="hero-buttons">
          <Link
            to="https://www.kv.ee/maakler/gloreal"
            className="btn btn-outline-green offers"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t("hero.offers")}
          </Link>
          <Link
            to="https://sarapuukrundid.ee/"
            className="btn btn-solid-green"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t("hero.buyPlot")}
          </Link>
        </div>
        <QuickSaleBlock />
      </div>
    </section>
  );
};

export default HeroHeader;

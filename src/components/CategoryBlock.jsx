import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation, Trans } from "react-i18next";
import "./CategoryBlock.css";

import businessActive from "../assets/category/business-green.svg";
import businessLeft from "../assets/category/business-blue.svg";
import businessRight from "../assets/category/business-orange.svg";

import summerhouseActive from "../assets/category/summerhouse-green.svg";
import summerhouseLeft from "../assets/category/summerhouse-blue.svg";
import summerhouseRight from "../assets/category/summerhouse-orange.svg";

import houseActive from "../assets/category/house-green.svg";
import houseLeft from "../assets/category/house-blue.svg";
import houseRight from "../assets/category/house-orange.svg";

import bussinessActive from "../assets/category/business-green.svg";
import bussinessLeft from "../assets/category/business-blue.svg";
import bussinessRight from "../assets/category/business-orange.svg";

import apartmentActive from "../assets/category/apartment-green.svg";
import apartmentLeft from "../assets/category/apartment-blue.svg";
import apartmentRight from "../assets/category/apartment-orange.svg";

import garageActive from "../assets/category/garage-green.svg";
import garageLeft from "../assets/category/garage-blue.svg";
import garageRight from "../assets/category/garage-orange.svg";

import entrepreneurshipActive from "../assets/category/entrepreneurship-green.svg";
import entrepreneurshipLeft from "../assets/category/entrepreneurship-blue.svg";
import entrepreneurshipRight from "../assets/category/entrepreneurship-orange.svg";

import developmentActive from "../assets/category/development-green.svg";
import developmentLeft from "../assets/category/development-blue.svg";
import developmentRight from "../assets/category/development-orange.svg";

import investmentActive from "../assets/category/investment-green.svg";
import investmentLeft from "../assets/category/investment-blue.svg";
import investmentRight from "../assets/category/investment-orange.svg";

import newDevelopmentActive from "../assets/category/new-development-green.svg";
import newDevelopmentLeft from "../assets/category/new-development-blue.svg";
import newDevelopmentRight from "../assets/category/new-development-orange.svg";

export const categoryBlocks = [
  {
    key: "garages",
    active: garageActive,
    left: garageLeft,
    right: garageRight,
    link: "https://www.city24.ee/broker/300837/german-randla/sale/ot=Garage"
  },
  {
    key: "summerhouses",
    active: summerhouseActive,
    left: summerhouseLeft,
    right: summerhouseRight,
    link: "/categories/summerhouse"
  },
  {
    key: "houses",
    active: houseActive,
    left: houseLeft,
    right: houseRight,
    link: "https://www.kv.ee/maakler/gloreal/majad"
  },
  {
    key: "land",
    active: bussinessActive,
    left: bussinessLeft,
    right: bussinessRight,
    link: "https://www.kv.ee/maakler/gloreal/krundid"
  },
  {
    key: "apartments",
    active: apartmentActive,
    left: apartmentLeft,
    right: apartmentRight,
    link: "https://www.kv.ee/maakler/gloreal/korterid"
  },
  {
    key: "businessSpaces",
    active: businessActive,
    left: businessLeft,
    right: businessRight,
    link: "https://www.kv.ee/maakler/gloreal/aripinnad"
  },
  {
    key: "entrepreneurship",
    active: entrepreneurshipActive,
    left: entrepreneurshipLeft,
    right: entrepreneurshipRight,
    link: "/categories/entrepreneurship"
  },
  {
    key: "development",
    active: developmentActive,
    left: developmentLeft,
    right: developmentRight,
    link: "/categories/development"
  },
  {
    key: "investments",
    active: investmentActive,
    left: investmentLeft,
    right: investmentRight,
    link: "/categories/investment"
  },
  {
    key: "newDevelopments",
    active: newDevelopmentActive,
    left: newDevelopmentLeft,
    right: newDevelopmentRight,
    link: "/categories/new-development"
  }
];

const CategoryBlock = () => {
  const { t } = useTranslation();
  const [activeKey, setActiveKey] = useState("apartments");

  return (
    <div className="category-block">
      <h2 className="category-title">
        <Trans i18nKey="category.title" components={[
          <span className="blue2" />,
          <span className="orange2" />
        ]} />
      </h2>
      <p className="category-description">
        <Trans i18nKey="category.description" components={[
          <span className="blue" />,
          <span className="green" />,
          <span className="gray italic" />
        ]} />
      </p>

      <div className="categories-horizontal">
        {categoryBlocks.map((block, i) => {
            const activeIndex = categoryBlocks.findIndex(b => b.key === activeKey);
            const isActive = block.key === activeKey;
            const isLeft = i < activeIndex;
            const isRight = i > activeIndex;

            let iconSrc = block.icon;
            let textColor = "blue";

            if (isActive) {
                iconSrc = block.active;
                textColor = "green";
            } else if (isLeft) {
                iconSrc = block.left;
                textColor = "blue";
            } else if (isRight) {
                iconSrc = block.right;
                textColor = "orange";
            }

            return (
                <div
                key={block.key}
                className={`category-tile ${isActive ? "active" : ""}`}
                onClick={() => setActiveKey(block.key)}
                >
                <div className="tile-icon">
                    <img src={iconSrc} alt={t(`categories.${block.key}`)} className="tile-icon-img" />
                </div>
                <span className={`tile-label ${textColor}`}>{t(`categories.${block.key}`)}</span>
                {isActive && <Link to={block.link} target="_blank" rel="noopener noreferrer" className="tile-view">
                                {t("services.readMore")}
                            </Link>}
                </div>
            );
            })}

      </div>
    </div>
  );
};

export default CategoryBlock;



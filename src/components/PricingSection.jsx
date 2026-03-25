import { useState, useEffect } from "react";
import { useTranslation, Trans } from "react-i18next";
import ServiceFormOverlay from "./ServiceFormOverlay";
import "./PricingSection.css";

import arrowDown from "../assets/services/arrow-down.svg";
import arrowUp from "../assets/services/arrow-up.svg";

import basicIcon from "../assets/services/basic.svg";
import fullIcon from "../assets/services/full.svg";

const icons = {
  basic: basicIcon,
  full: fullIcon
};

export default function PricingSection({
  variant = "default",
  showFlex = true,
  expandable = false,
  onSelectPackage
}) {
  const { t } = useTranslation();

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [activeIndex, setActiveIndex] = useState(null);
  

  const [activeForm, setActiveForm] = useState(null);
  const [openCard, setOpenCard] = useState(null);

  const isSimpleUI = variant === "simple" || isMobile;

  const getPricingData = () => {
    return ["flex", "basic", "full"]
      .map((type) => ({
        type,
        data: t(`pricing.${type}`, { returnObjects: true })
      }))
      .filter((pkg) => showFlex || pkg.type !== "flex");
  };

  const packages = getPricingData();

  useEffect(() => {
    if (!packages.length || activeIndex !== null) return;

    const basicIndex = packages.findIndex(p => p.type === "basic");
    setActiveIndex(basicIndex !== -1 ? basicIndex : 0);
  }, [packages]);

  const safeIndex =
    activeIndex !== null
      ? Math.max(0, Math.min(activeIndex, packages.length - 1))
      : 0;

  const visiblePackages = isMobile
    ? [packages[safeIndex]]
    : packages;

  useEffect(() => {
    setOpenCard(null);
    setActiveForm(null);
  }, [activeIndex]);



  const renderDetails = (type, data) => (
    <>
      <p><b>{data.includesTitle}</b></p>

      <ul className="check">
        {data.includes.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>

      {data.notIncludes && (
        <>
          <p><b>{data.notIncludesTitle}</b></p>

          <ul className="cross">
            {data.notIncludes.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </>
      )}
      <button
          className="btn-pricing"
          onClick={() => {
            if (variant === "simple") {
              onSelectPackage?.(type);
            } else {
              handleClick(type);
            }
          }}
        >
          {data.button}
      </button>
      <div className="pricing-extra">
        <p>{data.pricing.title}</p>

        {data.pricing.items.map((item, i) => (
          <div key={i}>
            <Trans
              i18nKey={item}
              components={[
                <span className="brown-bold" />,
                <span className="gold-bold" />
              ]}
            />
          </div>
        ))}
      </div>
    </>
  );

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleClick = (type) => {
    if (variant === "simple") {
      document.getElementById("contact-form")?.scrollIntoView({
        behavior: "smooth"
      });
    } else {
      setActiveForm(type);
    }
  };

  return (
    <>
    {isSimpleUI && activeForm && (
          <ServiceFormOverlay
            type={packages.find(p => p.data.title === activeForm)?.data.title}
            onClose={() => setActiveForm(null)}
          />
        )}
    <section className="pricing-section">
      <div className="pricing-grid">

        {visiblePackages.map(({ type, data }) => (
          <div key={type} className={`card ${type}`}>

            {/* BADGE */}
            {(variant === "simple" || isMobile) && (
              <>{isMobile && (
                <div className="slider-top left">
                  <button
                    onClick={() => setActiveIndex(prev => (prev - 1 + packages.length) % packages.length)}
                  >
                    ←
                  </button></div>)}
              <div className="card-type-top">
                {data.type}
              </div>
              {isMobile && (
                <div className="slider-top right">
                  <button
                    onClick={() => setActiveIndex(prev => (prev + 1) % packages.length)}
                  >
                    →
                  </button></div>)}
              </>
            )}
            {(variant === "simple" || isMobile) && data.badge && <div className="badge">{data.badge}</div>}
            {(variant === "default" && !isMobile) && data.badge && type === "basic" &&  <div className="badge">{data.badge}</div>}

            {/* ICON (только для simple) */}
            {variant === "simple" && (
              <div className="card-icon">
                <img src={icons[type]} alt="" />
              </div>
            )}

            {/* HEADER */}
            <div className="card-header">
              {(variant === "default" && !isMobile) && (<span className="card-type">{data.type}</span>)}

              {(variant === "default" && !isMobile) && type === "basic" ? (
                <h2 className="title">{data.title}</h2>
              ) : (
                <h3 className="title">{data.title}</h3>
              )}

              {data.subtitle && (
                <p className="subtitle">{data.subtitle}</p>
              )}

              {(variant === "default" && !isMobile) && type === "basic" ? (
                <h2 className="price">{data.price}</h2>
              ) : (
                <h3 className="price">{data.price}</h3>
              )}

              {data.desc && <p className="desc">{data.desc}</p>}
            </div>

            {/* FLEX */}
            {type === "flex" && (
              <>
                <p className="list-title">{data.listTitle}</p>

                <ul>
                  {data.list.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>

                <button
                  className="btn-pricing"
                  onClick={() => (window.location.href = "/services")}
                >
                  {data.button}
                </button>
              </>
            )}

            {/* BASIC + FULL */}
            {(type === "basic" || type === "full") && (
              <>
                {/* SIMPLE */}
                {isSimpleUI ? (
                  <>
                    {/* КНОПКА (скрывается при открытии) */}
                    <button
                      className={`btn-pricing ${openCard === type ? "hide" : ""}`}
                      onClick={() => {
                        if (variant === "simple") {
                          onSelectPackage?.(type);
                        } else {
                          handleClick(type);
                        }
                      }}
                    >
                      {data.button}
                    </button>

                    {/* TOGGLE */}
                    <div
                      className="toggle-block"
                      onClick={() =>
                        setOpenCard(openCard === type ? null : type)
                      }
                    >
                      {openCard !== type && (
                        <span className="more-text">
                          {t("pricing.more")}
                        </span>
                      )}

                      <div className={`arrow ${openCard === type ? "up" : ""}`}>
                        <img
                          src={openCard === type ? arrowUp : arrowDown}
                          alt="toggle"
                          className="toggle-icon"
                        />
                      </div>
                    </div>

                    {/* CONTENT */}
                    <div className={`list-simple ${openCard === type ? "open" : ""}`}>
                      {renderDetails(type, data)}
                    </div>
                  </>
                ) : (
                  <>
                    {/* DEFAULT */}
                    <div className="list">
                      {renderDetails(type, data)}
                    </div>

                    {activeForm === type && (
                      <ServiceFormOverlay
                        type={data.title}
                        onClose={() => setActiveForm(null)}
                      />
                    )}
                  </>
                )}
              </>
            )}
          </div>
          
        ))}
        
      </div>
    </section>
    </>
  );
}
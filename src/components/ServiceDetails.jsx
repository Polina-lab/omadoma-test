import React, { useState, useEffect } from "react";
import { useTranslation, Trans } from "react-i18next";

import BrokerageForm from "./forms/BrokerageForm";
import ManagementForm from "./forms/ManagementForm";
import RenovationForm from "./forms/RenovationForm";
import ValuationForm from "./forms/ValuationForm";
import MediaForm from "./forms/MediaForm";
import InvestmentForm from "./forms/InvestmentForm";
import FinancingForm from "./forms/FinancingForm";

import iconBrokerageHover from "../assets/services/icon-brokerage.svg";
import iconManagementHover from "../assets/services/icon-management.svg";
import iconRenovationHover from "../assets/services/icon-renovation.svg";
import iconValuationHover from "../assets/services/icon-valuation.svg";
import iconMediaHover from "../assets/services/icon-media.svg";
import iconInvestmentHover from "../assets/services/icon-investment.svg";
import iconFinancingHover from "../assets/services/icon-financing.svg";

const formComponents = {
    BrokerageForm,
    ManagementForm,
    RenovationForm,
    ValuationForm,
    MediaForm,
    InvestmentForm,
    FinancingForm };

const serviceIcons = {
  brokerage: iconBrokerageHover,
  management: iconManagementHover,
  renovation: iconRenovationHover,
  valuation: iconValuationHover,
  media: iconMediaHover,
  investment: iconInvestmentHover,
  financing: iconFinancingHover
};

const ServiceDetails = ({ serviceKey, onClose }) => {
  const { t } = useTranslation();
  const [showForm, setShowForm] = useState(false);

  useEffect(() => { setShowForm(false); }, [serviceKey]);

  const blocks = t(`services.detailss.${serviceKey}`, { returnObjects: true });

  return (
    <section className="service-details">
        <button className="details-close" onClick={onClose}>&times;</button>

        <div className="service-details-content">
            <div className="top-content">
                <img
                    src={serviceIcons[serviceKey]}
                    alt={t(`services.${serviceKey}.title`)}
                    className="service-icon-details"
                />
                
                <div className="text-block">
                    <h2 className="small">{t(`services.${serviceKey}.title`)}</h2>

                    {blocks.map((block, index) => {
                        if (block.type === "text") {
                            return (
                            <p key={index}>
                                <Trans i18nKey={`services.detailss.${serviceKey}.${index}.content`} components={[ <span className="blue" />,
                                    <span className="green" />,
                                    <span className="gray italic" />,
                                    <span className="orange" />,
                                    <span className="underline blue" />,
                                    <span className="underline green" />
                                    ]}
                                />
                                {block.link && (
                                <a href={block.link} target="_blank" rel="noopener noreferrer" className="inline-link" >
                                    ↗
                                </a>
                                )}
                            </p>
                            );
                        }

                        if (block.type === "list") {
                            return (
                            <ul key={index}>
                                {block.items.map((item, i) => (
                                <li key={i}>{item}</li>
                                ))}
                            </ul>
                            );
                        }

                        if (block.type === "pricing") {
                            return (
                            <div className="pricing-block" key={index}>
                                {block.items.map((item, i) => (
                                <p key={i}>• {item}</p>
                                ))}
                            </div>
                            );
                        }

                        if (block.type === "cta") {
                            return (
                            <div className="cta-block" key={index}>
                                <div className="cta-row">
                                    <p className="cta-text">{block.text}</p>
                                    {!showForm && (
                                        <button className="btn btn-solid-orange" onClick={() => setShowForm(block.formComponent)}
                                        >
                                        {block.button}
                                        </button>
                                    )}
                                </div>
                                {showForm &&
                                formComponents[showForm] &&
                                <div className="form-wrapper">
                                    {React.createElement(formComponents[showForm])}
                                </div>
                                }
                            </div>
                            );
                        }

                        return null;
                        })}
                </div>
            </div>
        </div>
    </section>
  );
};

export default ServiceDetails;

import React from "react";
import { useTranslation, Trans } from "react-i18next";
import "./Process.css";

import icon1 from "../assets/process/consultation.svg";
import icon2 from "../assets/process/analysis.svg";
import icon3 from "../assets/process/strategy.svg";
import icon4 from "../assets/process/marketing.svg";
import icon5 from "../assets/process/negotiation.svg";
import icon6 from "../assets/process/followup.svg";

import arrowNext from "../assets/process/arrow.png";

const steps = [
  { key: "consultation", icon: icon1 },
  { key: "analysis", icon: icon2 },
  { key: "strategy", icon: icon3 },
  { key: "marketing", icon: icon4 },
  { key: "negotiation", icon: icon5 },
  { key: "followup", icon: icon6 }
];

const Process = () => {
  const { t } = useTranslation();

  return (
    <section id="process">
      <div className="process-block">
        <div className="process-steps">
          <div className="process-header">
            <h2 className="process-title">
              <Trans i18nKey="process.title" components={[
                <span className="gray" />,
                <span className="blue2" />
              ]} />
            </h2>
            <p className="process-description">
              <Trans i18nKey="process.description" components={[
                <span className="blue" />,
                <span className="green" />,
                <span className="gray italic" />
              ]} />
            </p>
        </div>
          {steps.map((step, i) => (
            <React.Fragment key={step.key}>
              <div className="process-step">
                <div className="step-circle">
                  <img src={step.icon} alt={t(`process.${step.key}.title`)} />
                  <span className="step-number">{i + 1}</span>
                </div>
                <div className="step-text">
                  <h4>{t(`process.${step.key}.title`)}</h4>
                  <p>{t(`process.${step.key}.description`)}</p>
                </div>
              </div>

              {i < steps.length - 1 && (
                <div className="process-arrow">
                  <img src={arrowNext} alt="arrow" />
                </div>
              )}
            </React.Fragment>
          ))}

        </div>
      </div>
    </section>
  );
};

export default Process;

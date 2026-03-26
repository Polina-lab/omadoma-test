import { useTranslation } from "react-i18next";
import { useEffect, useRef, useState } from "react";

import "./HowItWorks.css";
import step1Icon from "../assets/process/step-1.svg";
import step2Icon from "../assets/process/step-2.svg";
import step3Icon from "../assets/process/step-3.svg";

import LineMain from "../assets/line-main.svg?react";
import LineShadow from "../assets/line-shadow.svg?react";


export default function HowItWorks() {
    const ref = useRef();
    const [visible, setVisible] = useState(false);

    const { t } = useTranslation();

    useEffect(() => {
    const observer = new IntersectionObserver(
        ([entry]) => {
        if (entry.isIntersecting) {
            setVisible(true);
        }
        },
        { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
    }, []);
  return (
    <section className={`how ${visible ? "visible" : ""}`} ref={ref}>
      <h2 className="how-title">{t("howItWorks.title")}</h2>

      <div className="how-container">

        {/* SVG линия */}
        <LineMain className="how-line line-main" />
        <LineShadow className="how-line line-shadow" />

        {/* STEP 1 */}
        <div className={`step step-1 ${visible ? "show" : ""}`}>
          <div className="content">
            <span className="step-number">1</span>

            <h3>{t("howItWorks.step1.title")}</h3>
            <p>{t("howItWorks.step1.description")}</p>
          </div>
          <div className="icon">
            <img src={step1Icon} alt="" />
          </div>
        </div>

        {/* STEP 2 */}
        <div className={`step step-2 ${visible ? "show" : ""}`}>
          <div className="icon">
            <img src={step2Icon} alt="" />
          </div>

          <div className="content">
            <span className="step-number">2</span>

            <h3>{t("howItWorks.step2.title")}</h3>
            <p>{t("howItWorks.step2.description")}</p>
          </div>
        </div>

        {/* STEP 3 */}
        <div className={`step step-3 ${visible ? "show" : ""}`}>
          <div className="icon">
            <img src={step3Icon} alt="" />
          </div>

          <div className="content">
            <span className="step-number">3</span>

            <h3>{t("howItWorks.step3.title")}</h3>
            <p>{t("howItWorks.step3.description")}</p>
          </div>
        </div>

      </div>
    </section>
  );
}
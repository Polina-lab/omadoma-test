import "./HowItWorks.css";
import step1Icon from "../assets/step-1.svg";
import step2Icon from "../assets/step-2.svg";
import step3Icon from "../assets/step-3.svg";

import LineMain from "../assets/line-main.svg?react";
import LineShadow from "../assets/line-shadow.svg?react";
import { useEffect, useRef, useState } from "react";

export default function HowItWorks() {
    const ref = useRef();
    const [visible, setVisible] = useState(false);

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
      <h2 className="how-title">Kuidas see töötab?</h2>

      <div className="how-container">

        {/* SVG линия */}
        <LineMain className="how-line line-main" />
        <LineShadow className="how-line line-shadow" />

        {/* STEP 1 */}
        <div className={`step step-1 ${visible ? "show" : ""}`}>
          <div className="content">
            <span className="step-number">1</span>

            <h3>Jäta oma kontakt</h3>
            <p>Täida lühike vorm ainult põhiinfo.</p>
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

            <h3>Saad tasuta konsultatsiooni</h3>
            <p>Arutame sinu objekti, turusituatsiooni ja strateegiat.</p>
          </div>
        </div>

        {/* STEP 3 */}
        <div className={`step step-3 ${visible ? "show" : ""}`}>
          <div className="icon">
            <img src={step3Icon} alt="" />
          </div>

          <div className="content">
            <span className="step-number">3</span>

            <h3>Alustame müüki</h3>
            <p>Selge plaan. Struktureeritud protsess. Fookus tulemusele.</p>
          </div>
        </div>

      </div>
    </section>
  );
}
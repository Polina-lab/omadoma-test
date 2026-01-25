import React, { useState } from "react";
import { useTranslation, Trans } from "react-i18next";
import "./Partners.css";

import seb from "../assets/partners/seb.svg";
import sarapuu from "../assets/partners/sarapuu.svg";
import swedbank from "../assets/partners/swedbank.svg";
import ikodomos from "../assets/partners/ikodomos.svg";
import inbank from "../assets/partners/inbank.svg";

const logos = [
  { src: seb, height: 70 },
  { src: sarapuu, height: 120 },
  { src: swedbank, height: 40 },
  { src: ikodomos, height: 120 },
  { src: inbank, height: 70 }
];

const Partners = () => {
    const { t } = useTranslation();

    return (
        <div className="partners-block">
            <div className="partners-marquee">
                <div className="partners-track">
                {logos.map((logo, i) => (
                    <img key={i} className="partner-logo" src={logo.src} alt={`Partner ${i + 1}`} style={{ height: logo.height }} />
                ))}
                {/* Повтор для бесконечной прокрутки */}
                {logos.map((logo, i) => (
                    <img key={`repeat-${i}`} className="partner-logo" src={logo.src} alt={`Partner ${i + 1}`} style={{ height: logo.height }} />
                ))}
                </div>
            </div>
        </div>
    );
};

export default Partners;

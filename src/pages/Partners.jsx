import React, { useState } from "react";
import { useTranslation, Trans } from "react-i18next";
import "./Partners.css";

import armudu from "../assets/partners/armudu.svg";
import barberina from "../assets/partners/barberina.svg";
import sarapuu from "../assets/partners/sarapuu.svg";
import estateguru from "../assets/partners/estateguru.svg";
import ikodomos from "../assets/partners/ikodomos.svg";
import glikmanAlvin from "../assets/partners/glikman-alvin.svg";
import hearts from "../assets/partners/hearts.svg";
import lhv from "../assets/partners/lhv-logo.svg";
import narlex from "../assets/partners/narlex.svg";

const logos = [
  { src: sarapuu, height: 120, heightMob: 90, url: "https://sarapuu.ee/" },
  { src: ikodomos, height: 120, heightMob: 100, url: "https://ikodomos.gloreal.ee/" },
  { src: armudu, height: 70, heightMob: 60, url: "https://restoranarmudu.ee/" },
  { src: lhv, height: 50, heightMob: 50, url: "https://www.lhv.ee/" },
  { src: barberina, height: 100, heightMob: 90, url: "https://barberina.eu/" },
  { src: estateguru, height: 50, heightMob: 50, url: "https://estateguru.co/" },
  { src: glikmanAlvin, height: 50, heightMob: 50, url: "https://glikmanalvin.ee/" },
  { src: hearts, height: 60, heightMob: 70, url: "https://heartsfinejewellery.com/" },
  { src: narlex, height: 70, heightMob: 70, url: "https://narlex.com/" }
];

const Partners = () => {
    const { t } = useTranslation();

    const isMobile = window.innerWidth < 768;

    const [index, setIndex] = useState(0);

    const prev = () => {
        setIndex((prev) => (prev === 0 ? logos.length - 1 : prev - 1));
    };

    const next = () => {
        setIndex((prev) => (prev === logos.length - 1 ? 0 : prev + 1));
    };


    return (
    <div className="partners-block">

      {!isMobile && (
        <div className="partners-marquee">
          <div className="partners-track">
            {logos.map((logo, i) => (
              <a
                key={i}
                href={logo.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                className="partner-logo"
                src={logo.src}
                style={{ height: logo.height }}
                />
              </a>
            ))}
            {logos.map((logo, i) => (
               <a
                key={`repeat-${i}`}
                href={logo.url}
                target="_blank"
                rel="noopener noreferrer"
               >
                <img
                className="partner-logo"
                src={logo.src}
                style={{ height: logo.height }}
                />
               </a>
            ))}
          </div>
        </div>
      )}

      {isMobile && (
        <div className="partners-slider">
          <button className="arrow left" onClick={prev}>‹</button>

          <div className="slider-window">
            <div
              className="slider-track"
              style={{ transform: `translateX(-${index * 100}%)` }}
            >
              {logos.map((logo, i) => (
                <div className="slide" key={i}>
                  <a href={logo.url} target="_blank" rel="noopener noreferrer">
                    <img src={logo.src} style={{ height: logo.heightMob }} />
                  </a>
                </div>
              ))}
            </div>
          </div>

          <button className="arrow right" onClick={next}>›</button>
        </div>
      )}

    </div>
  );
};

export default Partners;

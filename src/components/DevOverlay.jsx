import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import LangSwitcher from "./LangSwitcher";

function DevOverlay() {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.box}>
        <div className="lang-dropdown">
          <LangSwitcher />
        </div>
        <h2 style={styles.title}>{t("dev.title")}</h2>
        <p style={styles.sub}>{t("dev.subtitle")}</p>

        <button style={styles.btn} onClick={() => setVisible(false)}>
          {t("dev.continue")}
        </button>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.65)",
    backdropFilter: "blur(4px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 999999,
    top: "0",
    left: "0",
    width: "100vw",
  },
  box: {
    background: "#fff",
    padding: "32px 40px",
    borderRadius: "12px",
    textAlign: "center",
    maxWidth: "300px",
    margin:"0",
    fontFamily: "Inter, sans-serif",
  },
  title: {
    fontSize: "28px",
    fontWeight: 600,
    marginBottom: "12px",
  },
  sub: {
    fontSize: "18px",
    opacity: 0.7,
    marginBottom: "24px",
    color: "#000",
  },
  btn: {
    padding: "12px 24px",
    fontSize: "16px",
    border: "none",
    background: "#9b4022",
    color: "#fff",
    borderRadius: "6px",
    cursor: "pointer",
  },
};

export default DevOverlay;

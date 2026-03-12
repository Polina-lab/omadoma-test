// src/utils/recaptcha.js
export const renderRecaptcha = (divId, windowKey, siteKey) => {
  const interval = setInterval(() => {
    if (window.grecaptcha && document.getElementById(divId)) {
      if (!window[windowKey]) {
        window[windowKey] = window.grecaptcha.render(divId, { sitekey: siteKey });
      }
      clearInterval(interval);
    }
  }, 100);
};
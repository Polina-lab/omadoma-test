import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import FormSuccessSecond from "./FormSuccessSecond";
import uplSvg from "../../assets/upload.svg";
import "./Form.css";
import { renderRecaptcha } from "../../utils/recaptcha";

const DynamicForm = ({ config }) => {
  const { t, i18n } = useTranslation();
  const [formData, setFormData] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const [range, setRange] = useState({ start: null, end: null });

  const normalize = (v) => (typeof v === "string" && v.includes("+") ? parseInt(v) + 1 : Number(v));

  const handleRangeSelect = (name, rawValue) => {
    const value = normalize(rawValue);

    setRange(prev => {
      const { start, end } = prev;

      // 1) Первый выбор
      if (start === null) {
        setFormData(f => ({ ...f, [name]: rawValue }));
        return { start: value, end: null };
      }

      // 2) Выбор второго значения
      if (end === null) {
        if (value > start) {
          setFormData(f => ({ ...f, [name]: `${start}-${rawValue}` }));
          return { start, end: value };
        } else {
          // если выбрали меньше — начинаем заново
          setFormData(f => ({ ...f, [name]: rawValue }));
          return { start: value, end: null };
        }
      }

      // 3) Если диапазон уже есть:
      // — если новое значение больше конца → расширяем диапазон
      if (value > end) {
        setFormData(f => ({ ...f, [name]: `${start}-${rawValue}` }));
        return { start, end: value };
      }

      // — если новое значение меньше начала → начинаем новый диапазон
      if (value < start) {
        setFormData(f => ({ ...f, [name]: rawValue }));
        return { start: value, end: null };
      }

      // — если внутри диапазона → сброс и новый старт
      setFormData(f => ({ ...f, [name]: rawValue }));
      return { start: value, end: null };
    });
  };



const isActive = (opt) => {
  const value = normalize(opt);
  const { start, end } = range;

  if (start === null) return false;
  if (end === null) return value === start;

  return value >= start && value <= end;
};



  const getMaxByUnit = (unit) => {
    switch (unit) {
      case "days":
        return 60;
      case "months":
        return 48;
      case "years":
        return 30;
      default:
        return 30;
    }
  };


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

    useEffect(() => {
        renderRecaptcha("recaptcha-dynamicform", "recaptchaDynamicId", "6LfPDXIsAAAAAFwt-mPrn_86Mcs502uX8_fxdM14");
    }, []);


const handleSubmit = async (e) => {
  e.preventDefault();
  console.log("Type:", config.type);

  const token = window.grecaptcha.getResponse(window.recaptchaDynamicId);
  //const token="test";

  if (!token) {
    alert("Please confirm you are not a robot.");
    return;
  }

  const response = await fetch("https://gloreal.ee/send-mail.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        formType: config.type,
        ...formData,
        lang: i18n.language,
        recaptchaToken: token
      }),
    });

    const result = await response.json();

    //console.log("Result from server:", result);

    if (result.success) {
      setSubmitted(true);
      window.grecaptcha.reset(window.recaptchaDynamicId);
    } else {
      alert("Error sending message");
    }
  };

  const handleButtonSelect = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files).map(f => f.name);
    setFormData({ ...formData, [input.name]: files });
  };



  const handleClose = () => {
    window.location.href = "/";
  };

  if (submitted) return <FormSuccessSecond />;

  return (
    <form className="modal-form service-form" onSubmit={handleSubmit}>

      {config.fields.map((block, index) => {
        if (block.type === "row") {
          return (
            <div className="form-row" key={index}>
              {block.inputs.map((input) => {
                if (input.type === "select") {
                  return (
                    <select
                      key={input.name}
                      name={input.name}
                      value={formData[input.name] || ""}
                      onChange={handleChange}
                      className="form-select"
                      required={input.required}
                    >
                      <option value="" disabled hidden>{t(input.placeholder)}</option>
                      {input.options.map((opt) => (
                        <option key={opt} value={opt}>
                          {t(`${input.translationPrefix}.${opt}`)}
                        </option>
                      ))}
                    </select>
                  );
                }

                if (input.type === "locationSelector") {
                const selectedCountry = formData[`${input.name}_country`];
                const selectedCounty = formData[`${input.name}_county`];

                return (
                  <div className="room-buttons location-mobile" key={input.name}>
                    

                    {/* Выбор: Välismaa / Eesti */}
                    <label className="field-label">{t(input.label)}</label>
                    <div className="button-group">
                      
                      {input.countries.map((country) => (
                        <button
                          type="button"
                          key={country.value}
                          className={`room-btn ${
                            selectedCountry === country.value ? "activeDark" : ""
                          }`}
                          onClick={() =>
                            setFormData({
                              ...formData,
                              [`${input.name}_country`]: country.value,
                              [`${input.name}_county`]: "",
                              [`${input.name}_city`]: ""
                            })
                          }
                        >
                          {t(country.label)}
                        </button>
                      ))}
                    </div>

                    {/* Если выбрана Эстония → показываем maakond */}
                    {selectedCountry === "estonia" && (
                      <div className="county-select">
                        <select
                          name={`${input.name}_county`}
                          value={selectedCounty || ""}
                          onChange={handleChange}
                          className="form-select"
                          required
                        >
                          <option value="" disabled hidden>
                            {t("form.selectCounty")}
                          </option>

                          {input.counties.map((county) => (
                            <option key={county.name} value={county.name}>
                              {t(`form.counties.${county.name}`)}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}

                    {/* Если выбран maakond → показываем города */}
                    {selectedCountry === "estonia" && selectedCounty && (
                      <div className="city-select">
                        <select
                          name={`${input.name}_city`}
                          value={formData[`${input.name}_city`] || ""}
                          onChange={handleChange}
                          className="form-select"
                          required
                        >
                          <option value="" disabled hidden>
                            {t("form.selectCity")}
                          </option>

                          {input.counties
                            .find((c) => c.name === selectedCounty)
                            ?.cities.map((city) => (
                              <option key={city} value={city}>
                                {city}
                              </option>
                            ))}
                        </select>
                      </div>
                    )}
                  </div>
                );
              }


                if (input.type === "buttons") {
                  return (
                    <div className="form-group" key={input.name}>
                        <div className={`room-buttons ${input.name === "wish" ? "wish-mobile" : ""}`}>
                            <label className="field-label">{t(input.label)}</label>
                            <div className="button-group">
                            {input.options.map((opt) => (
                              <button
                                type="button"
                                key={opt}
                                className={`room-btn ${isActive(opt) ? "activeDark" : ""}`}
                                onClick={() => handleRangeSelect(input.name, opt)}
                              >
                                {typeof opt === "number" || opt.includes("+") ? opt : t(opt)}
                              </button>
                            ))}

                            </div>
                        </div>
                    </div>
                  );
                }

                if (input.type === "priceRange") {
                  return (
                    <div className="price-block" key={input.name}>
                      <div className="price-range">
                        <label className="field-label">{t(input.label)}</label>
                        <input type="number" placeholder={t(input.from)} name={`${input.name}_from`} onChange={handleChange}/>
                        <span className="price-separator">–</span>
                        <input type="number" placeholder={t(input.to)} name={`${input.name}_to`} onChange={handleChange}/>
                      </div>
                    </div>
                  );
                }

                if (input.type === "upload") {
                  return (
                    <div className="upload-block" key={input.name}>
                      <span className="upload-button">
                        <span className="upload-label">{t(input.label)}</span>
                        <div className="upload-end">
                          {t(input.button)}
                          <img src={uplSvg} alt="upload" className="upload-icon" />
                          <input type="file" multiple accept="image/*,.pdf" onChange={handleFileUpload}/>
                        </div>
                      </span>
                      <span className="upload-note">{t(input.note)}</span>
                    </div>
                  );
                }

                return (
                  <input
                    key={input.name}
                    type={input.type || "text"}
                    name={input.name}
                    value={formData[input.name] || ""}
                    onChange={handleChange}
                    placeholder={t(input.placeholder)}
                    required={input.required}
                  />
                );
              })}
            </div>
          );
        }

        if (block.type === "loanPeriod") {
          const selectedUnit = formData[`${block.name}_unit`];
        return (
          <div className="form-group" key={block.name}>

            <div className="price-range loan-period-mobile">
              <label className="field-label">{t(block.label)}</label>
              {/* Päeva / kuud / aastat — кнопки */}
              <div className="button-group">
                {block.units.map((unit) => (
                  <button
                    type="button"
                    key={unit}
                    className={`room-btn ${
                      formData[`${block.name}_unit`] === unit ? "activeDark" : ""
                    }`}
                    onClick={() => {
                      const max = getMaxByUnit(unit);
                      setFormData(prev => ({
                        ...prev,
                        [`${block.name}_unit`]: unit,
                        [`${block.name}_value`]: ""
                      }));
                    }}

                  >
                    {t(`form.loanUnits.${unit}`)}
                  </button>
                ))}
              </div>
              <input
                type="number"
                min="1"
                max={getMaxByUnit(selectedUnit)}
                name={`${block.name}_value`}
                value={formData[`${block.name}_value`] || ""}
                onChange={(e) => {
                  if (!selectedUnit) return; // если не выбрана единица — игнорим ввод

                  const max = getMaxByUnit(selectedUnit);
                  const val = Math.min(Number(e.target.value), max);
                  setFormData(prev => ({
                    ...prev,
                    [`${block.name}_value`]: val
                  }));
                }}
                placeholder={selectedUnit ? t(block.placeholderNumber) : t(block.placeholderUnit)}
                className="form-input"
                required
                disabled={!selectedUnit}
              />


              

            </div>
          </div>
        );
      }

        if (block.type === "text") {
          return (
            <p className="upload-note" key={index}>
              {t(block.text)}
            </p>
          );
        }


        if (block.type === "textarea") {
          return (
            <textarea
              key={block.name}
              name={block.name}
              value={formData[block.name] || ""}
              onChange={handleChange}
              placeholder={t(block.placeholder)}
              rows="4"
            />
          );
        }

        if (block.type === "buttons") {
                  return (
                    <div className="form-group" key={block.name}>
                        <div className="room-buttons">
                            <label className="field-label">{t(block.label)}</label>
                            <div className="button-group">
                            {block.options.map((opt) => (
                                <button type="button"
                                  key={opt}
                                  className={`room-btn ${formData[block.name] === opt ? "activeDark" : ""}`}
                                  onClick={() => handleButtonSelect(block.name, opt)}>
                                {typeof opt === "string" ? t(opt) : opt}
                                </button>
                            ))}
                            </div>
                        </div>
                    </div>
                  );
                }

        if (block.type === "upload") {
                    return (
                        <div className="upload-block" key={block.name}>
                        <span className="upload-button">
                            <span className="upload-label">{t(block.label)}</span>
                            <div className="upload-end">
                            {t(block.button)}
                            <img src={uplSvg} alt="upload" className="upload-icon" />
                            <input type="file" multiple accept="image/*,.pdf" />
                            </div>
                        </span>
                        <span className="upload-note">{t(block.note)}</span>
                        </div>
                    );
        }

        return null;
      })}
      <div id="recaptcha-dynamicform" className="g-recaptcha"></div>
      <button type="submit" className="btn btn-solid-orange">
        {t(config.submitLabel)}
      </button>
    </form>
  );
};

export default DynamicForm;

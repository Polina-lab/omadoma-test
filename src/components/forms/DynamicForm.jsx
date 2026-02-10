import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import FormSuccessSecond from "./FormSuccessSecond";
import uplSvg from "../../assets/upload.svg";
import "./Form.css";

const DynamicForm = ({ config }) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("send-mail.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ formData }),
    });

    const result = await response.json();
    console.log("MAIL RESULT:", result);


    if (response.ok) {
      setSubmitted(true);
    } else {
      alert("Ошибка отправки. Попробуйте позже.");
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

  if (submitted) return <FormSuccessSecond onClose={handleClose} />;

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
                  <div className="location-block" key={input.name}>
                    

                    {/* Выбор: Välismaa / Eesti */}
                    <div className="button-group">
                      <label className="field-label">{t(input.label)}</label>
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
                        <div className="room-buttons">
                            <label className="field-label">{t(input.label)}</label>
                            <div className="button-group">
                            {input.options.map((opt) => (
                                <button
                                  type="button"
                                  key={opt}
                                  className={`room-btn ${formData[input.name] === opt ? "activeDark" : ""}`}
                                  onClick={() => handleButtonSelect(input.name, opt)}>
                                {typeof opt === "string" ? t(opt) : opt}
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
        return (
          <div className="form-group" key={block.name}>

            <div className="price-range">
              <label className="field-label">{t(block.label)}</label>
              {/* Число 1–30 — обычный input */}
              <input
                type="number"
                min="1"
                max="30"
                name={`${block.name}_value`}
                value={formData[`${block.name}_value`] || ""}
                onChange={handleChange}
                placeholder={t(block.placeholderNumber)}
                className="form-input"
                required
              />

              {/* Päeva / kuud / aastat — кнопки */}
              <div className="button-group">
                {block.units.map((unit) => (
                  <button
                    type="button"
                    key={unit}
                    className={`room-btn ${
                      formData[`${block.name}_unit`] === unit ? "activeDark" : ""
                    }`}
                    onClick={() =>
                      setFormData({ ...formData, [`${block.name}_unit`]: unit })
                    }
                  >
                    {t(`form.loanUnits.${unit}`)}
                  </button>
                ))}
              </div>

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

      <button type="submit" className="btn btn-solid-orange">
        {t(config.submitLabel)}
      </button>
    </form>
  );
};

export default DynamicForm;

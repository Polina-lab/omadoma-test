import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import FormSuccess from "../FormSuccess";
import uplSvg from "../../assets/upload.svg";
import "./Form.css";

const DynamicForm = ({ config }) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    console.log("Form submitted:", formData);
  };

  const handleClose = () => {
    window.location.href = "/";
  };

  if (submitted) return <FormSuccess onClose={handleClose} />;

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

                if (input.type === "buttons") {
                  return (
                    <div className="form-group" key={input.name}>
                        <div className="room-buttons">
                            <label className="field-label">{t(input.label)}</label>
                            <div className="button-group">
                            {input.options.map((opt) => (
                                <button type="button" key={opt} className="room-btn">
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
                        <input type="number" placeholder={t(input.from)} />
                        <span className="price-separator">–</span>
                        <input type="number" placeholder={t(input.to)} />
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
                          <input type="file" multiple accept="image/*,.pdf" />
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
                                <button type="button" key={opt} className="room-btn">
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

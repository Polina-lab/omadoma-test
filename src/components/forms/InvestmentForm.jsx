import React, { useState } from "react";
import "./Form.css";

const InvestmentForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    propertyType: "",
    message: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Brokerage form submitted:", formData);
    // здесь можно добавить отправку на сервер или email
  };

  return (
    <form className="service-form" onSubmit={handleSubmit}>
      <label>
        Nimi:
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />
      </label>

      <label>
        Email:
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />
      </label>

      <label>
        Telefon:
        <input type="tel" name="phone" value={formData.phone} onChange={handleChange} />
      </label>

      <label>
        Kinnisvara tüüp:
        <input type="text" name="propertyType" value={formData.propertyType} onChange={handleChange} />
      </label>

      <label>
        Lisainfo:
        <textarea name="message" value={formData.message} onChange={handleChange}></textarea>
      </label>

      <button type="submit" className="btn btn-solid-blue">Saada päring</button>
    </form>
  );
};

export default InvestmentForm;

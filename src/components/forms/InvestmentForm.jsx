import React from "react";
import { investmentFormConfig } from "./investment";
import DynamicForm from "./DynamicForm";

const InvestmentForm = () => (
  <div className="service-modal">
    <DynamicForm config={investmentFormConfig} />
  </div>
);

export default InvestmentForm;
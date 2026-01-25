import React from "react";
import { valuationFormConfig } from "./valuation";
import DynamicForm from "./DynamicForm";

const ValuationForm = () => (
  <div className="service-modal">
    <DynamicForm config={valuationFormConfig} />
  </div>
);

export default ValuationForm;
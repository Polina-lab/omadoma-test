import React from "react";
import { financingFormConfig } from "./financing";
import DynamicForm from "./DynamicForm";

const FinancingForm = () => (
  <div className="service-modal">
    <DynamicForm config={financingFormConfig} />
  </div>
);

export default FinancingForm;
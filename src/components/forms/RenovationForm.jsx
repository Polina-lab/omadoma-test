import React from "react";
import { renovationFormConfig } from "./renovation";
import DynamicForm from "./DynamicForm";

const RenovationForm = () => (
  <div className="service-modal">
    <DynamicForm config={renovationFormConfig} />
  </div>
);

export default RenovationForm;
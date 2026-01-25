import React from "react";
import { managementFormConfig } from "./management";
import DynamicForm from "./DynamicForm";

const ManagementForm = () => (
  <div className="service-modal">
    <DynamicForm config={managementFormConfig} />
  </div>
);

export default ManagementForm;
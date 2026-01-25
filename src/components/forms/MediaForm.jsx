import React from "react";
import { mediaFormConfig } from "./media";
import DynamicForm from "./DynamicForm";

const MediaForm = () => (
  <div className="service-modal">
    <DynamicForm config={mediaFormConfig} />
  </div>
);

export default MediaForm ;
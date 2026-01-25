export const managementFormConfig = {
  fields: [
    { type: "row", inputs: [
      { name: "name", placeholder: "form.name", required: true },
      { name: "phone", placeholder: "form.phone", required: true }
    ]},
    { type: "row", inputs: [
      { name: "email", placeholder: "form.email", required: true, type: "email" },
      {
        name: "propertyType",
        placeholder: "form.propertyType",
        required: true,
        type: "select",
        options: [
          "studio", "apartment", "commercial", "office", "service", "food",
          "storage", "production", "house", "housePart", "rowhouse",
          "summerhouse", "land", "parking", "garage"
        ],
        translationPrefix: "form.types"
      }
    ]},
    { type: "row", inputs: [
      { name: "address", placeholder: "form.addressMultiple", required: true },
      { name: "objectCount", placeholder: "form.objectCount", type: "number", required: true }
    ]},
    { type: "row", inputs: [
      { name: "size", placeholder: "form.size", type: "number" },
      {
        name: "condition",
        placeholder: "form.condition",
        type: "select",
        required: true,
        options: [
          "new", "good", "freshFinish", "renovated", "sanitaryDone",
          "average", "sanitaryNeeds", "capitalNeeds"
        ],
        translationPrefix: "form.conditionOptions"
      }
    ]},
    { type: "row", inputs: [
      {
        name: "period",
        type: "select",
        required: true,
        placeholder: "form.servicePeriod",
        options: ["oneTime", "oneYear", "moreThanYear", "agreement"],
        translationPrefix: "form.periodOptions"
      },
      {
      type: "select",
      name: "services",
      placeholder: "form.servicesWanted",
      required: true,
      options: [ "fullManagement", "cleaning", "moving", "utilization", "associationCommunication", "debtCollection", "eviction", "contractExtension", "otherServices" ],
      translationPrefix: "form.servicesOptions"
    }
    ]},
        {
        name: "upload",
        type: "upload",
        label: "form.uploadLabel",
        button: "form.uploadButton",
        note: "form.uploadNote"
      },
    {
      type: "textarea",
      name: "message",
      placeholder: "form.managementDetails"
    }
  ],
  submitLabel: "services.sendRequest"
};

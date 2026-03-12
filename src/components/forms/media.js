export const mediaFormConfig = {
  type: "media",
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
      { name: "address", placeholder: "form.address" },
      { name: "size", placeholder: "form.size", type: "number" }
    ]},
    { type: "row", inputs: [
      {
        name: "rooms",
        type: "buttons",
        label: "form.rooms",
        options: [1, 2, 3, 4, 5, "5+"]
      },
      {
        name: "condition",
        placeholder: "form.condition",
        type: "select",
        options: [
          "new", "good", "freshFinish", "renovated", "sanitaryDone",
          "average", "sanitaryNeeds", "capitalNeeds"
        ],
        translationPrefix: "form.conditionOptions"
      }
    ]},
      {
        name: "wish",
        type: "buttons",
        label: "form.wish",
        options: ["form.profile", "form.dron","form.video"]
      },
    {
      type: "textarea",
      name: "message",
      placeholder: "form.additionalInfo"
    }
  ],
  submitLabel: "services.sendRequest2"
};

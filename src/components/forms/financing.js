export const financingFormConfig = {
  type: "financing",
  intro: "form.intro",
  fields: [
    { type: "row", inputs: [
      { name: "name", placeholder: "form.name", required: true },
      { name: "phone", placeholder: "form.phone", required: true }
    ]},
    { type: "row", inputs: [
      { name: "email", placeholder: "form.email", required: true, type: "email" },
      {
        name: "propertyType",
        placeholder: "form.propertyTypeFinancing",
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
      { name: "address", placeholder: "form.backAddress" },
      {
        name: "loanPurpose",
        placeholder: "form.loanPurpose",
        type: "select",
        options: [
          "realEstate", "car", "business", "renovation", "personal",
          "other"
        ],
        translationPrefix: "form.loanPurposeOptions"
      }
    ]},
    { type: "row", inputs: [
      { name: "size", placeholder: "form.size", type: "number" },
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
    /*
    Laenu periood*: выбрать päeva, kuud, aastat и дальше выбрать число от 1,2,3,4,5... в зависимости от выбранной кнопки, если дни то до 60, если месяцы то до 48, если года то до 30
    */
   {
    type: "loanPeriod",
    name: "loanPeriod",
    label: "form.loanPeriod",
    placeholderNumber: "form.loanPeriodNumber",
    placeholderUnit: "form.loanPeriodUnit",
    units: ["days", "months", "years"]
  },
    { type: "row", inputs: [
      {
        name: "price",
        type: "priceRange",
        label: "form.loanPrice",
        from: "form.priceFrom",
        to: "form.priceTo"
      },
      {
        name: "upload",
        type: "upload",
        label: "form.uploadLabel",
        button: "form.uploadButton",
        note: "form.uploadNote"
      }
    ]},
    {
      type: "textarea",
      name: "message",
      placeholder: "form.additionalInfoFinancig"
    },
    { type: "text", text: "form.financingAfter" }
  ],
  submitLabel: "services.sendRequest"
};

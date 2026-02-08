export const investmentFormConfig = {
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
    { type: "row", inputs: [
      {
        name: "rooms",
        type: "buttons",
        label: "form.rooms",
        options: [1, 2, 3, 4, 5, "form.moreThan5"]
      },
      {
        name: "wish",
        type: "buttons",
        label: "form.wishInvest",
        options: ["form.wishRE", "form.wishBS", "form.wishOther"]
      }
    ]},
    { type: "row", inputs: [
      {
        name: "price",
        type: "priceRange",
        label: "form.beforePrice",
        from: "form.priceFrom",
        to: "form.priceTo"
      },
      {
        name: "upload",
        type: "upload",
        label: "form.desiredPlace",
        button: "form.uploadButton",
        note: "form.uploadNote"
      }
    ]},/*Eelistatud asukoht: [  ] Välismaa, [  ] Eesti >> [Maakond] >> [Linn]*/
    {
      type: "textarea",
      name: "message",
      placeholder: "form.additionalInfo"
    }
  ],
  submitLabel: "services.sendRequest"
};

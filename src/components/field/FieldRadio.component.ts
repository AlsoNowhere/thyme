import { component, element } from "mint";

import { FieldInput } from "./FieldInput.component";

export const FieldRadio = component(
  "div",
  null,
  null,
  element(FieldInput, {
    type: "radio",
    "[name]": "name",
    "[value]": "value",
    "[checked]": "checked",
    "[label]": "label",
    labelBeside: true,
    "[labelClass]": "labelClass",
    "[labelStyles]": "labelStyles",
    "[class]": "inputClass",
    "[fieldStyles]": "fieldStyles",
    "[required]": "required",
    "[readonly]": "readonly",
    "[onInput]": "onInput",
    "[ref]": "ref",
  })
);

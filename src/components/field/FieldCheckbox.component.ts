import { component, element } from "mint";

import { FieldInput, TFieldInput } from "./FieldInput.component";

export type TFieldCheckbox = {
  checked?: boolean;
} & {
  "[checked]"?: string;
};

export const FieldCheckbox = component(
  "div",
  null,
  null,
  element<TFieldInput>(FieldInput, {
    type: "checkbox",
    "[name]": "name",
    "[value]": "value",
    "[checked]": "checked",
    "[label]": "label",
    labelBeside: true,
    "[labelClass]": "labelClass",
    "[class]": "inputClass",
    "[fieldStyles]": "fieldStyles",
    "[required]": "required",
    "[readonly]": "readonly",
    "[onInput]": "onInput",
    "[ref]": "ref",
  })
);

import { component, node } from "mint";

import { FieldInput, TFieldInput } from "./FieldInput.component";

export type TFieldCheckbox = TFieldInput & {
  checked?: boolean;
} & {
  "[checked]"?: string;
};

export const FieldCheckbox = component(
  "div",
  null,
  null,
  node<TFieldInput>(FieldInput, {
    type: "checkbox",
    "[name]": "name",
    "[value]": "value",
    "[checked]": "checked",
    "[label]": "label",
    labelBeside: true,
    "[labelClass]": "labelClass",
    "[class]": "inputClass",
    "[large]": "large",
    "[fieldStyles]": "fieldStyles",
    "[required]": "required",
    "[readonly]": "readonly",
    "[id]": "id",
    "[onInput]": "onInput",
    "[ref]": "ref",
  })
);

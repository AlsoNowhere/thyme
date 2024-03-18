import { MintComponent, MintEvent, component, element, getter } from "mint";

import { FieldRadio } from "./FieldRadio.component";

import { FieldsetOption } from "../../models/FieldsetOption.model";

export type TFieldset = {
  legend?: string;
  options?: Array<FieldsetOption>;
} & {
  "[legend]"?: string;
  "[options]"?: string;
};

class FieldFieldsetComponent extends MintComponent {
  legend?: string;
  options: Array<FieldsetOption>;
  onInput?: MintEvent | null;

  constructor() {
    super();

    this.options = [];
    this.onInput = null;

    getter(this, "hasLegend", function () {
      return !!this.legend;
    });
  }
}

export const FieldFieldset = component("fieldset", FieldFieldsetComponent, {}, [
  element(
    "legend",
    { mIf: "hasLegend", class: "fieldset__legend" },
    "{legend}"
  ),

  element(
    "ul",
    { class: "list flex" },
    element(
      "li",
      { mFor: "options", mKey: "value", class: "margin-right-small" },
      element(FieldRadio, {
        "[name]": "name",
        "[value]": "value",
        "[label]": "label",
        "[labelClass]": "labelClass",
        "[labelStyles]": "labelStyles",
        "[fieldStyles]": "fieldStyles",
        "[class]": "class",
        "[onInput]": "onInput",
      })
    )
  ),
]);

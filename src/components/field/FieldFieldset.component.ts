import {
  MintScope,
  MintEvent,
  component,
  node,
  mIf,
  mFor,
  Resolver,
} from "mint";

import { FieldRadio } from "./FieldRadio.component";

import { FieldsetOption } from "../../models/FieldsetOption.model";

export type TFieldset = {
  legend?: string;
  options?: Array<FieldsetOption>;
} & {
  "[legend]"?: string;
  "[options]"?: string;
};

class FieldFieldsetComponent extends MintScope {
  legend?: string;
  value: string | null;
  fieldValue: Resolver<string | null>;
  options: Array<FieldsetOption>;
  isChecked: Resolver<boolean>;

  onInput?: MintEvent | null;

  constructor() {
    super();

    this.legend = "";
    this.value = null;
    this.options = [];
    this.isChecked = new Resolver(function () {
      return this.value === this.fieldValue;
    });
    this.fieldValue = new Resolver(() => this.value);

    this.onInput = null;
  }
}

export const FieldFieldset = component(
  "fieldset",
  FieldFieldsetComponent,
  { "[id]": "id" },
  [
    node(
      "legend",
      { mIf: mIf("legend"), class: "fieldset__legend" },
      "{legend}"
    ),

    node(
      "ul",
      { class: "list flex" },
      node(
        "li",
        { mFor: mFor("options"), mKey: "value", class: "margin-right-small" },
        node(FieldRadio, {
          "[name]": "name",
          "[value]": "value",
          "[label]": "label",
          "[class]": "class",
          "[labelClass]": "labelClass",
          "[labelStyles]": "labelStyles",
          "[fieldStyles]": "fieldStyles",
          "[checked]": "isChecked",
          "[onInput]": "onInput",
        })
      )
    ),
  ]
);

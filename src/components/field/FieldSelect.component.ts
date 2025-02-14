import {
  MintScope,
  MintEvent,
  component,
  node,
  Resolver,
  mIf,
  mFor,
  mRef,
} from "mint";

import { IFieldOption } from "../../interfaces/IFieldOption.interface";

export type TFieldSelect = {
  name?: string;
  value?: string | number;
  label?: string;
  labelClass?: string;
  labelStyles?: string;
  class?: string;
  fieldStyles?: string;
  required?: true;
  readonly?: true;
  id?: string;
  options?: Array<IFieldOption>;
  onInput?: MintEvent;
} & {
  "[name]"?: string;
  "[value]"?: string;
  "[label]"?: string;
  "[labelClass]"?: string;
  "[labelStyles]"?: string;
  "[class]"?: string;
  "[fieldStyles]"?: string;
  "[required]"?: string;
  "[readonly]"?: string;
  "[id]"?: string;
  "[options]"?: string;
  "[onInput]"?: string;
  "[ref]"?: string;
};

class FieldSelectComponent extends MintScope {
  type: string;
  name: string;
  label?: string;
  class: string;
  fieldStyles?: string;
  required?: true;
  readonly?: string;
  id?: string;
  options: Array<IFieldOption>;
  onInput: MintEvent | null;

  hasLabel: Resolver<boolean>;

  constructor() {
    super();

    this.fieldStyles = "";
    this.options = [];
    this.onInput = null;

    this.hasLabel = new Resolver(function () {
      return !!this.label;
    });
  }
}

export const FieldSelect = component(
  "label",
  FieldSelectComponent,
  { class: "{labelClass} {isRequired}" },
  [
    node("span", { mIf: mIf("hasLabel") }, "{label}"),
    node(
      "select",
      {
        "[name]": "name",
        "[value]": "value",
        "[class]": "class",
        "[style]": "fieldStyles",
        "[required]": "required",
        "[readonly]": "readonly",
        "[id]": "id",
        "(input)": "onInput",
        mRef: mRef("ref"),
      },
      [
        node(
          "option",
          {
            mFor: mFor("options"),
            mKey: "value",
            "[value]": "value",
          },
          "{name}"
        ),
      ]
    ),
  ]
);

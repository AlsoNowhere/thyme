import { MintComponent, MintEvent, component, element, getter } from "mint";

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
  "[options]"?: string;
  "[onInput]"?: string;
  "[ref]"?: string;
};

class FieldSelectComponent extends MintComponent {
  type: string;
  name: string;
  label?: string;
  class: string;
  fieldStyles?: string;
  options: Array<IFieldOption>;
  required: boolean;
  onInput: MintEvent | null;

  constructor() {
    super();

    this.fieldStyles = "";
    this.options = [];
    this.onInput = null;

    getter(this, "hasLabel", function () {
      return !!this.label;
    });
  }
}

export const FieldSelect = component(
  "label",
  FieldSelectComponent,
  { class: "{labelClass} {isRequired}" },
  [
    element("span", { mIf: "hasLabel" }, "{label}"),
    element(
      "select",
      {
        "[name]": "name",
        "[value]": "value",
        "[class]": "class",
        "[style]": "fieldStyles",
        "[required]": "required",
        "(input)": "onInput",
        mRef: "ref",
      },
      [
        element(
          "option",
          {
            mFor: "options",
            mKey: "value",
            "[value]": "value",
          },
          "{name}"
        ),
      ]
    ),
  ]
);

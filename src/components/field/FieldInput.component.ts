import { MintComponent, MintEvent, component, element, getter } from "mint";

import { TInputTypes } from "../../types/TInputTypes.type";

export type TFieldInput = {
  type?: TInputTypes;
  name?: string;
  value?: string | number;
  checked?: boolean;
  label?: string;
  labelBeside?: true;
  labelClass?: string;
  labelStyles?: string;
  class?: string;
  fieldStyles?: string;
  placeholder?: string;
  required?: true;
  readonly?: true;
  onInput?: MintEvent;
} & {
  "[type]"?: string;
  "[name]"?: string;
  "[value]"?: string;
  "[checked]"?: string;
  "[label]"?: string;
  "[labelBeside]"?: string;
  "[labelClass]"?: string;
  "[labelStyles]"?: string;
  "[class]"?: string;
  "[fieldStyles]"?: string;
  "[placeholder]"?: string;
  "[required]"?: string;
  "[readonly]"?: string;
  "[onInput]"?: string;
  "[ref]"?: string;
};

class FieldInputComponent extends MintComponent {
  type: string;
  name: string;
  value?: string;
  label?: string;
  labelBeside?: true;
  labelClass?: string;
  labelStyles?: string;
  class?: string;
  fieldStyles?: string;
  placeholder?: string;
  required?: true;
  onInput: MintEvent | null;

  constructor() {
    super();

    this.type = "text";
    this.fieldStyles = "";
    this.onInput = null;

    getter(this, "isRequired", function () {
      return this.required ? "required" : "";
    });

    getter(this, "hasLabelAbove", function () {
      return !!this.label && !this.labelBeside;
    });

    getter(this, "hasLabelBeside", function () {
      return !!this.label && !!this.labelBeside;
    });
  }
}

export const FieldInput = component(
  "label",
  FieldInputComponent,
  { class: "{labelClass} {isRequired}", "[style]": "labelStyles" },
  [
    element("span", { mIf: "hasLabelAbove" }, "{label}"),
    element("input", {
      "[type]": "type",
      "[name]": "name",
      "[value]": "value",
      "[checked]": "checked",
      "[class]": "class",
      "[placeholder]": "placeholder",
      "[required]": "required",
      "[style]": "fieldStyles",
      "(input)": "onInput",
      mRef: "ref",
    }),
    element("span", { mIf: "hasLabelBeside" }, "{label}"),
  ]
);

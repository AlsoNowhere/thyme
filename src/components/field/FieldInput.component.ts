import {
  MintScope,
  MintEvent,
  component,
  node,
  Resolver,
  mIf,
  mRef,
} from "mint";

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
  large?: boolean;
  fieldStyles?: string;
  placeholder?: string;
  required?: true;
  readonly?: true;
  id?: string;
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
  "[large]"?: string;
  "[fieldStyles]"?: string;
  "[placeholder]"?: string;
  "[required]"?: string;
  "[readonly]"?: string;
  "[id]"?: string;
  "[onInput]"?: string;
  "[ref]"?: string;
};

class FieldInputComponent extends MintScope {
  type: string;
  name: string;
  value?: string;
  label?: string;
  labelBeside?: true;
  labelClass?: string;
  labelStyles?: string;
  class?: string;
  large?: boolean;
  fieldStyles?: string;
  placeholder?: string;
  required?: true;
  readonly?: string;
  id?: string;
  onInput: MintEvent | null;

  _labelClass: Resolver<string>;
  _inputClass: Resolver<string>;
  isRequired: Resolver<string>;
  hasLabelAbove: Resolver<boolean>;
  hasLabelBeside: Resolver<boolean>;

  constructor() {
    super();

    this.type = "text";
    this.fieldStyles = "";
    this.onInput = null;

    this._labelClass = new Resolver(function () {
      return this.labelClass + (this.large ? " large" : "");
    });

    this._inputClass = new Resolver(function () {
      return this.class + (this.large ? " large" : "");
    });

    this.isRequired = new Resolver(function () {
      return this.required ? "required" : "";
    });

    this.hasLabelAbove = new Resolver(function () {
      return !!this.label && !this.labelBeside;
    });

    this.hasLabelBeside = new Resolver(function () {
      return !!this.label && !!this.labelBeside;
    });
  }
}

export const FieldInput = component(
  "label",
  FieldInputComponent,
  { class: "{_labelClass} {isRequired}", "[style]": "labelStyles" },
  [
    node("span", { mIf: mIf("hasLabelAbove") }, "{label}"),
    node("input", {
      "[type]": "type",
      "[name]": "name",
      "[value]": "value",
      "[checked]": "checked",
      "[class]": "_inputClass",
      "[placeholder]": "placeholder",
      "[required]": "required",
      "[readonly]": "readonly",
      "[style]": "fieldStyles",
      "[id]": "id",
      "(input)": "onInput",
      mRef: mRef("ref"),
    }),
    node("span", { mIf: mIf("hasLabelBeside") }, "{label}"),
  ]
);

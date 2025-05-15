import {
  MintScope,
  MintEvent,
  component,
  node,
  Resolver,
  mIf,
  mRef,
  mExtend,
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
  style?: string;
  large?: boolean;
  placeholder?: string;
  required?: true;
  readonly?: true;
  id?: string;
  // onKeyDown?: MintEvent;
  onInput?: MintEvent;
  // onFocus?: MintEvent;
  // onBlur?: MintEvent;
  extendField?: Record<string, string>;
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
  "[style]"?: string;
  "[large]"?: string;
  "[placeholder]"?: string;
  "[required]"?: string;
  "[readonly]"?: string;
  "[id]"?: string;
  // "[onKeyDown]"?: string;
  "[onInput]"?: string;
  // "[onFocus]"?: string;
  // "[onBlur]"?: string;
  "[extendField]"?: "extendField";
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
  style?: string;
  large?: boolean;
  placeholder?: string;
  required?: true;
  readonly?: string;
  id?: string;
  // onKeyDown: MintEvent | null;
  onInput: MintEvent | null;
  // onFocus: MintEvent | null;
  // onBlur: MintEvent | null;

  extendField: Record<string, string>;

  _labelClass: Resolver<string>;
  _inputClass: Resolver<string>;
  isRequired: Resolver<string>;
  hasLabelAbove: Resolver<boolean>;
  hasLabelBeside: Resolver<boolean>;

  constructor() {
    super();

    this.type = "text";
    this.style = "";
    // this.onKeyDown = null;
    this.onInput = null;
    // this.onFocus = null;
    // this.onBlur = null;

    this.extendField = {};

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
      "[style]": "style",
      "[placeholder]": "placeholder",
      "[required]": "required",
      "[readonly]": "readonly",
      "[id]": "id",
      // "(keydown)": "onKeyDown",
      "(input)": "onInput",
      // "(focus)": "onFocus",
      // "(blur)": "onBlur",
      ...mExtend("extendField"),
      ...mRef("ref"),
    }),
    node("span", { mIf: mIf("hasLabelBeside") }, "{label}"),
  ]
);

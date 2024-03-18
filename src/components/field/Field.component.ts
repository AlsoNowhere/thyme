import { MintComponent, MintEvent, component, element, getter } from "mint";

import { FieldInput, TFieldInput } from "./FieldInput.component";
import { FieldCheckbox, TFieldCheckbox } from "./FieldCheckbox.component";
import { FieldRadio } from "./FieldRadio.component";
import { FieldSelect, TFieldSelect } from "./FieldSelect.component";
import { FieldFieldset, TFieldset } from "./FieldFieldset.component";
import { FieldTextarea, TFieldTextarea } from "./FieldTextarea.component";

import { FieldsetOption } from "../../models/FieldsetOption.model";

import { IFieldOption } from "../../interfaces/IFieldOption.interface";

import { TInputTypes } from "../../types/TInputTypes.type";

const passProps: TFieldInput &
  TFieldTextarea &
  TFieldSelect &
  TFieldset &
  TFieldCheckbox = {
  "[type]": "type",
  "[name]": "name",
  "[value]": "value",
  "[checked]": "checked",
  "[label]": "label",
  "[legend]": "legend",
  "[labelBeside]": "labelBeside",
  "[labelClass]": "labelClass",
  "[labelStyles]": "labelStyles",
  "[class]": "inputClass",
  "[fieldStyles]": "fieldStyles",
  "[required]": "required",
  "[readonly]": "readonly",
  "[onInput]": "onInput",
  "[ref]": "ref",
};

type TTypes = TInputTypes | "select" | "textarea" | "fieldset";

export type TField = {
  type?: TTypes;
  name?: string;
  value?: string;
  checked?: boolean;
  label?: string;
  legend?: string;
  labelBeside?: string;
  labelClass?: string;
  labelStyles?: string;
  placeholder?: string;
  class?: string;
  wrapperClasses?: string;
  fieldStyles?: string;
  required?: true;
  readonly?: true;
  options?: Array<IFieldOption | FieldsetOption>;
  onInput?: MintEvent<
    HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
  >;
  ref?: string;
} & {
  "[type]"?: string;
  "[name]"?: string;
  "[value]"?: string;
  "[checked]"?: string;
  "[label]"?: string;
  "[legend]"?: string;
  "[labelBeside]"?: string;
  "[labelClass]"?: string;
  "[labelStyles]"?: string;
  "[placeholder]"?: string;
  "[class]"?: string;
  "[wrapperClasses]"?: string;
  "[fieldStyles]"?: string;
  "[required]"?: string;
  "[readonly]"?: string;
  "[options]"?: string;
  "[onInput]"?: string;
};

class FieldComponent extends MintComponent {
  type?: TTypes;
  name: string;
  value?: string | number;
  label?: string;
  labelClass?: string;
  labelStyles?: string;
  class?: string;
  fieldStyles?: string;
  required?: true;
  readonly?: true;
  options?: Array<IFieldOption | FieldsetOption>;
  onInput?: MintEvent | null;
  ref?: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | null;

  constructor() {
    super();

    this.type = "text";
    this.class = "";
    this.fieldStyles = undefined;
    this.onInput = null;
    this.ref = null;

    getter(this, "isInput", function () {
      const inValidTypes = [
        "textarea",
        "select",
        "checkbox",
        "radio",
        "fieldset",
      ];
      return !inValidTypes.includes(this.type);
    });

    getter(this, "isCheckbox", function () {
      return this.type === "checkbox";
    });

    getter(this, "isRadio", function () {
      return this.type === "radio";
    });

    getter(this, "isFieldSet", function () {
      return this.type === "fieldset";
    });

    getter(this, "isSelect", function () {
      return this.type === "select";
    });

    getter(this, "isTextarea", function () {
      return this.type === "textarea";
    });
  }
}

export const Field = component(
  "div",
  FieldComponent,
  { "[class]": "wrapperClasses" },
  [
    element<TFieldInput>(FieldInput, {
      mIf: "isInput",
      ...passProps,
    }),

    element<TFieldInput>(FieldCheckbox, {
      mIf: "isCheckbox",
      ...passProps,
    }),

    element<TFieldInput>(FieldRadio, {
      mIf: "isRadio",
      ...passProps,
    }),

    element(FieldFieldset, {
      mIf: "isFieldSet",
      ...passProps,
      "[options]": "options",
    }),

    element<TFieldTextarea>(FieldTextarea, {
      mIf: "isTextarea",
      ...passProps,
      "[resize]": "resize",
    }),

    element<TFieldSelect>(FieldSelect, {
      mIf: "isSelect",
      ...passProps,
      "[options]": "options",
    }),
  ]
);

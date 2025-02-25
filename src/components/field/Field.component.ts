import {
  MintScope,
  MintEvent,
  component,
  node,
  Resolver,
  mIf,
  UpwardRef,
} from "mint";

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
  "[class]": "class",
  "[style]": "style",
  "[large]": "large",
  "[required]": "required",
  "[readonly]": "readonly",
  "[id]": "id",
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
  style?: string;
  large?: boolean;
  wrapperClasses?: string;
  required?: true;
  readonly?: true;
  id?: string;
  options?: Array<IFieldOption | FieldsetOption>;
  onInput?: MintEvent<
    HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
  >;
  ref?: UpwardRef<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>;
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
  "[style]"?: string;
  "[large]"?: string;
  "[wrapperClasses]"?: string;
  "[required]"?: string;
  "[readonly]"?: string;
  "[id]"?: string;
  "[options]"?: string;
  "[onInput]"?: string;
  "[ref]"?: string;
};

class FieldComponent extends MintScope {
  type?: TTypes;
  name: string;
  value?: string | number;
  label?: string;
  labelClass?: string;
  labelStyles?: string;
  class?: string;
  style?: string;
  large?: boolean;
  required?: true;
  readonly?: true;
  id?: string;
  options?: Array<IFieldOption | FieldsetOption>;
  onInput?: MintEvent<
    HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
  > | null;
  ref?: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | null;

  isInput: Resolver<boolean>;
  isCheckbox: Resolver<boolean>;
  isRadio: Resolver<boolean>;
  isFieldSet: Resolver<boolean>;
  isSelect: Resolver<boolean>;
  isTextarea: Resolver<boolean>;

  constructor() {
    super();

    this.type = "text";
    this.class = "";
    this.style = undefined;
    this.onInput = null;
    this.ref = null;

    this.isInput = new Resolver(function () {
      const inValidTypes = [
        "textarea",
        "select",
        "checkbox",
        "radio",
        "fieldset",
      ];
      return !inValidTypes.includes(this.type);
    });

    this.isCheckbox = new Resolver(function () {
      return this.type === "checkbox";
    });

    this.isRadio = new Resolver(function () {
      return this.type === "radio";
    });

    this.isFieldSet = new Resolver(function () {
      return this.type === "fieldset";
    });

    this.isSelect = new Resolver(function () {
      return this.type === "select";
    });

    this.isTextarea = new Resolver(function () {
      return this.type === "textarea";
    });
  }
}

export const Field = component(
  "<>",
  FieldComponent,
  { "[class]": "wrapperClasses" },
  [
    node<TFieldInput>(FieldInput, {
      mIf: mIf("isInput"),
      ...passProps,
    }),

    node<TFieldCheckbox>(FieldCheckbox, {
      mIf: mIf("isCheckbox"),
      ...passProps,
    }),

    node<TFieldInput>(FieldRadio, {
      mIf: mIf("isRadio"),
      ...passProps,
    }),

    node(FieldFieldset, {
      mIf: mIf("isFieldSet"),
      ...passProps,
      "[options]": "options",
    }),

    node<TFieldTextarea>(FieldTextarea, {
      mIf: mIf("isTextarea"),
      ...passProps,
      "[resize]": "resize",
    }),

    node<TFieldSelect>(FieldSelect, {
      mIf: mIf("isSelect"),
      ...passProps,
      "[options]": "options",
    }),
  ]
);

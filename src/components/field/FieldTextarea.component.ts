import {
  MintScope,
  MintEvent,
  component,
  node,
  Resolver,
  mIf,
  mRef,
  UpwardRef,
  mExtend,
} from "mint";

export type TFieldTextarea = {
  name?: string;
  value?: string | number;
  label?: string;
  labelClass?: string;
  labelStyles?: string;
  class?: string;
  style?: string;
  placeholder?: string;
  required?: true;
  readonly?: true;
  resize?: true;
  id?: string;
  onInput?: MintEvent;
  ref?: UpwardRef<HTMLTextAreaElement>;
} & {
  "[name]"?: string;
  "[value]"?: string;
  "[label]"?: string;
  "[labelClass]"?: string;
  "[labelStyles]"?: string;
  "[class]"?: string;
  "[style]"?: string;
  "[placeholder]"?: string;
  "[required]"?: string;
  "[readonly]"?: string;
  "[resize]"?: string;
  "[id]"?: string;
  "[onInput]"?: string;
  "[ref]"?: string;
};

class FieldTextareaComponent extends MintScope {
  name: string;
  label?: string;
  value: string;
  labelClass?: string;
  class: string;
  style?: string;
  placeholder?: string;
  required: boolean;
  readonly?: true;
  resize?: boolean;
  id?: string;

  hasLabel: Resolver<boolean>;
  getStyles: Resolver<string>;
  getReadonly: Resolver<string | undefined>;

  onInput: MintEvent | null;

  ref?: UpwardRef<HTMLTextAreaElement>;

  constructor() {
    super();

    this.resize = false;
    this.style = "";
    this.onInput = null;

    this.hasLabel = new Resolver(function () {
      return !!this.label;
    });

    this.getStyles = new Resolver(function () {
      return (this.resize ? "" : "resize: none; ") + this.style;
    });

    this.getReadonly = new Resolver(function () {
      return this.readonly ? "true" : undefined;
    });
  }
}

export const FieldTextarea = component(
  "label",
  FieldTextareaComponent,
  { class: "{labelClass} {isRequired}" },
  [
    node("span", { mIf: mIf("hasLabel") }, "{label}"),
    node("textarea", {
      "[name]": "name",
      "[value]": "value",
      "[class]": "class",
      "[placeholder]": "placeholder",
      "[style]": "getStyles",
      "[readonly]": "getReadonly",
      "[id]": "id",
      "(input)": "onInput",
      ...mExtend("extendField"),
      mRef: mRef("ref"),
    }),
  ]
);

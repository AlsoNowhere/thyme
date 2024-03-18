import { MintComponent, MintEvent, component, element, getter } from "mint";

export type TFieldTextarea = {
  name?: string;
  value?: string | number;
  label?: string;
  labelClass?: string;
  labelStyles?: string;
  class?: string;
  fieldStyles?: string;
  placeholder?: string;
  required?: true;
  readonly?: true;
  resize?: true;
  onInput?: MintEvent;
} & {
  "[name]"?: string;
  "[value]"?: string;
  "[label]"?: string;
  "[labelClass]"?: string;
  "[labelStyles]"?: string;
  "[class]"?: string;
  "[fieldStyles]"?: string;
  "[placeholder]"?: string;
  "[required]"?: string;
  "[readonly]"?: string;
  "[resize]"?: string;
  "[onInput]"?: string;
  "[ref]"?: string;
};

class FieldTextareaComponent extends MintComponent {
  name: string;
  label?: string;
  value: string;
  labelClass?: string;
  class: string;
  fieldStyles?: string;
  placeholder?: string;
  required: boolean;
  readonly?: true;
  resize?: boolean;
  onInput: MintEvent | null;

  constructor() {
    super();

    this.resize = false;
    this.fieldStyles = "";
    this.onInput = null;

    getter(this, "hasLabel", function () {
      return !!this.label;
    });

    getter(this, "getStyles", function () {
      return this.resize ? "" : "resize: none;" + this.fieldStyles;
    });

    getter(this, "getReadonly", function () {
      return this.readonly ? "true" : undefined;
    });
  }
}

export const FieldTextarea = component(
  "label",
  FieldTextareaComponent,
  { class: "{labelClass} {isRequired}" },
  [
    element("span", { mIf: "hasLabel" }, "{label}"),
    element("textarea", {
      "[name]": "name",
      "[value]": "value",
      "[class]": "class",
      "[placeholder]": "placeholder",
      "[style]": "getStyles",
      "[readonly]": "getReadonly",
      "(input)": "onInput",
      mRef: "ref",
    }),
  ]
);

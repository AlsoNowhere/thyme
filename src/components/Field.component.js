import { component, element, getter } from "mint";

const common = {
  "[type]": "type",
  "[name]": "name",
  "[class]": "class",
  "[value]": "value",
  "[data-id]": "dataId",
  "[required]": "required",
};

const fProps = {
  ...common,
  "(input)": "onInput",
  "m-ref": "ref",
};

const passProps = {
  ...common,
  "[label]": "label",
  "[fieldStyles]": "fieldStyles",
  "[onInput]": "onInput",
  "[ref]": "ref",
};

const Input = component("label", function () {}, { "[style]": "fieldStyles" }, [
  element("span", null, "{label}"),
  element("input", { ...fProps }),
]);

const Checkbox = component(
  "label",
  function () {},
  { "[style]": "fieldStyles" },
  [element("input", { ...fProps }), element("span", null, "{label}")]
);

const Radio = component("label", function () {}, { "[style]": "fieldStyles" }, [
  element("input", { ...fProps }),
  element("span", null, "{label}"),
]);

const Select = component(
  "label",
  function () {},
  { "[style]": "fieldStyles" },
  [element("span", null, "{label}"), element("select", { ...fProps })]
);

const Textarea = component(
  "label",
  function () {},
  { "[style]": "fieldStyles" },
  [element("span", null, "{label}"), element("textarea", { ...fProps })]
);

export const Field = component(
  "div",
  function FieldComponent() {
    this.type = "text";
    this.class = undefined;
    this.value = null;
    this.dataId = undefined;
    this.fieldStyles = undefined;
    this.required = false;
    this.onInput = null;
    this.ref = null;

    getter(this, "isInput", function () {
      const inValidTypes = ["textarea", "select", "checkbox", "radio"];
      return !inValidTypes.includes(this.type);
    });

    getter(this, "isCheckbox", function () {
      return this.type === "checkbox";
    });

    getter(this, "isRadio", function () {
      return this.type === "radio";
    });

    getter(this, "isSelect", function () {
      return this.type === "select";
    });

    getter(this, "isTextArea", function () {
      return this.type === "textarea";
    });
  },
  { class: "relative" },
  [
    element(Input, {
      "m-if": "isInput",
      ...passProps,
    }),

    element(Checkbox, {
      "m-if": "isCheckbox",
      ...passProps,
    }),

    element(Radio, {
      "m-if": "isRadio",
      ...passProps,
    }),

    element(Select, {
      "m-if": "isSelect",
      ...passProps,
    }),

    element(Textarea, {
      "m-if": "isTextArea",
      ...passProps,
    }),
  ]
);

import { MintComponent, component, element, getter, template } from "mint";

import { TThemes } from "../types/TThemes.type";

class ButtonComponent extends MintComponent {
  type?: "button" | "submit";
  theme: TThemes;
  icon?: string;
  label?: string;
  title: string;
  class: string;
  square?: true;
  large?: true;
  extraButtonLabel?: () => string;
  onClick: (() => void) | null;

  constructor() {
    super();

    this.type = "button";
    this.theme = "snow";
    this.class = "";
    this.onClick = null;

    getter(this, "classes", function () {
      if (this.hasExtraButtonLabel) return `${this.class} multi-content`;
      return this.class;
    });

    getter(this, "hasIcon", function () {
      return this.icon !== undefined;
    });

    getter(this, "hasLabel", function () {
      return this.label !== undefined;
    });

    getter(this, "isSquare", function () {
      return this.square ? "square" : "";
    });

    getter(this, "isLarge", function () {
      return this.large ? "large" : "";
    });

    getter(this, "hasExtraButtonLabel", function () {
      return (
        this.extraButtonLabel !== null && this.extraButtonLabel !== undefined
      );
    });

    getter(this, "getExtraButtonLabel", function () {
      return this.extraButtonLabel();
    });
  }
}

export const Button = component(
  "button",
  ButtonComponent,
  {
    "[type]": "type",
    class: "{theme} {classes} {isSquare} {isLarge}",
    "[title]": "title",
    "(click)": "onClick",
  },
  [
    element("span", { mIf: "hasIcon", class: "icon fa fa-{icon}" }),
    element("span", { mIf: "hasLabel", class: "label" }, "{label}"),
    element(
      "span",
      { mIf: "hasExtraButtonLabel", class: "extra-content" },
      template("getExtraButtonLabel")
    ),
  ]
);

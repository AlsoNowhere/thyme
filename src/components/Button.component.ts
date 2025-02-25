import {
  MintScope,
  MintEvent,
  component,
  node,
  Resolver,
  template,
  mIf,
  TMintContent,
  mRef,
} from "mint";

import { TThemes } from "../types/TThemes.type";

type TTypes = "submit" | "button";

export type TButton = {
  type?: TTypes;
  label?: string;
  theme?: TThemes | "empty";
  icon?: string;
  class?: string;
  style?: string;
  onClick?: MintEvent<HTMLButtonElement>;
  ref?: null;
} & {
  "[type]"?: string;
  "[label]"?: string;
  "[theme]"?: string;
  "[icon]"?: string;
  "[class]"?: string;
  "[style]"?: string;
  "[onClick]"?: string;
  "[ref]"?: string;
};

class ButtonComponent extends MintScope {
  type?: "button" | "submit";
  theme: TThemes;
  icon?: string;
  label?: string;
  title: string;
  class: string;
  style: string;
  id?: undefined;
  square?: true;
  large?: true;
  classes: Resolver<string>;
  hasIcon: Resolver<boolean>;
  hasLabel: Resolver<boolean>;
  isSquare: Resolver<string>;
  isLarge: Resolver<string>;
  hasExtraButtonLabel: Resolver<boolean>;
  getExtraButtonLabel: () => TMintContent;
  extraButtonLabel?: () => string;
  onClick: (() => void) | null;

  constructor() {
    super();

    this.type = "button";
    this.theme = "snow";
    this.class = "";
    this.style = undefined;
    this.id = undefined;
    this.onClick = null;

    this.classes = new Resolver(function () {
      if (this.hasExtraButtonLabel) return `${this.class} multi-content`;
      return this.class;
    });

    this.hasIcon = new Resolver(function () {
      return this.icon !== undefined;
    });

    this.hasLabel = new Resolver(function () {
      return this.label !== undefined;
    });

    this.isSquare = new Resolver(function () {
      return this.square ? "square" : "";
    });

    this.isLarge = new Resolver(function () {
      return this.large ? "large" : "";
    });

    this.hasExtraButtonLabel = new Resolver(function () {
      return (
        this.extraButtonLabel !== null && this.extraButtonLabel !== undefined
      );
    });

    this.getExtraButtonLabel = function () {
      return this.extraButtonLabel;
    };
  }
}

export const Button = component(
  "button",
  ButtonComponent,
  {
    "[type]": "type",
    class: "{theme} {classes} {isSquare} {isLarge}",
    "[style]": "style",
    "[title]": "title",
    "[id]": "id",
    "(click)": "onClick",
    mRef: mRef("ref"),
  },
  [
    node("<>", { ...mIf("!_children") }, [
      node("span", { mIf: mIf("hasIcon"), class: "icon fa fa-{icon}" }),
      node("span", { mIf: mIf("hasLabel"), class: "label" }, "{label}"),
      node(
        "span",
        { mIf: mIf("hasExtraButtonLabel"), class: "extra-content" },
        node(template("getExtraButtonLabel"))
      ),
    ]),
    node("<>", { ...mIf("_children") }, "_children"),
  ]
);

import { component, mFor, mIf, MintScope, node, refresh } from "mint";

import { Button } from "./Button.component";

class ColourSelectorComponent extends MintScope {
  onInput: () => void;
  colourSelectorScope: ColourSelectorComponent;
  showColours: boolean;
  colours: Array<string>;
  toggleShowColours: () => void;
  chooseColour: () => void;

  constructor() {
    super();

    this.onInput = null;

    this.colourSelectorScope = this;

    this.showColours = false;

    this.colours = [
      "black",
      "green",
      "lightgreen",
      "blue",
      "lightblue",
      "grey",
      "lightgrey",
      "#444",
      "pink",
      "teal",
      "aqua",
      "red",
      "tomato",
      "purple",
    ];

    this.toggleShowColours = function () {
      console.log("Click: ", this.colourSelectorScope.showColours);
      this.colourSelectorScope.showColours =
        !this.colourSelectorScope.showColours;
      refresh(this.colourSelectorScope);
    };

    this.chooseColour = function () {
      this.onInput?.(this._x);
      this.colourSelectorScope.showColours = false;
      refresh(this.colourSelectorScope);
    };
  }
}

export const ColourSelector = component(
  "div",
  ColourSelectorComponent,
  { class: "relative z-index" },
  [
    node(Button, {
      "[large]": "large",
      square: true,
      content: node("span", null, "C"),
      "[colourSelectorScope]": "colourSelectorScope",
      "[onClick]": "toggleShowColours",
    }),

    node(
      "ul",
      {
        ...mIf("showColours"),
        class: "list flex absolute left-gap",
        style: "top: 2rem; width: 100px;",
      },
      node("li", {
        ...mFor("colours"),
        mKey: "_i",
        class: "width height snow-border pointer",
        style: "background-color: {_x};",
        "(click)": "chooseColour",
      })
    ),
  ]
);

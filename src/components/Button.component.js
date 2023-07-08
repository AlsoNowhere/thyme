import { component, element, getter } from "mint";

export const Button = component(
  "button",
  function ButtonComponent() {
    this.type = "button";
    this.class = "";
    this.icon = null;
    this.label = null;
    this.title = undefined;
    this.disabled = false;
    this.onClick = null;
    this.onMouseDown = null;
    this.onMouseUp = null;

    getter(this, "hasIcon", function () {
      return this.icon !== null;
    });

    getter(this, "hasLabel", function () {
      return this.label !== null;
    });
  },
  {
    "[type]": "type",
    class: "{class}",
    "[title]": "title",
    "[disabled]": "disabled",
    "(click)": "onClick",
    "(mousedown)": "onMouseDown",
    "(mouseup)": "onMouseUp",
  },
  [
    element("span", { "m-if": "hasIcon", class: "icon fa fa-{icon}" }),
    element(
      "span",
      { "m-if": "hasLabel", class: "label" },
      element("span", null, "{label}")
    ),
  ]
);

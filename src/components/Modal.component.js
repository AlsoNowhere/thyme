import { component, element, getter, refresh } from "mint";

export const Modal = component(
  "article",
  function ModalComponent() {
    this.type = "standard";
    this.header = undefined;
    this.theme = "";
    this.active = false;
    this.state = "";

    getter(this, "hasHeader", function () {
      return this.header !== undefined;
    });

    this.oneach = function () {
      if (!!this.active && this.state === "") {
        this.state = "open";
      } else if (!this.active && this.state === "open") {
        this.state = "open closing";
        setTimeout(() => {
          this.state = "";
          refresh(this);
        }, 500);
      }
    };
  },
  { class: "modal modal--{type} {state}" },
  element("div", { class: "modal__content" }, [
    element(
      "header",
      { "m-if": "hasHeader", class: "modal__header {theme}" },
      "{header}"
    ),
    "_children",
  ])
);

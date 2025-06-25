import { MintScope, MintEvent, Store, component, node, Resolver, mIf } from "mint";

import { closeModal } from "../services/close-mdoal.service";

import { TModalState } from "../types/TModalState.type";
import { TThemes } from "../types/TThemes.type";

export type TModal = {
  state?: TModalState;
  title?: string;
  theme?: TThemes;
  class?: string;
  closeOnBackgroundClick?: true;
  storeTarget?: string;
} & {
  "[state]"?: string;
  "[title]"?: string;
  "[theme]"?: string;
  "[class]"?: string;
  "[closeOnBackgroundClick]"?: string;
  "[storeTarget]"?: string;
};

class ModalComponent extends MintScope {
  state: TModalState;
  title?: string;
  theme?: TThemes;
  class?: string;
  style?: string;
  closeOnBackgroundClick?: true;

  hasTitle: Resolver<boolean>;

  clickOnBackground: MintEvent;

  clickOnContent: MintEvent;

  constructor() {
    super();

    this.state = "";
    this.theme = "smoke";
    this.class = "";
    this.style = "";

    this.hasTitle = new Resolver(function () {
      return this.title !== undefined;
    });

    this.clickOnBackground = function () {
      if (this.closeOnBackgroundClick instanceof Function) {
        this.closeOnBackgroundClick();
      }
      // if (!(this.closeOnBackgroundClick instanceof Function)) return;
      // if (this._store instanceof Store && typeof this.storeTarget === "string") {
      //   closeModal(this._store, this.storeTarget);
      // } else {
      //   closeModal(this, "state");
      // }
    };

    this.clickOnContent = function (event) {
      if (this.closeOnBackgroundClick instanceof Function) {
        event.stopPropagation();
      }
    };
  }
}

export const Modal = component(
  "article",
  ModalComponent,
  { class: "modal {state}", "(click)": "clickOnBackground" },
  node("div", { class: "modal__content {class}", "[style]": "style", "(click)": "clickOnContent" }, [
    node("header", { mIf: mIf("hasTitle"), class: "modal__header {theme}" }, node("h2", null, "{title}")),
    "_children"
  ])
);

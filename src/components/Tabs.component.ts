import {
  component,
  mFor,
  mIf,
  MintScope,
  mRef,
  node,
  refresh,
  Resolver,
  template,
  TMintContent,
} from "mint";

import { Tab } from "../models/Tab.model";

export type TTabs = {
  tabs?: Array<Tab>;
  currentTab?: Tab;
  onSelectTab?: () => void;
  ref?: null;
} & {
  "[tabs]"?: string;
  "[currentTab]"?: string;
  "[onSelectTab]"?: string;
  "[ref]"?: string;
};

class TabsComponent extends MintScope {
  tabs: Array<Tab>;
  currentTab: Tab;
  currentTemplate: Resolver<() => TMintContent>;
  tabSelected: Resolver<boolean>;
  activeTab: Resolver<string>;
  selectTab: () => void;
  onSelectTab?: () => void;

  constructor() {
    super();

    const scope = this;
    this.tabs = [];
    this.currentTab = null;

    this.currentTemplate = new Resolver(function () {
      return this.currentTab.template;
    });

    this.tabSelected = new Resolver(function () {
      return this.currentTab !== null;
    });

    this.activeTab = new Resolver(function () {
      return this._x === this.currentTab ? "active" : "";
    });

    this.onpreblueprint = function () {
      if (this.tabs.length === 0) return;
      if (this.currentTab !== null) return;
      this.currentTab = this.tabs[0];
    };

    this.selectTab = function () {
      console.log("Scope: ", scope);
      scope.currentTab = this._x;
      scope.onSelectTab?.();
      refresh(scope);
    };
  }
}

export const Tabs = component(
  "div",
  TabsComponent,
  { class: "tabs", mRef: mRef("ref") },
  [
    node(
      "ul",
      { class: "tabs__list" },
      node(
        "li",
        {
          mFor: mFor("tabs"),
          mKey: "name",
          class: "tabs__list-item {activeTab}",
          "(click)": "selectTab",
        },
        node("div", null, "{name}")
      )
    ),
    node(
      "div",
      { mIf: mIf("tabSelected"), class: "tabs__body" },
      node(template({ onevery: true }, "currentTemplate"))
    ),
  ]
);

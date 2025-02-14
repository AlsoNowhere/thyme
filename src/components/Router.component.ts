import { component, MintScope, node, template, TMintContent } from "mint";

import {
  contains,
  containsAndHyphen,
  ends,
  exact,
  hasWord,
  starts,
} from "../logic/router.logic";

import { IRoute } from "../interfaces/IRoute.interface";

import { RouteType } from "../enums/RouteType.enum";

// import { Route } from "../models/Route.model";

export type TRouter = {
  routes: Array<IRoute>;
  onDefine?: (scope: MintScope) => void;
} & {
  "[routes]"?: string;
  "[onDefine]"?: string;
};

const logic: Record<RouteType, (target: string, hash: string) => boolean> = {
  [RouteType.exact]: exact,
  [RouteType["="]]: exact,

  [RouteType.contains]: contains,
  [RouteType["*"]]: contains,

  [RouteType.hasWord]: hasWord,
  [RouteType["~"]]: hasWord,

  [RouteType.containsAndHyphen]: containsAndHyphen,
  [RouteType["|"]]: containsAndHyphen,

  [RouteType.starts]: starts,
  [RouteType["^"]]: starts,

  [RouteType.ends]: ends,
  [RouteType["$"]]: ends,
};

class RouterComponent extends MintScope {
  routes: Array<IRoute>;
  onDefine?: (scope: MintScope) => void;
  router: () => TMintContent;

  constructor() {
    super();

    this.routes = [];

    this.oninit = function () {
      this.onDefine?.(this);
    };

    this.router = function () {
      const routes = (this as RouterComponent).routes;
      const hash = window.location.hash.replace("#", "").replace(/%20/g, " ");

      {
        let i = 0;
        while (i < routes.length) {
          const route = routes[i];

          if (logic[route.type](route.target, hash)) return route.content;
          i++;
        }
      }

      return [];
    };
  }
}
export const Router = component("<>", RouterComponent, {}, [
  node(template("router")),
]);

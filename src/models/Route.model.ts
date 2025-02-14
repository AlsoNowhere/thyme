import { TMintContent } from "mint";

import { IRoute } from "../interfaces/IRoute.interface";

import { RouteType } from "../enums/RouteType.enum";

type TOptions = {
  target: string;
  type: RouteType;
};

export class Route implements IRoute {
  target: string;
  type: RouteType;
  content: TMintContent;

  constructor(targetOrOptions: string | TOptions, content: TMintContent) {
    if (typeof targetOrOptions === "string") {
      this.target = targetOrOptions;
      this.type = RouteType.exact;
    } else {
      this.target = targetOrOptions.target;
      this.type = targetOrOptions.type;
    }
    this.content = content;
  }
}

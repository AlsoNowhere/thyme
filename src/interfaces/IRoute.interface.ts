import { TMintContent } from "mint";

import { RouteType } from "../enums/RouteType.enum";

export interface IRoute {
  target: string;
  type: RouteType;
  content: TMintContent;
}

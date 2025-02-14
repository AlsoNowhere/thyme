import { TMintContent } from "mint";
import { IRoute } from "../interfaces/IRoute.interface";
import { RouteType } from "../enums/RouteType.enum";
type TOptions = {
    target: string;
    type: RouteType;
};
export declare class Route implements IRoute {
    target: string;
    type: RouteType;
    content: TMintContent;
    constructor(targetOrOptions: string | TOptions, content: TMintContent);
}
export {};

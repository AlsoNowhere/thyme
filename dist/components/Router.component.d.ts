import { MintScope } from "mint";
import { IRoute } from "../interfaces/IRoute.interface";
export type TRouter = {
    routes: Array<IRoute>;
    onDefine?: (scope: MintScope) => void;
} & {
    "[routes]"?: string;
    "[onDefine]"?: string;
};
export declare const Router: import("mint").MintComponent;

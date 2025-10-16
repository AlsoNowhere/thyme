import { Route } from "../models/Route.model";
export declare const exact: (target: string, hash: string) => boolean;
export declare const contains: (target: string, hash: string) => boolean;
export declare const hasWord: (target: string, hash: string) => boolean;
export declare const containsAndHyphen: (target: string, hash: string) => boolean;
export declare const starts: (target: string, hash: string) => boolean;
export declare const ends: (target: string, hash: string) => boolean;
export declare const baseLogic: (route: Route, hash: string) => import("mint").TMintContent;

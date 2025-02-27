import { MintEvent, TMintContent } from "mint";
import { TThemes } from "../types/TThemes.type";
type TTypes = "submit" | "button";
export type TButton = {
    type?: TTypes;
    label?: string;
    theme?: TThemes | "empty";
    icon?: string;
    class?: string;
    style?: string;
    content?: TMintContent;
    onClick?: MintEvent<HTMLButtonElement>;
    ref?: null;
} & {
    "[type]"?: string;
    "[label]"?: string;
    "[theme]"?: string;
    "[icon]"?: string;
    "[class]"?: string;
    "[style]"?: string;
    "[content]"?: string;
    "[onClick]"?: string;
    "[ref]"?: string;
};
export declare const Button: import("mint").MintComponent;
export {};

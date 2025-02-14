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
export declare const Modal: import("mint").MintComponent;

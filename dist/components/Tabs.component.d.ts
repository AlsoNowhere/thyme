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
export declare const Tabs: import("mint").MintComponent;

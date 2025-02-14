import { TMintContent } from "mint";
export declare class Tab {
    name: string;
    template: () => TMintContent;
    constructor(name: string, template: () => TMintContent);
}

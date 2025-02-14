import { FieldsetOption } from "../../models/FieldsetOption.model";
export type TFieldset = {
    legend?: string;
    options?: Array<FieldsetOption>;
} & {
    "[legend]"?: string;
    "[options]"?: string;
};
export declare const FieldFieldset: import("mint").MintComponent;

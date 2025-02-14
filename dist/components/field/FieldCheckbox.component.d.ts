import { TFieldInput } from "./FieldInput.component";
export type TFieldCheckbox = TFieldInput & {
    checked?: boolean;
} & {
    "[checked]"?: string;
};
export declare const FieldCheckbox: import("mint").MintComponent;

import { InputType } from "../enums/input-types.enum";

export interface IFieldOption {
  name: string;
  value: string;
  enum: InputType;
}

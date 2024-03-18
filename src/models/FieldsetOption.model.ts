export class FieldsetOption {
  value: string;
  label?: string;
  classes?: string;

  constructor({
    value,
    label = value,
    classes,
  }: {
    value: string;
    label?: string;
    classes?: string;
  }) {
    this.value = value;
    this.label = label;
    this.classes = classes;
  }
}

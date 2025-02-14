import { TMintContent } from "mint";

export class Tab {
  name: string;
  template: () => TMintContent;

  constructor(name: string, template: () => TMintContent) {
    this.name = name;
    this.template = template;
  }
}

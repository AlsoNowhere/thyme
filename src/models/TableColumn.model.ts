import { Resolver } from "mint";

export class TableColumn {
  name: string;
  title: string;
  id: string;

  constructor(name: string, title = name, id = name) {
    this.name = name;
    this.title = title;
    this.id = id;
  }
}

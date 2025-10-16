import { component, mFor, MintScope, node } from "mint";

import { TableColumn } from "../models/TableColumn.model";
import { TableRow } from "../models/TableRow.model";

class TableComponent extends MintScope {
  columns: Array<TableColumn>;
  rows: Array<TableRow>;

  constructor() {
    super();

    this.columns = [];
    this.rows = [];
  }
}

export const Table = component("table", TableComponent, { class: "table" }, [
  node("thead", null, node("tr", null, node("th", { ...mFor("columns"), mKey: "id" }, "{title}"))),
  node(
    "tbody",
    null,
    node("tr", { ...mFor("rows"), mKey: "id" }, node("td", { ...mFor("columns"), mKey: "id" }, "{cell}")),
  ),
]);

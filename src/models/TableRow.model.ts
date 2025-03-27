import { TableColumn } from "./TableColumn.model";

export class TableRow {
  columns: Array<TableColumn>;
  cell: () => string;

  constructor(columns, ...args) {
    this.columns = columns;

    for (let [i, x] of columns.entries()) {
      this[x.name] = args[i];
    }

    this.cell = function () {
      return this[this.name];
    };
  }
}

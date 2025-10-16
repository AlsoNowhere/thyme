import { TableColumn } from "./TableColumn.model";
export declare class TableRow {
    columns: Array<TableColumn>;
    cell: () => string;
    constructor(columns: Array<TableColumn>, ...args: any[]);
}

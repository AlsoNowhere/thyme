import { TableColumn } from "./TableColumn.model";
export declare class TableRow {
    columns: Array<TableColumn>;
    cell: () => string;
    constructor(columns: any, ...args: any[]);
}

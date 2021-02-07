
import { logger } from "sage";

import { dill } from "dill";

import { TableColumn } from "thyme-core";

export const Table = function(){

    this.oninit = function(){
        const columns = this.columns;
        this.columns = columns.filter(x => x instanceof TableColumn);
        if (this.columns.length < columns.length) {
            logger.warn("ThymeX", "Table", "columns",`${columns.length - this.columns.length} items filtered out of the columns property as they were not instances of TableColumn.`);
        }
    }

    this._content = function(){
        if (this.content) {
            return this.content instanceof Function
                ? this.content()
                : this.content;
        }
        return this._parent[this.property];
    }

    this.headerProperties = {};
    this.cellProperties = {};

    return dill(
        <table>
            <thead>
                <tr>
                    <th dill-extends="headerProperties" dill-for="columns">{label}</th>
                </tr>
            </thead>

            <tbody>
                <tr dill-for="rows">
                    <td dill-extends="cellProperties" dill-for="columns">{_content}</td>
                </tr>
            </tbody>
        </table>
    )
}

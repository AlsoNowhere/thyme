
import { dill } from "dill";

import { logger } from "sage";

import { modeller, TableColumn } from "thyme-core";

import { Table } from "../Table.component";

export const ModellerTable = function(){

    this.oninit = function(){
        
        if (!(this.Model instanceof Function && this.Model.prototype instanceof modeller.ModelParent)) {
            logger.error("Thyme", "ModellerTable", "Model", "You must pass a Model generated from modeller.Builder as the model.");
        }
        
        const {items, aliases} = this.Model;
        this.columns = Object.keys(items).map(name => {
            return new TableColumn(name, aliases[name]);
        });
    }

    this.columns = [];
    this.rows = [];
    this.headerProperties = {};
    this.cellProperties = {};

    return dill(
        <Table columns="columns"
            rows="rows"
            headerProperties="headerProperties"
            cellProperties="cellProperties" />
    )
}


import template from "./Tabler.template";
import { logger } from "../../services/logger/logger.service";

const TableColumn = function(property,name,options){

    if (property === undefined || typeof property !== "string") {
        const error = "You must pass a string to the property.";
        logger.error(error);
        throw new Error(error);
    }

    if (name === undefined || typeof name !== "string") {
        const error = "You must pass a string to the name.";
        logger.error(error);
        throw new Error(error);
    }

    this.property = property;
    this.name = name;

    if (!!options) {
        this.options = options;
    }
}

export const Tabler = function(){
    const Tabler = function(){
        this.oninit = function(){
            if (!(this.columns instanceof Array)) {
                const error = "You must pass an Array to the columns.";
                logger.error(error);
                throw new Error(error);
            }

            if (!(this.rows instanceof Array)) {
                logger.warn("No rows pass to Tabler component, there will be no rows in the resulting table.");
            }

            this.innerColumns = this.columns.filter(x => x instanceof TableColumn);
        }
        this.innerColumns = [];
        this.content = function(){
            return this._parent[this._item.name];
        }
    }

    Tabler.prototype = new dill.ComponentPrototype("modeller-table",template);

    return Tabler;
}();

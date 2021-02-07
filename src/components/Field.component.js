
// import { logger } from "sage";

import { dill } from "dill";

// import { SelectOption } from "thyme-core";

// import { DropdownItem } from "../models/DropdownItem.model";

// const locationForLogger = ["ThymeX", "Field component"];

export const Field = function(){

    this.oninserted = function(){

    //     if (typeof this.label !== "string") {
    //         logger.error(...locationForLogger,"label",`Label property must be a string. You have passed ${typeof this.label}`);
    //     }

    //     if (this.type !== undefined && typeof this.type !== "string") {
    //         logger.error(...locationForLogger,"type",`Type property must be a string. You have passed ${typeof this.type}`);
    //     }

    //     if (typeof (this.name instanceof Function ? this.name() : this.name) !== "string") {
    //         logger.error(...locationForLogger,"name",`Name property must be a string. You have passed ${typeof (this.name instanceof Function ? this.name() : this.name)}`);
    //     }

    //     if (this.placeholder !== undefined && typeof this.placeholder !== "string") {
    //         logger.error(...locationForLogger,"placeholder",`Placeholder property must be a string. You have passed ${typeof this.placeholder}`);
    //     }

    //     if (this.type === "select"){

    //         const options = this.options instanceof Function ? this.options() : this.options;

    //         if (!(options instanceof Array)) {
    //             logger.error(...locationForLogger,"options","You must pass an Array of options to the options property when defining a select Field.")
    //         }

    //         this.options = options.filter(x => x instanceof SelectOption || x instanceof DropdownItem);

    //         if (this.options.length < options.length) {
    //             logger.warn(...locationForLogger,"options",`${options.length - this.options.length} items were filtered out of the options property for not being an instance of SelectOption or DropdownItem.`);
    //         }

    //         const value = this.value();
    //         const index = this.options.findIndex(x => x.value === value);
    //         if (index !== -1 && index !== this.selectedIndex) {
    //             this.selectedIndex = index;
    //         }
    //     }
    }

    // this.label = "";
    this.type = "text";
    this.value = "";
    // this.selectedIndex = 0;
    // this.required = false;
    // this.style = "";

    // this.marginBottom = true;

    this.disabled = false;
    this.required = false;
    this.styles = "";
    this.labelClasses = function(){
        return this.required || this.attributes.required ? "required" : "";
    }

    this.attributes = {
        // "name-": "name",
        // "value-": "value",
        // "placeholder-": "placeholder",
        // "input--": "onChange",
        // "required-": "required",
        // "style-": "style"
    }
    // this.placeholder && this.fieldProperties["placeholder-"] = this.placeholder;

    this._onChange = function(_, element){
        if (this.hasOwnProperty("onChange")) {
            return this.onChange(
                (this.type === "checkbox" || this.type === "radio")
                    ? element.checked
                    : element.value
                );
        }
        else {
            this.value = element.value;
        }
    }

    // this.isSelected = function(){
    //     return this._index === this.selectedIndex;
    // }

    this.hasLabel = function(){
        return !!this.label;
    }
    // this.noMarginBottom = function(){
    //     return this.marginBottom ? "" : "reset-margin";
    // }
    this.labelRequired = function(){
        return this.required ? "required" : "";
    }

    this.isInput = function(){
        return this.type !== "select" && this.type !== "textarea";
    }
    this.isSelect = function(){
        return this.type === "select";
    }
    this.isTextarea = function(){
        return this.type === "textarea";
    }
    this.isNotRadioOrCheckbox = function(){
        return this.hasLabel() && this.type !== "checkbox" && this.type !== "radio";
    }
    this.isRadioOrCheckbox = function(){
        return this.hasLabel() && (this.type === "checkbox" || this.type === "radio");
    }

    return dill(
        <label class-="labelClasses">
            <span class="{labelRequired}" dill-if="isNotRadioOrCheckbox">{label}</span>

            <input type-="type"
                name-="name"
                value-="value"
                checked-="checked"
                input--="_onChange"
                disabled-="disabled"
                required-="required"
                style-="styles"
                dill-extends="attributes"
                dill-if="isInput" />

        <span class="{labelRequired}" dill-if="isRadioOrCheckbox">{label}</span>

            <select name-="name"
                value-="value"
                input--="_onChange"
                disabled-="disabled"
                required-="required"
                style-="styles"
                dill-if="isSelect">
                <option value-="value"
                    dill-for="options">{name}</option>
            </select>

            <textarea name-="name"
                value-="value"
                input--="_onChange"
                disabled-="disabled"
                required-="required"
                style-="styles"
                dill-extends="attributes"
                dill-if="isTextarea"></textarea>
        </label>
    )
}

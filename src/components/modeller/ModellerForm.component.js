
// import { logger } from "sage";

import { dill } from "dill";

import { modeller } from "thyme-core";

import { Field } from "../Field.component";
import { defaultFooterContent } from "./support/default-footer-content.component";

import { DropdownItem } from "../../models/DropdownItem.model";

// const locationOfComponent = ["ThymeX", "ModellerForm"];

const types = {
    string: "text",
    boolean: "checkbox"
}

export const ModellerForm = function(){

    this.oninserted = function(){
        // if (this.name === undefined) {
        //     logger.error(...locationOfComponent,"name","You must pass a name for the form.");
        // }

        // let Model = this.model;
        // if (this.model instanceof Function && !(this.model.prototype instanceof modeller.ModelParent)) {
        //     Model = this.model();
        // }
        // if (!(Model.prototype instanceof modeller.ModelParent)) {
        //     logger.error(...locationOfComponent,"model","You must pass a model generated from modeller.Builder as the model.");
        // }

        // if (!(this.formvalues instanceof Model)) {
        //     logger.error(...locationOfComponent,"formvalues","You must pass an instance of the model property to the formvalues property.");
        // }

        // const newModel = new Model();
        // const aliases = Model.aliases;
        // const items = Model.items;
        // const modelOptions = Model.options;

        // this.fields = Object.entries(newModel)
        //     .filter(x => !modelOptions[x[0]] || modelOptions[x[0]].hide !== false)
        //     .map(x=>{
        //         let type = items[x[0]];
        //         let options = modelOptions[x[0]] && modelOptions[x[0]].options;

        //         if (type instanceof modeller.Single && type.context === DropdownItem) {
        //             type = "select";
        //         }

        //         const obj = {
        //             label: aliases[x[0]],
        //             name: x[0],
        //             value(){ return this.formvalues[this.name] },
        //             type,
        //             classes: this.fieldclasses && this.fieldclasses[x[0]] || "",
        //             options
        //         };

        //         return obj;
        //     });

        this.formValues === null && (this.formValues = new this.Model());

        this.fields.length = 0;

        Object.entries(this.Model.items).forEach(item => {
            const [name, modellerType] = item;
            let type = types[modellerType] || modellerType;
            const itemOptions = this.Model.options[name];
            const options = itemOptions && itemOptions.options;
            if (modellerType instanceof modeller.Single && modellerType.context === DropdownItem) {
                type = "select";
            }
            if (itemOptions && itemOptions.type) {
                type = itemOptions.type;
            }
            this.fields.push({
                type,
                label: name,
                name,
                value: () => this.formValues[name],
                options,
                onChange: this.onChange
            });
        });

    }

/* 
    We catch the onSubmit event here and fire it manually. This way we can do the preventDefault function instead of needing that to be run for every definition.
    This way we can also pass the formValues which wouldn't be sent otherwise.
*/
    this.catchOnSubmit = function(event){
        event.preventDefault();
        this.hasOwnProperty("onSubmit") && this.onSubmit(this.formValues);
    }

    this.fields = [];
    this.formValues = null;
    this.formElement = null;
    this.footerContent = defaultFooterContent;
    this.cancelLabel = "Cancel";

    this.onChange = function(elementValue){

        {
            let outputValue = elementValue;

            if (this.type === "number") {
                outputValue = parseFloat(outputValue);
            }

            this.formValues[this.name] = outputValue;
        }

        dill.change(this);
        return false;
    }

    this.hasCancelMethod = function(){
        return this.cancel instanceof Function;
    }

    return dill(
        <form name-="name"
            class-="classes"
            formElement---
            autocomplete="off"
            submit--="catchOnSubmit">

            <Field name="name"
                label="label"
                type="type"
                value="value"
                onChange="onChange"
                options="options"
                dill-for="fields" />

            <div dill-template="footerContent"></div>
        </form>
    )
}

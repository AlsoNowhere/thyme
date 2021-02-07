
import { dill } from "dill";

import { Field } from "./Field.component";

export const FieldSet = function(){

    this.legend = "";
    this.name = "";
    this.options = [];
    this.fieldSetElement = null;

    return dill(
        <fieldset fieldSetElement--->
            <legend>{legend}</legend>

            <Field type="'radio'"
                name="name"
                label="label"
                value="value"
                dill-for="options" />
        </fieldset>
    )
}

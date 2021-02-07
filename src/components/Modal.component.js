
import { dill } from "dill";

export const closeModal = (scope, property = "state") => {

    scope[property] = "visible closing";

    !!scope._dillContext && dill.change(scope);

    setTimeout(() => {
        scope[property] = "";

        !!scope._dillContext && dill.change(scope);
    }, 300);

    return false;
}

export const Modal = function(){

    // this.oninserted = function(){
        // console.log("PreOIS: ", this._template, this);
        // this.template = this._template.children;
    // }

    // this.template = null;

    this.state = "";
    this.label = "";

    this.closeModal = function(){
        closeModal(this);
    }

    return dill(
        <article class="modal {state}">
            <div class="content">
                <header>
                    <h3>{label}</h3>

                    <button type="button" click--="closeModal"></button>
                </header>

                <div dill-template="_template"></div>
            </div>
        </article>
    )
}

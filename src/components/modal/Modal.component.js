
import template from "./Modal.template";

export const closeModal = (scope,state) => {
    scope[state] = "visible closing";
    dill.change();
    setTimeout(()=>{
        scope[state] = "";
        dill.change();
    },300);
}

export const Modal = function(){
    const Modal = function(){
        this.close = function(){
            closeModal(this,"state");
        }
    };

    Modal.prototype = new dill.ComponentPrototype("modal",template);

    return Modal;
}();

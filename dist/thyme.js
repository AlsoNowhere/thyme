import { dill } from 'dill';
import { path, TableColumn, modeller } from 'thyme-core';
import { logger } from 'sage';

const closeModal = (scope, property = "state") => {

    scope[property] = "visible closing";

    !!scope._dillContext && dill.change(scope);

    setTimeout(() => {
        scope[property] = "";

        !!scope._dillContext && dill.change(scope);
    }, 300);

    return false;
};

const Modal = function(){

    
        
        
    

    

    this.state = "";
    this.label = "";

    this.closeModal = function(){
        closeModal(this);
    };

    
};
Modal.component = new dill.Component(
dill.element("article", {"class":"modal {state}"}, 
dill.element("div", {"class":"content"}, 
dill.element("header", {}, 
dill.element("h3", {}, ["{label}"],),
dill.element("button", {"type":"button",
"click--":"closeModal"}, ),),
dill.element("div", {"dill-template":"_template"}, ),),));

const getRoute = routes => {
    let i = 0;
    while (i < routes.length) {
        const route = routes[i];
        const routeSplit = route.url.split("/").filter(x => x !== "");
        const routeUrlLength = routeSplit.length;
        const checkRouteUrl = routeSplit.reduce((a, b, i) => !a ? a : (b === path.path[i] || b.charAt(0) === ":"), true);
        if (
            routeUrlLength === path.path.length
            && checkRouteUrl
        ) {
            return route.Component;
        }
        i++;
    }
};

const Router = function(){

    this.oninit = function(){

        this.resolveRoute();

        path.subscribe(() => {

            this.resolveRoute();

            dill.change(this);
        });
    };

    this.routes = [];

    this.template = [
dill.element("span", {}, ),];

    this.resolveRoute = function(){
        const component = getRoute(this.routes);
        
        
        
        
        component && (this.template = component);
    };

    
};
Router.component = new dill.Component(
dill.element("div", {"dill-template":"template"}, ));

const Field = function(){

    this.oninserted = function(){

    
    
    

    
    
    

    
    
    

    
    
    

    

    

    
    
    

    

    
    
    

    
    
    
    
    
    
    };

    
    this.type = "text";
    this.value = "";
    
    
    

    

    this.disabled = false;
    this.required = false;
    this.styles = "";
    this.labelClasses = function(){
        return this.required || this.attributes.required ? "required" : "";
    };

    this.attributes = {
        
        
        
        
        
        
    };
    

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
    };

    
    
    

    this.hasLabel = function(){
        return !!this.label;
    };
    
    
    
    this.labelRequired = function(){
        return this.required ? "required" : "";
    };

    this.isInput = function(){
        return this.type !== "select" && this.type !== "textarea";
    };
    this.isSelect = function(){
        return this.type === "select";
    };
    this.isTextarea = function(){
        return this.type === "textarea";
    };
    this.isNotRadioOrCheckbox = function(){
        return this.hasLabel() && this.type !== "checkbox" && this.type !== "radio";
    };
    this.isRadioOrCheckbox = function(){
        return this.hasLabel() && (this.type === "checkbox" || this.type === "radio");
    };

    
};
Field.component = new dill.Component(
dill.element("label", {"class-":"labelClasses"}, 
dill.element("span", {"class":"{labelRequired}",
"dill-if":"isNotRadioOrCheckbox"}, ["{label}"],),
dill.element("input", {"type-":"type",
"name-":"name",
"value-":"value",
"checked-":"checked",
"input--":"_onChange",
"disabled-":"disabled",
"required-":"required",
"style-":"styles",
"dill-extends":"attributes",
"dill-if":"isInput"}),
dill.element("span", {"class":"{labelRequired}",
"dill-if":"isRadioOrCheckbox"}, ["{label}"],),
dill.element("select", {"name-":"name",
"value-":"value",
"input--":"_onChange",
"disabled-":"disabled",
"required-":"required",
"style-":"styles",
"dill-if":"isSelect"}, 
dill.element("option", {"value-":"value",
"dill-for":"options"}, ["{name}"],),),
dill.element("textarea", {"name-":"name",
"value-":"value",
"input--":"_onChange",
"disabled-":"disabled",
"required-":"required",
"style-":"styles",
"dill-extends":"attributes",
"dill-if":"isTextarea"}, ),));

const FieldSet = function(){

    this.legend = "";
    this.name = "";
    this.options = [];
    this.fieldSetElement = null;

    
};
FieldSet.component = new dill.Component(
dill.element("fieldset", {"fieldSetElement---":""}, 
dill.element("legend", {}, ["{legend}"],),
dill.element(Field, {"type":"'radio'",
"name":"name",
"label":"label",
"value":"value",
"dill-for":"options"}),));

const FieldSetOptionModel = function(
    label,
    value
){
    this.label = label;
    this.value = value;

    Object.freeze(this);
};

const NavLink = function(){

    this.label = "";

    this.update = () => {
        setTimeout(()=>{
            path.path = path.path;
        },0);
        return false;
    };

    
};
NavLink.component = new dill.Component(
dill.element("a", {"href":"#{link}",
"class-":"class",
"click--":"update"}, ["{label}"],));

const Table = function(){

    this.oninit = function(){
        const columns = this.columns;
        this.columns = columns.filter(x => x instanceof TableColumn);
        if (this.columns.length < columns.length) {
            logger.warn("ThymeX", "Table", "columns",`${columns.length - this.columns.length} items filtered out of the columns property as they were not instances of TableColumn.`);
        }
    };

    this._content = function(){
        if (this.content) {
            return this.content instanceof Function
                ? this.content()
                : this.content;
        }
        return this._parent[this.property];
    };

    this.headerProperties = {};
    this.cellProperties = {};

    
};
Table.component = new dill.Component(
dill.element("table", {}, 
dill.element("thead", {}, 
dill.element("tr", {}, 
dill.element("th", {"dill-extends":"headerProperties",
"dill-for":"columns"}, ["{label}"],),),),
dill.element("tbody", {}, 
dill.element("tr", {"dill-for":"rows"}, 
dill.element("td", {"dill-extends":"cellProperties",
"dill-for":"columns"}, ["{_content}"],),),),));

const Loading = function(){
    
};
Loading.component = new dill.Component(
dill.element("svg", {"viewBox":"0 0 150 150",
"class":"block width height spin"}, 
dill.element("circle", {"cx":"75",
"cy":"75",
"r":"60",
"style":"fill:transparent;stroke:#888;stroke-dasharray:300;stroke-width:15px;stroke-linecap:round;"}),));

const DropdownItem = function(
    name,
    value = name
){
    this.name = name;
    this.value = value;

    Object.freeze(this);
};

const Route = function(
    url,
    Component
){
    this.url = url;
    this.Component = Component;

    Object.freeze(this);
};

const defaultFooterContent = [
dill.element("button", {"class":"large margin-right-small"}, ["Submit"],),
dill.element("button", {"type":"button",
"class":"smoke large",
"click--":"cancel",
"dill-if":"hasCancelMethod"}, ["{cancelLabel}"],),];

const types = {
    string: "text",
    boolean: "checkbox"
};

const ModellerForm = function(){

    this.oninserted = function(){
        
        
        

        
        
        
        
        
        
        

        
        
        

        
        
        
        

        
        
        
        
        

        
        
        

        
        
        
        
        
        
        
        

        
        

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

    };


    this.catchOnSubmit = function(event){
        event.preventDefault();
        this.hasOwnProperty("onSubmit") && this.onSubmit(this.formValues);
    };

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
    };

    this.hasCancelMethod = function(){
        return this.cancel instanceof Function;
    };

    
};
ModellerForm.component = new dill.Component(
dill.element("form", {"name-":"name",
"class-":"classes",
"formElement---":"",
"autocomplete":"off",
"submit--":"catchOnSubmit"}, 
dill.element(Field, {"name":"name",
"label":"label",
"type":"type",
"value":"value",
"onChange":"onChange",
"options":"options",
"dill-for":"fields"}),
dill.element("div", {"dill-template":"footerContent"}, ),));

const ModellerTable = function(){

    this.oninit = function(){
        
        if (!(this.Model instanceof Function && this.Model.prototype instanceof modeller.ModelParent)) {
            logger.error("Thyme", "ModellerTable", "Model", "You must pass a Model generated from modeller.Builder as the model.");
        }
        
        const {items, aliases} = this.Model;
        this.columns = Object.keys(items).map(name => {
            return new TableColumn(name, aliases[name]);
        });
    };

    this.columns = [];
    this.rows = [];
    this.headerProperties = {};
    this.cellProperties = {};

    
};
ModellerTable.component = new dill.Component(
dill.element(Table, {"columns":"columns",
"rows":"rows",
"headerProperties":"headerProperties",
"cellProperties":"cellProperties"}));

const Tabs = function(){

    this.tabs = [];
    this.tabContent = null;
    this.active = null;
    this.isActive = function(){
        return this.active === this._item ? "active" : "";
    };
    this.hasTemplate = function(){
        return this.tabContent !== null;
    };

    
};
Tabs.component = new dill.Component([
dill.element("ul", {"class":"tabs"}, 
dill.element("li", {"class":"{isActive}",
"click--":"tabLogic",
"dill-for":"tabs"}, ["{label}"],),),
dill.element("div", {"dill-if":"hasTemplate",
"dill-template":"tabContent"}, ),]);

const TabModel = function(
    label,
    tabLogic
){
    this.label = label;
    this.tabLogic = tabLogic;

    Object.freeze(this);
};

export { DropdownItem, Field, FieldSet, FieldSetOptionModel, Loading, Modal, ModellerForm, ModellerTable, NavLink, Route, Router, TabModel, Table, Tabs, closeModal };

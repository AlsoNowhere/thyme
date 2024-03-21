import { component, element, template, MintComponent, getter, refresh, Store } from 'mint';

class ButtonComponent extends MintComponent {
    constructor() {
        super();
        this.type = "button";
        this.theme = "snow";
        this.class = "";
        this.onClick = null;
        getter(this, "classes", function () {
            if (this.hasExtraButtonLabel)
                return `${this.class} multi-content`;
            return this.class;
        });
        getter(this, "hasIcon", function () {
            return this.icon !== undefined;
        });
        getter(this, "hasLabel", function () {
            return this.label !== undefined;
        });
        getter(this, "isSquare", function () {
            return this.square ? "square" : "";
        });
        getter(this, "isLarge", function () {
            return this.large ? "large" : "";
        });
        getter(this, "hasExtraButtonLabel", function () {
            return (this.extraButtonLabel !== null && this.extraButtonLabel !== undefined);
        });
        getter(this, "getExtraButtonLabel", function () {
            return this.extraButtonLabel();
        });
    }
}
const Button = component("button", ButtonComponent, {
    "[type]": "type",
    class: "{theme} {classes} {isSquare} {isLarge}",
    "[title]": "title",
    "(click)": "onClick",
}, [
    element("span", { mIf: "hasIcon", class: "icon fa fa-{icon}" }),
    element("span", { mIf: "hasLabel", class: "label" }, "{label}"),
    element("span", { mIf: "hasExtraButtonLabel", class: "extra-content" }, template("getExtraButtonLabel")),
]);

class FieldInputComponent extends MintComponent {
    constructor() {
        super();
        this.type = "text";
        this.fieldStyles = "";
        this.onInput = null;
        getter(this, "isRequired", function () {
            return this.required ? "required" : "";
        });
        getter(this, "hasLabelAbove", function () {
            return !!this.label && !this.labelBeside;
        });
        getter(this, "hasLabelBeside", function () {
            return !!this.label && !!this.labelBeside;
        });
    }
}
const FieldInput = component("label", FieldInputComponent, { class: "{labelClass} {isRequired}", "[style]": "labelStyles" }, [
    element("span", { mIf: "hasLabelAbove" }, "{label}"),
    element("input", {
        "[type]": "type",
        "[name]": "name",
        "[value]": "value",
        "[checked]": "checked",
        "[class]": "class",
        "[placeholder]": "placeholder",
        "[required]": "required",
        "[style]": "fieldStyles",
        "(input)": "onInput",
        mRef: "ref",
    }),
    element("span", { mIf: "hasLabelBeside" }, "{label}"),
]);

const FieldCheckbox = component("div", null, null, element(FieldInput, {
    type: "checkbox",
    "[name]": "name",
    "[value]": "value",
    "[checked]": "checked",
    "[label]": "label",
    labelBeside: true,
    "[labelClass]": "labelClass",
    "[class]": "inputClass",
    "[fieldStyles]": "fieldStyles",
    "[required]": "required",
    "[readonly]": "readonly",
    "[onInput]": "onInput",
    "[ref]": "ref",
}));

const FieldRadio = component("div", null, null, element(FieldInput, {
    type: "radio",
    "[name]": "name",
    "[value]": "value",
    "[checked]": "checked",
    "[label]": "label",
    labelBeside: true,
    "[labelClass]": "labelClass",
    "[labelStyles]": "labelStyles",
    "[class]": "inputClass",
    "[fieldStyles]": "fieldStyles",
    "[required]": "required",
    "[readonly]": "readonly",
    "[onInput]": "onInput",
    "[ref]": "ref",
}));

class FieldSelectComponent extends MintComponent {
    constructor() {
        super();
        this.fieldStyles = "";
        this.options = [];
        this.onInput = null;
        getter(this, "hasLabel", function () {
            return !!this.label;
        });
    }
}
const FieldSelect = component("label", FieldSelectComponent, { class: "{labelClass} {isRequired}" }, [
    element("span", { mIf: "hasLabel" }, "{label}"),
    element("select", {
        "[name]": "name",
        "[value]": "value",
        "[class]": "class",
        "[style]": "fieldStyles",
        "[required]": "required",
        "(input)": "onInput",
        mRef: "ref",
    }, [
        element("option", {
            mFor: "options",
            mKey: "value",
            "[value]": "value",
        }, "{name}"),
    ]),
]);

class FieldFieldsetComponent extends MintComponent {
    constructor() {
        super();
        this.options = [];
        this.onInput = null;
        getter(this, "hasLegend", function () {
            return !!this.legend;
        });
    }
}
const FieldFieldset = component("fieldset", FieldFieldsetComponent, {}, [
    element("legend", { mIf: "hasLegend", class: "fieldset__legend" }, "{legend}"),
    element("ul", { class: "list flex" }, element("li", { mFor: "options", mKey: "value", class: "margin-right-small" }, element(FieldRadio, {
        "[name]": "name",
        "[value]": "value",
        "[label]": "label",
        "[labelClass]": "labelClass",
        "[labelStyles]": "labelStyles",
        "[fieldStyles]": "fieldStyles",
        "[class]": "class",
        "[onInput]": "onInput",
    }))),
]);

class FieldTextareaComponent extends MintComponent {
    constructor() {
        super();
        this.resize = false;
        this.fieldStyles = "";
        this.onInput = null;
        getter(this, "hasLabel", function () {
            return !!this.label;
        });
        getter(this, "getStyles", function () {
            return this.resize ? "" : "resize: none;" + this.fieldStyles;
        });
        getter(this, "getReadonly", function () {
            return this.readonly ? "true" : undefined;
        });
    }
}
const FieldTextarea = component("label", FieldTextareaComponent, { class: "{labelClass} {isRequired}" }, [
    element("span", { mIf: "hasLabel" }, "{label}"),
    element("textarea", {
        "[name]": "name",
        "[value]": "value",
        "[class]": "class",
        "[placeholder]": "placeholder",
        "[style]": "getStyles",
        "[readonly]": "getReadonly",
        "(input)": "onInput",
        mRef: "ref",
    }),
]);

const passProps = {
    "[type]": "type",
    "[name]": "name",
    "[value]": "value",
    "[checked]": "checked",
    "[label]": "label",
    "[legend]": "legend",
    "[labelBeside]": "labelBeside",
    "[labelClass]": "labelClass",
    "[labelStyles]": "labelStyles",
    "[class]": "inputClass",
    "[fieldStyles]": "fieldStyles",
    "[required]": "required",
    "[readonly]": "readonly",
    "[onInput]": "onInput",
    "[ref]": "ref",
};
class FieldComponent extends MintComponent {
    constructor() {
        super();
        this.type = "text";
        this.class = "";
        this.fieldStyles = undefined;
        this.onInput = null;
        this.ref = null;
        getter(this, "isInput", function () {
            const inValidTypes = [
                "textarea",
                "select",
                "checkbox",
                "radio",
                "fieldset",
            ];
            return !inValidTypes.includes(this.type);
        });
        getter(this, "isCheckbox", function () {
            return this.type === "checkbox";
        });
        getter(this, "isRadio", function () {
            return this.type === "radio";
        });
        getter(this, "isFieldSet", function () {
            return this.type === "fieldset";
        });
        getter(this, "isSelect", function () {
            return this.type === "select";
        });
        getter(this, "isTextarea", function () {
            return this.type === "textarea";
        });
    }
}
const Field = component("div", FieldComponent, { "[class]": "wrapperClasses" }, [
    element(FieldInput, Object.assign({ mIf: "isInput" }, passProps)),
    element(FieldCheckbox, Object.assign({ mIf: "isCheckbox" }, passProps)),
    element(FieldRadio, Object.assign({ mIf: "isRadio" }, passProps)),
    element(FieldFieldset, Object.assign(Object.assign({ mIf: "isFieldSet" }, passProps), { "[options]": "options" })),
    element(FieldTextarea, Object.assign(Object.assign({ mIf: "isTextarea" }, passProps), { "[resize]": "resize" })),
    element(FieldSelect, Object.assign(Object.assign({ mIf: "isSelect" }, passProps), { "[options]": "options" })),
]);

const modalTime = 500;

const closeModal = (target, prop) => {
    target[prop] = "open closing";
    refresh(target);
    setTimeout(() => {
        target[prop] = "";
        refresh(target);
    }, modalTime);
};

class ModalComponent extends MintComponent {
    constructor() {
        super();
        this.state = "";
        this.theme = "smoke";
        this.class = "";
        getter(this, "hasTitle", function () {
            return this.title !== undefined;
        });
        this.clickOnBackground = function () {
            if (this.closeOnBackgroundClick !== true)
                return;
            if (this._store instanceof Store &&
                typeof this.storeTarget === "string") {
                closeModal(this._store, this.storeTarget);
            }
            else {
                closeModal(this, "state");
            }
        };
    }
}
const Modal = component("article", ModalComponent, { class: "modal {state}", "(click)": "clickOnBackground" }, element("div", { class: "modal__content {class}" }, [
    element("header", { mIf: "hasTitle", class: "modal__header {theme}" }, element("h2", null, "{title}")),
    "_children",
]));

class FieldsetOption {
    constructor({ value, label = value, classes, }) {
        this.value = value;
        this.label = label;
        this.classes = classes;
    }
}

export { Button, Field, FieldsetOption, Modal, closeModal };

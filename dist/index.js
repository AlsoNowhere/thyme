import { component, mRef, node, mIf, template, MintScope, Resolver, mFor, refresh, mExtend, Store } from 'mint';

class ButtonComponent extends MintScope {
    constructor() {
        super();
        this.type = "button";
        this.theme = "snow";
        this.class = "";
        this.style = undefined;
        this.content = undefined;
        this.id = undefined;
        this.classes = new Resolver(function () {
            if (this.hasExtraButtonLabel)
                return `${this.class} multi-content`;
            return this.class;
        });
        this.hasIcon = new Resolver(function () {
            return this.icon !== undefined;
        });
        this.hasLabel = new Resolver(function () {
            return this.label !== undefined;
        });
        this.isSquare = new Resolver(function () {
            return this.square ? "square" : "";
        });
        this.isLarge = new Resolver(function () {
            return this.large ? "large" : "";
        });
        this.hasExtraButtonLabel = new Resolver(function () {
            return (this.extraButtonLabel !== null && this.extraButtonLabel !== undefined);
        });
        this.getExtraButtonLabel = function () {
            return this.extraButtonLabel;
        };
        this.getContent = function () {
            return this.content;
        };
        this.onClick = null;
    }
}
const Button = component("button", ButtonComponent, {
    "[type]": "type",
    class: "{theme} {classes} {isSquare} {isLarge}",
    "[style]": "style",
    "[title]": "title",
    "[id]": "id",
    "(click)": "onClick",
    mRef: mRef("ref"),
}, [
    node("<>", Object.assign({}, mIf("!_children")), [
        node("<>", Object.assign({}, mIf("!content")), [
            node("span", { mIf: mIf("hasIcon"), class: "icon fa fa-{icon}" }),
            node("span", { mIf: mIf("hasLabel"), class: "label" }, "{label}"),
            node("span", { mIf: mIf("hasExtraButtonLabel"), class: "extra-content" }, node(template("getExtraButtonLabel"))),
        ]),
        node("<>", Object.assign({}, mIf("content")), node(template("getContent"))),
    ]),
    node("<>", Object.assign({}, mIf("_children")), "_children"),
]);

class ColourSelectorComponent extends MintScope {
    constructor() {
        super();
        this.onInput = null;
        this.colourSelectorScope = this;
        this.showColours = false;
        this.colours = [
            "black",
            "green",
            "lightgreen",
            "blue",
            "lightblue",
            "grey",
            "lightgrey",
            "#444",
            "pink",
            "teal",
            "aqua",
            "red",
            "tomato",
            "purple",
        ];
        this.toggleShowColours = function () {
            this.colourSelectorScope.showColours =
                !this.colourSelectorScope.showColours;
            refresh(this.colourSelectorScope);
        };
        this.chooseColour = function () {
            var _a;
            (_a = this.onInput) === null || _a === void 0 ? void 0 : _a.call(this, this._x);
            this.colourSelectorScope.showColours = false;
            refresh(this.colourSelectorScope);
        };
    }
}
const ColourSelector = component("div", ColourSelectorComponent, { class: "relative z-index" }, [
    node(Button, {
        "[large]": "large",
        square: true,
        content: node("span", null, "C"),
        "[colourSelectorScope]": "colourSelectorScope",
        "[onClick]": "toggleShowColours",
    }),
    node("ul", Object.assign(Object.assign({}, mIf("showColours")), { class: "list flex absolute left-gap", style: "top: 2rem; width: 100px;" }), node("li", Object.assign(Object.assign({}, mFor("colours")), { mKey: "_i", class: "width height snow-border pointer", style: "background-color: {_x};", "(click)": "chooseColour" }))),
]);

class FieldInputComponent extends MintScope {
    constructor() {
        super();
        this.type = "text";
        this.style = "";
        this.onKeyDown = null;
        this.onInput = null;
        this.onFocus = null;
        this.onBlur = null;
        this._labelClass = new Resolver(function () {
            return this.labelClass + (this.large ? " large" : "");
        });
        this._inputClass = new Resolver(function () {
            return this.class + (this.large ? " large" : "");
        });
        this.isRequired = new Resolver(function () {
            return this.required ? "required" : "";
        });
        this.hasLabelAbove = new Resolver(function () {
            return !!this.label && !this.labelBeside;
        });
        this.hasLabelBeside = new Resolver(function () {
            return !!this.label && !!this.labelBeside;
        });
    }
}
const FieldInput = component("label", FieldInputComponent, { class: "{_labelClass} {isRequired}", "[style]": "labelStyles" }, [
    node("span", { mIf: mIf("hasLabelAbove") }, "{label}"),
    node("input", {
        "[type]": "type",
        "[name]": "name",
        "[value]": "value",
        "[checked]": "checked",
        "[class]": "_inputClass",
        "[style]": "style",
        "[placeholder]": "placeholder",
        "[required]": "required",
        "[readonly]": "readonly",
        "[id]": "id",
        "(keydown)": "onKeyDown",
        "(input)": "onInput",
        "(focus)": "onFocus",
        "(blur)": "onBlur",
        mRef: mRef("ref"),
    }),
    node("span", { mIf: mIf("hasLabelBeside") }, "{label}"),
]);

const FieldCheckbox = component("div", null, null, node(FieldInput, {
    type: "checkbox",
    "[name]": "name",
    "[value]": "value",
    "[checked]": "checked",
    "[label]": "label",
    labelBeside: true,
    "[labelClass]": "labelClass",
    "[class]": "inputClass",
    "[large]": "large",
    "[style]": "style",
    "[required]": "required",
    "[readonly]": "readonly",
    "[id]": "id",
    "[onInput]": "onInput",
    "[ref]": "ref",
}));

const FieldRadio = component("div", null, null, node(FieldInput, {
    type: "radio",
    "[name]": "name",
    "[value]": "value",
    "[checked]": "checked",
    "[label]": "label",
    labelBeside: true,
    "[labelClass]": "labelClass",
    "[labelStyles]": "labelStyles",
    "[class]": "inputClass",
    "[style]": "style",
    "[required]": "required",
    "[readonly]": "readonly",
    "[onInput]": "onInput",
    "[ref]": "ref",
}));

class FieldSelectComponent extends MintScope {
    constructor() {
        super();
        this.style = "";
        this.options = [];
        this.onInput = null;
        this.hasLabel = new Resolver(function () {
            return !!this.label;
        });
    }
}
const FieldSelect = component("label", FieldSelectComponent, { class: "{labelClass} {isRequired}" }, [
    node("span", { mIf: mIf("hasLabel") }, "{label}"),
    node("select", {
        "[name]": "name",
        "[value]": "value",
        "[class]": "class",
        "[style]": "style",
        "[required]": "required",
        "[readonly]": "readonly",
        "[id]": "id",
        "(input)": "onInput",
        mRef: mRef("ref"),
    }, [
        node("option", {
            mFor: mFor("options"),
            mKey: "value",
            "[value]": "value",
        }, "{name}"),
    ]),
]);

class FieldFieldsetComponent extends MintScope {
    constructor() {
        super();
        this.legend = "";
        this.value = null;
        this.options = [];
        this.isChecked = new Resolver(function () {
            return this.value === this.fieldValue;
        });
        this.fieldValue = new Resolver(() => this.value);
        this.onInput = null;
    }
}
const FieldFieldset = component("fieldset", FieldFieldsetComponent, { "[id]": "id" }, [
    node("legend", { mIf: mIf("legend"), class: "fieldset__legend" }, "{legend}"),
    node("ul", { class: "list flex" }, node("li", { mFor: mFor("options"), mKey: "value", class: "margin-right-small" }, node(FieldRadio, {
        "[name]": "name",
        "[value]": "value",
        "[label]": "label",
        "[class]": "class",
        "[labelClass]": "labelClass",
        "[labelStyles]": "labelStyles",
        "[style]": "style",
        "[checked]": "isChecked",
        "[onInput]": "onInput",
    }))),
]);

class FieldTextareaComponent extends MintScope {
    constructor() {
        super();
        this.resize = false;
        this.style = "";
        this.onInput = null;
        this.hasLabel = new Resolver(function () {
            return !!this.label;
        });
        this.getStyles = new Resolver(function () {
            return (this.resize ? "" : "resize: none; ") + this.style;
        });
        this.getReadonly = new Resolver(function () {
            return this.readonly ? "true" : undefined;
        });
    }
}
const FieldTextarea = component("label", FieldTextareaComponent, { class: "{labelClass} {isRequired}" }, [
    node("span", { mIf: mIf("hasLabel") }, "{label}"),
    node("textarea", {
        "[name]": "name",
        "[value]": "value",
        "[class]": "class",
        "[placeholder]": "placeholder",
        "[style]": "getStyles",
        "[readonly]": "getReadonly",
        "[id]": "id",
        "(input)": "onInput",
        mRef: mRef("ref"),
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
    "[class]": "class",
    "[style]": "style",
    "[large]": "large",
    "[required]": "required",
    "[readonly]": "readonly",
    "[id]": "id",
    "[onKeyDown]": "onKeyDown",
    "[onInput]": "onInput",
    "[onFocus]": "onFocus",
    "[onBlur]": "onBlur",
    "[ref]": "ref",
};
class FieldComponent extends MintScope {
    constructor() {
        super();
        this.type = "text";
        this.class = "";
        this.style = undefined;
        this.onKeyDown = null;
        this.onInput = null;
        this.onFocus = null;
        this.onBlur = null;
        this.extend = {};
        this.ref = null;
        this.isInput = new Resolver(function () {
            const inValidTypes = [
                "textarea",
                "select",
                "checkbox",
                "radio",
                "fieldset",
            ];
            return !inValidTypes.includes(this.type);
        });
        this.isCheckbox = new Resolver(function () {
            return this.type === "checkbox";
        });
        this.isRadio = new Resolver(function () {
            return this.type === "radio";
        });
        this.isFieldSet = new Resolver(function () {
            return this.type === "fieldset";
        });
        this.isSelect = new Resolver(function () {
            return this.type === "select";
        });
        this.isTextarea = new Resolver(function () {
            return this.type === "textarea";
        });
    }
}
const Field = component("<>", FieldComponent, { "[class]": "wrapperClasses" }, [
    node(FieldInput, Object.assign({ mIf: mIf("isInput"), mExtend: mExtend("extend") }, passProps)),
    node(FieldCheckbox, Object.assign({ mIf: mIf("isCheckbox"), mExtend: mExtend("extend") }, passProps)),
    node(FieldRadio, Object.assign({ mIf: mIf("isRadio"), mExtend: mExtend("extend") }, passProps)),
    node(FieldFieldset, Object.assign(Object.assign({ mIf: mIf("isFieldSet"), mExtend: mExtend("extend") }, passProps), { "[options]": "options" })),
    node(FieldTextarea, Object.assign(Object.assign({ mIf: mIf("isTextarea"), mExtend: mExtend("extend") }, passProps), { "[resize]": "resize" })),
    node(FieldSelect, Object.assign(Object.assign({ mIf: mIf("isSelect"), mExtend: mExtend("extend") }, passProps), { "[options]": "options" })),
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

class ModalComponent extends MintScope {
    constructor() {
        super();
        this.state = "";
        this.theme = "smoke";
        this.class = "";
        this.hasTitle = new Resolver(function () {
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
const Modal = component("article", ModalComponent, { class: "modal {state}", "(click)": "clickOnBackground" }, node("div", { class: "modal__content {class}" }, [
    node("header", { mIf: mIf("hasTitle"), class: "modal__header {theme}" }, node("h2", null, "{title}")),
    "_children",
]));

const exact = (target, hash) => {
    return target === hash;
};
const contains = (target, hash) => {
    return hash.includes(target);
};
const hasWord = (target, hash) => {
    return (hash.includes(` ${hash} `) ||
        exact(target, hash) ||
        starts(target + " ", hash) ||
        ends(" " + target, hash));
};
const containsAndHyphen = (target, hash) => {
    return target === hash || hash.includes(target + "-");
};
const starts = (target, hash) => {
    return hash.slice(0, target.length) === target;
};
const ends = (target, hash) => {
    return hash.slice(hash.length - target.length) === target;
};

var RouteType;
(function (RouteType) {
    RouteType["exact"] = "exact";
    RouteType["="] = "=";
    RouteType["contains"] = "contains";
    RouteType["*"] = "*";
    RouteType["hasWord"] = "hasWord";
    RouteType["~"] = "~";
    RouteType["containsAndHyphen"] = "containsAndHyphen";
    RouteType["|"] = "|";
    RouteType["starts"] = "starts";
    RouteType["^"] = "^";
    RouteType["ends"] = "ends";
    RouteType["$"] = "$";
})(RouteType || (RouteType = {}));

const logic = {
    [RouteType.exact]: exact,
    [RouteType["="]]: exact,
    [RouteType.contains]: contains,
    [RouteType["*"]]: contains,
    [RouteType.hasWord]: hasWord,
    [RouteType["~"]]: hasWord,
    [RouteType.containsAndHyphen]: containsAndHyphen,
    [RouteType["|"]]: containsAndHyphen,
    [RouteType.starts]: starts,
    [RouteType["^"]]: starts,
    [RouteType.ends]: ends,
    [RouteType["$"]]: ends,
};
class RouterComponent extends MintScope {
    constructor() {
        super();
        this.routes = [];
        this.oninit = function () {
            var _a;
            (_a = this.onDefine) === null || _a === void 0 ? void 0 : _a.call(this, this);
        };
        this.router = function () {
            const routes = this.routes;
            const hash = window.location.hash.replace("#", "").replace(/%20/g, " ");
            {
                let i = 0;
                while (i < routes.length) {
                    const route = routes[i];
                    if (logic[route.type](route.target, hash))
                        return route.content;
                    i++;
                }
            }
            return [];
        };
    }
}
const Router = component("<>", RouterComponent, {}, [
    node(template("router")),
]);

class TabsComponent extends MintScope {
    constructor() {
        super();
        const scope = this;
        this.tabs = [];
        this.currentTab = null;
        this.currentTemplate = new Resolver(function () {
            return this.currentTab.template;
        });
        this.tabSelected = new Resolver(function () {
            return this.currentTab !== null;
        });
        this.activeTab = new Resolver(function () {
            return this._x === this.currentTab ? "active" : "";
        });
        this.onpreblueprint = function () {
            if (this.tabs.length === 0)
                return;
            if (this.currentTab !== null)
                return;
            this.currentTab = this.tabs[0];
        };
        this.selectTab = function () {
            var _a;
            scope.currentTab = this._x;
            (_a = scope.onSelectTab) === null || _a === void 0 ? void 0 : _a.call(scope);
            refresh(scope);
        };
    }
}
const Tabs = component("div", TabsComponent, { class: "tabs", mRef: mRef("ref") }, [
    node("ul", { class: "tabs__list" }, node("li", {
        mFor: mFor("tabs"),
        mKey: "name",
        class: "tabs__list-item {activeTab}",
        "(click)": "selectTab",
    }, node("div", null, "{name}"))),
    node("div", { mIf: mIf("tabSelected"), class: "tabs__body" }, node(template({ onevery: true }, "currentTemplate"))),
]);

class TableComponent extends MintScope {
    constructor() {
        super();
        this.columns = [];
        this.rows = [];
    }
}
const Table = component("table", TableComponent, { class: "table" }, [
    node("thead", null, node("tr", null, node("th", Object.assign(Object.assign({}, mFor("columns")), { mKey: "id" }), "{title}"))),
    node("tbody", null, node("tr", Object.assign(Object.assign({}, mFor("rows")), { mKey: "id" }), node("td", Object.assign(Object.assign({}, mFor("columns")), { mKey: "id" }), "{cell}"))),
]);

class FieldsetOption {
    constructor({ value, label = value, classes, }) {
        this.value = value;
        this.label = label;
        this.classes = classes;
    }
}

class Tab {
    constructor(name, template) {
        this.name = name;
        this.template = template;
    }
}

class Route {
    constructor(targetOrOptions, content) {
        if (typeof targetOrOptions === "string") {
            this.target = targetOrOptions;
            this.type = RouteType.exact;
        }
        else {
            this.target = targetOrOptions.target;
            this.type = targetOrOptions.type;
        }
        this.content = content;
    }
}

class TableColumn {
    constructor(name, title = name, id = name) {
        this.name = name;
        this.title = title;
        this.id = id;
    }
}

class TableRow {
    constructor(columns, ...args) {
        this.columns = columns;
        for (let [i, x] of columns.entries()) {
            this[x.name] = args[i];
        }
        this.cell = function () {
            return this[this.name];
        };
    }
}

export { Button, ColourSelector, Field, FieldsetOption, Modal, Route, RouteType, Router, Tab, Table, TableColumn, TableRow, Tabs, closeModal };

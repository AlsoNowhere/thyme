const path = function(){
    const obj = {};
    Object.defineProperty(obj,"path",{
        get(){
            if (window.location.hash === "") {
                return [];
            }
            return window.location.hash.replace("#","").split("/");
        },
        set(value){
            if (value instanceof Array) {
                console.log("Calues: ", value);
                window.location.hash = value.join("/");
            }
        }
    });
    return obj;
}();

const Route = function(link,component){
    if (typeof link !== "string") {
        throw new Error("You must pass a string for the link property.");
    }
    this.link = link;

    if (typeof component !== "string") {
        throw new Error("You must pass a string for the component property.");
    }
    this.component = component;
};

const template = `
    <div dill-template="router"></div>
`;
    
const Router = function(){
    const Router = function(){
        this.onprerender = function(){
            this.router = this.routes.map(x=>(`<${x.component} dill-if="show${x.link}"></${x.component}>`)).join("\n");
			this.routes.filter(x => x instanceof Route).forEach(x => {
				this["show"+x.link] = function(){
					const url = path.path.filter(y => y !== "#");
					const link = x.link.split("/");
					for (let i = 0 ; i < link.length ; i++) {
						if (link[i] !== url[i] && link[i].substr(0,1) !== ":") {
							return false;
						}
					}
					return true;
				};
			});
        };
        this.router = "";
    };

    Router.prototype = new dill.ComponentPrototype("router",template);

    return Router;
}();

var template$1 = `<article class="modal {{state}}">
    <div class="content">
        <header>
            <h3>{{label}}</h3>
            <button type="button" (click)="close"></button>
        </header>
        <div dill-template="_template"></div>
    </div>
</article>`;

const closeModal = (scope,state) => {
    scope[state] = "visible closing";
    dill.change();
    setTimeout(()=>{
        scope[state] = "";
        dill.change();
    },300);
};

const Modal = function(){
    const Modal = function(){
        this.close = function(){
            closeModal(this,"state");
        };
    };

    Modal.prototype = new dill.ComponentPrototype("modal",template$1);

    return Modal;
}();

const Route$1 = Route;
const path$1 = path;
const closeModal$1 = closeModal;

const thyme = function(){
    const thyme = dill.module("thyme");

    thyme.setComponent(Router);
    thyme.setComponent(Modal);

    return thyme;
}();

export { Route$1 as Route, closeModal$1 as closeModal, path$1 as path, thyme };
//# sourceMappingURL=thyme.js.map

const path = function(){
    const path = {};
    Object.defineProperty(path,"path",{
        get(){
            return window.location.hash.replace("#","").split("/");
        },
        set(value){
            if (!(value instanceof Array)) {
                window.location.hash = value.join("/");
            }
        }
    });
    return path;
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

var template$1 = `<article class="modal">

</article>`;

const Modal = function(){
    const Modal = function(){
    };

    Modal.prototype = new dill.ComponentPrototype("modal",template$1);

    return Modal;
}();

const Route$1 = Route;
const Modal$1 = Modal;
const path$1 = path;

const thyme = function(){
    const thyme = dill.module("thyme");

    thyme.setComponent(Router);

    return thyme;
}();

export { Modal$1 as Modal, Route$1 as Route, path$1 as path, thyme };
//# sourceMappingURL=app.js.map

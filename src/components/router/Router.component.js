import { path } from "../../services/path/path.service";

export const Route = function(link,component){
    if (typeof link !== "string") {
        throw new Error("You must pass a string for the link property.");
    }
    this.link = link;

    if (typeof component !== "string") {
        throw new Error("You must pass a string for the component property.");
    }
    this.component = component;
}

const template = `
    <div dill-template="router"></div>
`;
    
export const Router = function(){
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
    }

    Router.prototype = new dill.ComponentPrototype("router",template);

    return Router;
}();

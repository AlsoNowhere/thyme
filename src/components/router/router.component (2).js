
import { path } from "../../services/common/path.service";

import { Route } from "../../services/common/route.service";

export const routerComponent = function(){
	const data = {
		oninit(){
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
				}
			});
		},
		router: ''
	};
	const template = `
		<div dill-template="router"></div>
	`;
	
	return dill.component("router-outlet",data,template);
}();

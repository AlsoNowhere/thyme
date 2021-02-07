
// import { get } from "sage";

// import { dill } from "dill";

// import { path } from "thyme-core";

// export const Route = function(
//     url,
//     Component
// ){
//     this.url = url;
//     this.Component = Component;
// }

// export const Router = function(){

//     this.onpretemplate = function(){
//         this.routes.forEach((x,i)=>{
//             get(
//                 this,
//                 `template$_${i}`,
//                 () => {
//                     const url = x.url.split("/").filter(y=>y!=="");
//                     return path.path.length === url.length
//                         && url
//                             .reduce((a,b,i)=>{
//                                 if (!a) {
//                                     return false;
//                                 }
//                                 if (b.charAt(0) === "{" && b.charAt(b.length-1) === "}") {
//                                     return true;
//                                 }
//                                 if (b === path.path[i]) {
//                                     return true;
//                                 }
//                                 return false;
//                             },true);
//                 }
//             );
//         });

//         this.template = dill.template(
//             this.routes.map((x,i)=>
//                 dill.template(x.Component,[
//                     {"dill-if":`template$_${i}`}
//                 ])
//             )
//         );
//     }

//     this.template = null;

//     return dill(
//         <div dill-template="template"></div>
//     )
// }



import { dill } from "dill";

import { path } from "thyme-core";

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
}

export const Router = function(){

    this.oninit = function(){

        this.resolveRoute();

        path.subscribe(() => {

            this.resolveRoute();

            dill.change(this);
        });
    }

    this.routes = [];

    this.template = dill(
        <>
            <span></span>
        </>
    );

    this.resolveRoute = function(){
        const component = getRoute(this.routes);
        // const elements = component && component.component.elements instanceof Array
        //     ? component.component.elements
        //     : [component.component.elements];
        // component && (this.template = elements);
        component && (this.template = component);
    }

    return dill(
        <div dill-template="template"></div>
    )
}
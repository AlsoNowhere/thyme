
export const path = function(){
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
                window.location.hash = value.join("/");
            }
        }
    });
    return obj;
}();

export const watchPath = () => window.addEventListener("hashchange",()=>dill.change());

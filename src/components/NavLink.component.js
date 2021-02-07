
import { dill } from "dill";

import { path } from "thyme-core";

export const NavLink = function(){

    this.label = "";

    this.update = () => {
        setTimeout(()=>{
            path.path = path.path;
        },0);
        return false;
    };

    return dill(
        <a href="#{link}"
            class-="class"
            click--="update">{label}</a>
    )
}

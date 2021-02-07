
import { dill } from "dill";

export const Tabs = function(){

    this.tabs = [];
    this.tabContent = null;
    this.active = null;
    this.isActive = function(){
        return this.active === this._item ? "active" : "";
    }
    this.hasTemplate = function(){
        return this.tabContent !== null;
    }

    return dill(
        <>
            <ul class="tabs">
                <li class="{isActive}" click--="tabLogic" dill-for="tabs">{label}</li>
            </ul>

            <div dill-if="hasTemplate" dill-template="tabContent"></div>
        </>
    )
}

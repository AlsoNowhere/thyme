
export const TabModel = function(
    label,
    tabLogic
){
    this.label = label;
    this.tabLogic = tabLogic;

    Object.freeze(this);
}

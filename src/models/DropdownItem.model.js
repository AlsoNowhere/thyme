
export const DropdownItem = function(
    name,
    value = name
){
    this.name = name;
    this.value = value;

    Object.freeze(this);
}

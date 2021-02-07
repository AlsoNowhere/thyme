
export const Route = function(
    url,
    Component
){
    this.url = url;
    this.Component = Component;

    Object.freeze(this);
}

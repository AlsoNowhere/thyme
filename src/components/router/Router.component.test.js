
describe("router component",()=>{

    const testModule = dill.module("testModule");
    const Data = function(){
        this.routes = [
            new Route("example","example")
        ];
    }

    beforeEach(()=>{
        document.body.innerHTML = `
            <router-outlet routes="routes"></router-outlet>
        `;
        dill.render(document.body,Data,testModule);
    });

    afterEach(()=>{
        dill.reset();
    });
});

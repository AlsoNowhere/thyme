export default `<article class="modal {{state}}">
    <div class="content">
        <header>
            <h3>{{label}}</h3>
            <button type="button" (click)="close"></button>
        </header>
        <div dill-template="_template"></div>
    </div>
</article>`
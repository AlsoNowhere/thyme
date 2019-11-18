export default `<table>
    <thead>
        <tr>
            <th dill-for="columns"></th>
        </tr>
    </thead>
    <tbody>
        <tr dill-for="rows">
            <td dill-for="columns">{{content}}</td>
        </tr>
    </tbody>
</table>`
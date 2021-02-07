
import { dill } from "dill";

export const Loading = function(){
    return dill(
        <svg viewBox="0 0 150 150" class="block width height spin">
            <circle cx="75" cy="75" r="60" style="fill:transparent;stroke:#888;stroke-dasharray:300;stroke-width:15px;stroke-linecap:round;" />
        </svg>
    )
}


import { dill } from "dill";

export const defaultFooterContent = dill(
    <>
        <button class="large margin-right-small">Submit</button>

        <button type="button"
            class="smoke large"
            click--="cancel"
            dill-if="hasCancelMethod">{cancelLabel}</button>
    </>
);

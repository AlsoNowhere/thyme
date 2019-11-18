import { Router,
    Route as _Route } from "./components/router/Router.component";
import { Modal,
    closeModal as _closeModal } from "./components/modal/Modal.component";

import { path as _path } from "./services/path/path.service";

export const Route = _Route;
export const path = _path;
export const closeModal = _closeModal;

export const thyme = function(){
    const thyme = dill.module("thyme");

    thyme.setComponent(Router);
    thyme.setComponent(Modal);

    return thyme;
}();

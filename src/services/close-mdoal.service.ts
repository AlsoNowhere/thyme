import { refresh } from "mint";

import { modalTime } from "../data/constatnts.data";

export const closeModal = (target: any, prop: string) => {
  target[prop] = "open closing";
  refresh(target);
  setTimeout(() => {
    target[prop] = "";
    refresh(target);
  }, modalTime);
};

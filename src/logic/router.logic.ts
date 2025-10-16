import { Route } from "../models/Route.model";

export const exact = (target: string, hash: string) => {
  return target === hash;
};

export const contains = (target: string, hash: string) => {
  return hash.includes(target);
};

export const hasWord = (target: string, hash: string) => {
  return hash.includes(` ${hash} `) || exact(target, hash) || starts(target + " ", hash) || ends(" " + target, hash);
};

export const containsAndHyphen = (target: string, hash: string) => {
  return target === hash || hash.includes(target + "-");
};

export const starts = (target: string, hash: string) => {
  return hash.slice(0, target.length) === target;
};

export const ends = (target: string, hash: string) => {
  return hash.slice(hash.length - target.length) === target;
};

export const baseLogic = (route: Route, hash: string) => {
  if (hash.includes("/")) {
    const hashParts = hash.split("/");
    const routeParts = route.target.split("/");
    if (routeParts.length !== hashParts.length) return;
    let doesMatch = true;
    for (let [i, routePart] of routeParts.entries()) {
      const part = hashParts[i];
      if (routePart.at(0) === "{" && routePart.at(-1) === "}") {
        return;
      }
      if (routePart !== part) doesMatch = false;
    }
    if (doesMatch) return route.content;
  }
};

export const exact = (target: string, hash: string) => {
  return target === hash;
};

export const contains = (target: string, hash: string) => {
  return hash.includes(target);
};

export const hasWord = (target: string, hash: string) => {
  return (
    hash.includes(` ${hash} `) ||
    exact(target, hash) ||
    starts(target + " ", hash) ||
    ends(" " + target, hash)
  );
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

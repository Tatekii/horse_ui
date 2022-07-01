export const tuple = <T extends string[]>(...args: T) => args;

export const omit = <T extends object, K extends keyof T>(
  obj: T,
  fields: K[]
): Omit<T, K> => {
  const clone = { ...obj };

  if (Array.isArray(fields)) {
    fields.forEach((key) => {
      delete clone[key];
    });
  }

  return clone;
};

/**
 * https://stackoverflow.com/a/59187769 Extract the type of an element of an array/tuple without
 * performing indexing
 */
export type ElementOf<T> = T extends (infer E)[]
  ? E
  : T extends readonly (infer F)[]
  ? F
  : never;

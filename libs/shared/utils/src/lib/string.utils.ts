/**
 * Returns true for 1, '1', true, 'true' (case-insensitive) . Otherwise false
 *
 * @see {@link [Parse to boolean](https://bloomlab.blogspot.com/2018/06/typescript-recipe-elegant-parse-boolean.html)}
 *
 *
 * FIXME: use zod for this => https://twitter.com/mattpocockuk/status/1615110808219918352
 * @returns true | false
 */
export const primitiveToBoolean = (value: string | number | boolean | null | undefined): boolean => {
  if (typeof value === 'string') {
    return value.toLowerCase() === 'true' || !!+value; // here we parse to number first
  }

  return !!value;
};

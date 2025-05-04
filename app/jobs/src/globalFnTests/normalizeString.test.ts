import { normalizeString } from '../../../global-shared/normalizeString/normalizeString.ts';

const stringExample = '    Este texto CONTIENE: múltiples palabras (06) difíciles de aNaLiZar  &hellip; ?!!?';
const transformedString = normalizeString(stringExample);

it('should remove accents', () => {
  expect(/[\u00C0-\u017F]/g.test(transformedString)).toBeFalsy();
});

it('should return a lowercase string', () => {
  expect(/[A-Z]/g.test(transformedString)).toBeFalsy();
});

it('should   remove the ellipses', () => {
  expect(/hellip/gi.test(transformedString)).toBeFalsy();
});

it('should return a string with no spaces at the beginning or at the end', () => {
  expect(/^\s+|\s+$/g.test(transformedString)).toBeFalsy();
});

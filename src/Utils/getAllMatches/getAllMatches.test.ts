import { getAllMatches } from './getAllMatches';
import data from '#__mocks__/scrappedPage.json';

const language = 'EN';
const propertyToSearch = 'skills';
const stringsToBeMatched = ['React', 'CSS'];

it('should return the 5 most repeated values of a property in an array of objects.', () => {
  const allMatches = getAllMatches({ data, language, propertyToSearch, stringsToBeMatched });

  expect(allMatches).toHaveLength(5);
  expect(allMatches[0][0]).toBe('react');
  expect(allMatches[0][1]).toBe(3);

  expect(allMatches[1][0]).toBe('css');
  expect(allMatches[1][1]).toBe(3);

  expect(allMatches[4][0]).toBe('others');
});

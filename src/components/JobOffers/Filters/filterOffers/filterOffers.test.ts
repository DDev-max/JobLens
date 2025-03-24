import type { FiltersType } from '@/data/types.ts';
import { filterOffers } from './filterOffers';
import originalData from '@/__mocks__/scrappedPage.json';
import { normalizeString } from '@/Utils/normalizeString';

describe('salary filter', () => {
  it('should order the offers by salary in ascending order.', () => {
    const newFilters: FiltersType = {
      location: [''],
      salaryDesc: [false],
      skills: [],
    };

    const sortedData = originalData.toSorted((a, b) => b.salaryPerMonth - a.salaryPerMonth);

    const filteredData = filterOffers({ newFilters, originalData });

    expect(filteredData).toStrictEqual(sortedData);
  });

  it('should order the offers by salary in descending  order.', () => {
    const newFilters: FiltersType = {
      location: [],
      salaryDesc: [true],
      skills: [],
    };

    const sortedData = originalData.toSorted((a, b) => a.salaryPerMonth - b.salaryPerMonth);

    const filteredData = filterOffers({ newFilters, originalData });

    expect(filteredData).toStrictEqual(sortedData);
  });
});

describe('skills filter', () => {
  it('should filter offers by skills when they are in the skills field.', () => {
    const newFilters: FiltersType = {
      location: [],
      salaryDesc: [false],
      skills: ['css'],
    };
    const filteredData = filterOffers({ newFilters, originalData });

    const skillRegexp = new RegExp(`\\b${normalizeString(newFilters.skills[0])}\\b`);

    expect(
      filteredData.every(obj => obj.skills.some(skill => skillRegexp.test(normalizeString(skill))))
    ).toBeTruthy();
    expect(filteredData).toHaveLength(1);
  });

  it('should filter job offers by skills, even if the skill is in the title.', () => {
    const newFilters: FiltersType = {
      location: [],
      salaryDesc: [false],
      skills: ['REACT'],
    };

    const skillsRegexp = new RegExp(
      `\\b(${newFilters.skills.map(skill => normalizeString(skill)).join('|')})\\b`
    );

    const filteredData = filterOffers({ newFilters, originalData });

    expect(filteredData).toHaveLength(2);
    expect(
      filteredData.every(
        obj =>
          obj.skills.some(str => skillsRegexp.test(normalizeString(str))) ||
          skillsRegexp.test(normalizeString(obj.jobTitle))
      )
    ).toBeTruthy();
  });

  it('should filter multiple skills', () => {
    const newFilters: FiltersType = {
      location: [],
      salaryDesc: [false],
      skills: ['php', 'javascript'],
    };
    const filteredData = filterOffers({ newFilters, originalData });
    const firstSkillRegexp = new RegExp(`\\b${normalizeString(newFilters.skills[0])}\\b`);
    const secondSkillRegexp = new RegExp(`\\b${normalizeString(newFilters.skills[1])}\\b`);

    expect(filteredData).toHaveLength(1);
    expect(
      filteredData.every(
        obj =>
          obj.skills.some(str => firstSkillRegexp.test(normalizeString(str))) &&
          obj.skills.some(str => secondSkillRegexp.test(normalizeString(str)))
      )
    ).toBeTruthy();
  });
});

it('should filter by location', () => {
  const newFilters: FiltersType = {
    location: ['Remote'],
    salaryDesc: [false],
    skills: [],
  };

  const filteredData = filterOffers({ newFilters, originalData });

  const locationRegexp = new RegExp(`\\b${normalizeString(newFilters.location[0] || '')}\\b`);

  expect(filteredData).toHaveLength(2);
  expect(filteredData.every(obj => locationRegexp.test(normalizeString(obj.location)))).toBeTruthy();
});

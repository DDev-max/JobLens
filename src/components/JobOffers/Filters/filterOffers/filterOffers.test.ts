import type { FiltersType } from '@/data/types.ts';
import { filterOffers } from './filterOffers';
import dataNoSalary from '@/__mocks__/scrappedPage.json';
import { normalizeString } from '@/Utils/normalizeString/normalizeString';
import { salaryConversion } from '@/Utils/salaryConversion/salaryConversion';

const dataWithSalaryAvg = dataNoSalary.map(job => {
  job.salaryPerMonth = salaryConversion({
    currency: '$',
    salaryDescription: job.salary,
  });
  return job;
});

describe('salary filter', () => {
  it('should order the offers by salary in ascending order.', () => {
    const newFilters: FiltersType = {
      location: [''],
      salaryDesc: [false],
      skills: [],
    };

    const sortedData = dataWithSalaryAvg.toSorted((a, b) => b.salaryPerMonth - a.salaryPerMonth);

    const filteredData = filterOffers({ newFilters, originalData: dataWithSalaryAvg });

    expect(filteredData).toStrictEqual(sortedData);
  });

  it('should order the offers by salary in descending  order.', () => {
    const newFilters: FiltersType = {
      location: [],
      salaryDesc: [true],
      skills: [],
    };

    const sortedData = dataWithSalaryAvg.toSorted((a, b) => a.salaryPerMonth - b.salaryPerMonth);

    const filteredData = filterOffers({ newFilters, originalData: dataWithSalaryAvg });

    expect(filteredData).toStrictEqual(sortedData);
  });
});

describe('skills filter', () => {
  it('should filter offers by skills when they are in the skills field.', () => {
    const newFilters: FiltersType = {
      location: [],
      salaryDesc: [false],
      skills: ['javaScript'],
    };
    const filteredData = filterOffers({ newFilters, originalData: dataWithSalaryAvg });

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
      skills: ['FRONTEND'],
    };

    const skillsRegexp = new RegExp(
      `\\b(${newFilters.skills.map(skill => normalizeString(skill)).join('|')})\\b`
    );

    const filteredData = filterOffers({ newFilters, originalData: dataWithSalaryAvg });

    expect(filteredData).toHaveLength(1);
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
      skills: ['rEaCt', 'iOS'],
    };
    const filteredData = filterOffers({ newFilters, originalData: dataWithSalaryAvg });
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

describe('location filter', () => {
  it('should filter by location', () => {
    const newFilters: FiltersType = {
      location: ['Remote'],
      salaryDesc: [false],
      skills: [],
    };

    const filteredData = filterOffers({ newFilters, originalData: dataWithSalaryAvg });

    const locationRegexp = new RegExp(`\\b${normalizeString(newFilters.location[0] || '')}\\b`);

    expect(filteredData).toHaveLength(1);
    expect(filteredData.every(obj => locationRegexp.test(normalizeString(obj.location)))).toBeTruthy();
  });
});

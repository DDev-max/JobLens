import { daysPerWeek, hoursPerDay, thousandAbbreviation, weeksPerMonth } from '#ui/shared/consts.ts';
import { getSalaryAvg } from './getSalaryAvg';

const mostUsedCurrency = '$';

it('should return the average from an array of salaries.', () => {
  const salaryDescription = ['$100K', '$100K - $200K', '$700 per hour'];

  const average = getSalaryAvg({ mostUsedCurrency, salaryDescription });

  const expectedAverage =
    ((100 + (100 + 200) / 2) * thousandAbbreviation + 700 * hoursPerDay * daysPerWeek * weeksPerMonth) /
    salaryDescription.length;

  expect(average).toEqual(expectedAverage.toFixed(2));
});

it('shouldnt include a salary that doesnt match the most used currency', () => {
  const salaryDescription = ['$500K', '$1500K', '₡9999K'];
  const average = getSalaryAvg({ mostUsedCurrency, salaryDescription });

  expect(average).toBe((((500 + 1500) / 2) * thousandAbbreviation).toFixed(2));
});

import { getMostUsedCurrency } from './getMostUsedCurrency';

const salaryDescription = [
  'MX$15K - MX$18K (Employer est.)',
  ' MX$40K - MX$50K',
  '€27K - €32K (Employer est.)',
];

it('should return the most used currency within an array of salaries.', () => {
  const mostUsedCurrency = getMostUsedCurrency({ salaryDescription });

  expect(mostUsedCurrency).toBe('$');
});

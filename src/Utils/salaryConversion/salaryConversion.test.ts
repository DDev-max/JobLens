import { daysPerWeek, hoursPerDay, thousandAbbreviation, weeksPerMonth } from '#data/consts';
import { salaryConversion } from './salaryConversion';

const currency = '$';

it('should convert a string containing the salary to a number', () => {
  const salaryDescription = '$150K (Employer est.)';
  const salaryNumber = salaryConversion({ currency, salaryDescription });

  expect(salaryNumber).toBe(150 * thousandAbbreviation);
});

it('should convert a string containing a salary range to an intermediate number', () => {
  const salaryDescription = '$99.95 - $199.95';
  const salaryAvg = salaryConversion({ currency, salaryDescription });

  expect(salaryAvg).toBe((99.95 + 199.95) / 2);
});

it('should convert a string containing the hourly wage into an average monthly salary', () => {
  const salaryDescription = '$25.00 - $50.00 Per Hour ';
  const salaryAvg = salaryConversion({ currency, salaryDescription });

  expect(salaryAvg).toBe(((25.0 + 50.0) / 2) * hoursPerDay * daysPerWeek * weeksPerMonth);
});

it('should convert a string containing the hourly wage into an average monthly salary even if its abbreviated', () => {
  const salaryDescription = '$100K - $250K Per Hour (Employer est.)';
  const salaryAvg = salaryConversion({ currency, salaryDescription });

  expect(salaryAvg).toBe(
    ((100 + 250) / 2) * thousandAbbreviation * hoursPerDay * daysPerWeek * weeksPerMonth
  );
});

it('should return a 0 if the salary does not match the current currency', () => {
  const salaryDescription = '₡100K - ₡500K';
  const salaryAvg = salaryConversion({ currency, salaryDescription });

  expect(salaryAvg).toBe(0);
});

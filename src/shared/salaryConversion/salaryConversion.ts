import {
  thousandAbbreviation,
  daysPerWeek,
  hoursPerDay,
  weeksPerMonth,
  moneyRegex,
} from '#search/ui/shared/consts.ts'

interface SalaryConversionParams {
  currency: string
  salaryDescription: string
}

export function salaryConversion({ currency, salaryDescription }: SalaryConversionParams) {
  if (!currency || !salaryDescription || !salaryDescription.length) return 0

  const salary: readonly string[] = salaryDescription.match(moneyRegex) || []

  const noCurrency = salary.map(el => el.replaceAll(currency, ''))

  const numberConversion = noCurrency.map(el => {
    if (/k/i.test(el)) {
      return Number(el.replace(/k/gi, '')) * thousandAbbreviation || 0
    }
    return Number(el) || 0
  })

  const sum =
    numberConversion.length > 1 ? numberConversion.reduce((prev, next) => prev + next) : numberConversion[0]

  const rangeAvg = sum / numberConversion.length

  if (/per hour/i.test(salaryDescription)) {
    return rangeAvg * hoursPerDay * daysPerWeek * weeksPerMonth
  }
  return rangeAvg
}

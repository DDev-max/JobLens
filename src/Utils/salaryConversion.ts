interface SalaryConversionParams {
  salary: readonly string[]
  currency: string
  salaryDescription: readonly string[] | string
  descIndex?: number
}

export function salaryConversion({ salary, currency, descIndex, salaryDescription }: SalaryConversionParams) {
  if (!salary.length || !currency || !salaryDescription) return 0

  const noCurrency = salary.map(el => el.replaceAll(currency, ''))

  const numberConversion = noCurrency.map(el => {
    if (/k/i.test(el)) {
      return Number(el.replace('K', '')) * 1000
    }
    return Number(el)
  })

  const sum =
    numberConversion.length > 1 ? numberConversion.reduce((prev, next) => prev + next) : numberConversion[0]

  const rangeAvg = sum / numberConversion.length

  if (Array.isArray(salaryDescription) && descIndex === undefined) {
    throw new Error('Index must be provided when "salaryDescription" is an array')
  }

  const salaryInfo = typeof salaryDescription === 'string' ? salaryDescription : salaryDescription[descIndex!]

  if (/per hour/i.test(salaryInfo)) {
    return rangeAvg * 8 * 5 * 4 // 8h 5d 4 weeks
  }
  return rangeAvg
}

import { currencies, moneyRegex } from 'global-shared-joblens'

interface GetMostUsedCurrencyParams {
  salaryDescription: string[]
}

export function getMostUsedCurrency({ salaryDescription }: GetMostUsedCurrencyParams) {
  const currenciesCoincidences: Record<string, number> = {}

  const salaries: string[][] = []
  salaryDescription.forEach(el => {
    const match = el.match(moneyRegex)
    if (match) {
      salaries.push([...match])
    }
  })

  salaries.flat().map(el => {
    const onlyCurrency = el.replace(new RegExp(`[^${currencies}]\\S+`, 'g'), '')
    if (currenciesCoincidences[onlyCurrency]) {
      currenciesCoincidences[onlyCurrency] += 1
    } else {
      currenciesCoincidences[onlyCurrency] = 1
    }
  })

  const sortedCurrencies = Object.entries(currenciesCoincidences).sort((a, b) => b[1] - a[1])

  return sortedCurrencies[0][0]
}

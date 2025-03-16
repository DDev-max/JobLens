import { currencies, moneyRegex } from '@/data/consts'
import type { JobDescription } from '@/data/types'
import { salaryConversion } from './salaryConversion'

interface GetSalaryMeanProps {
  data: readonly JobDescription[]
}

export function getSalaryAvg({ data }: GetSalaryMeanProps) {
  const salariesOriginal = data.map(obj => obj.salary).filter(salary => salary)

  if (!salariesOriginal.length) return {}

  const salaries: string[][] = []
  salariesOriginal.forEach(el => {
    const match = el.match(moneyRegex)
    if (match) {
      salaries.push([...match])
    }
  })

  const currenciesCoincidences: Record<string, number> = {}

  salaries.flat().map(el => {
    const onlyCurrency = el.replace(new RegExp(`[^${currencies}]\\S+`, 'g'), '')
    if (currenciesCoincidences[onlyCurrency]) {
      currenciesCoincidences[onlyCurrency] += 1
    } else {
      currenciesCoincidences[onlyCurrency] = 1
    }
  })

  const sortedCurrencies = Object.entries(currenciesCoincidences).sort((a, b) => b[1] - a[1])

  const mostUsedCurrency = sortedCurrencies[0][0]

  const salariesPerMonth: number[] = []

  salaries.forEach((salary, descIndex) => {
    if (!salary.some(el => el.includes(mostUsedCurrency))) return

    const rangeAvg = salaryConversion({ salary, currency: mostUsedCurrency, descIndex, salaryDescription: salariesOriginal })

    salariesPerMonth.push(rangeAvg)
  })
  const salariesSum = salariesPerMonth.reduce((prev, next) => prev + next)

  const salaryAvg = (salariesSum / salariesPerMonth.length).toFixed(2)

  return { salaryAvg, currency: mostUsedCurrency }
}

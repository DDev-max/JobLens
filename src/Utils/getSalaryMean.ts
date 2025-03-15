import type { JobDescription } from '@/data/types'

interface GetSalaryMeanProps {
  data: readonly JobDescription[]
}

export function getSalaryAvg({ data }: GetSalaryMeanProps) {
  const salariesOriginal = data.map(obj => obj.salary).filter(salary => salary)

  if (!salariesOriginal.length) return {}

  const currencies = '€¥₡₩$£'
  const currencyRegex = new RegExp(`[${currencies}]\\S+`, 'g')

  const salaries: string[][] = []
  salariesOriginal.forEach(el => {
    const match = el.match(currencyRegex)
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

  const realSalaries = salaries.map((subArray, FullIdx) => {
    if (!subArray.some(el => el.includes(mostUsedCurrency))) return

    let realValue = 0
    subArray.forEach(el => {
      const noCurrencyElmnt = el.replace(mostUsedCurrency, '')
      let currentElement: string | number = noCurrencyElmnt

      if (noCurrencyElmnt.includes('K')) {
        currentElement = Number(currentElement.replace('K', ''))
        realValue += currentElement * 1000 // $100K = 100 000
      }

      if (salariesOriginal[FullIdx].includes('Per Hour')) {
        realValue += Number(currentElement) * 8 * 5 * 4 //8h 5d 4 weeks
      }
    })

    return realValue
  })

  const salariesSum = realSalaries.filter(valor => valor !== undefined).reduce((acumulador, valorActual) => acumulador + valorActual, 0)

  const salaryAvg = (salariesSum / realSalaries.length).toFixed(2)

  return { salaryAvg, currency: mostUsedCurrency }
}

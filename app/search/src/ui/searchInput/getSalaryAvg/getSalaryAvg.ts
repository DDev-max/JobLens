import { moneyRegex, salaryConversion } from 'global-shared-joblens'

interface GetSalaryMeanProps {
  salaryDescription: string[]
  mostUsedCurrency: string
}

export function getSalaryAvg({ mostUsedCurrency, salaryDescription }: GetSalaryMeanProps) {
  const salaries: string[][] = []
  salaryDescription.forEach(el => {
    const match = el.match(moneyRegex)
    if (match) {
      salaries.push([...match])
    }
  })

  const salariesPerMonth: number[] = []

  salaries.forEach((salary, descIndex) => {
    if (!salary.some(el => el.includes(mostUsedCurrency))) return

    const rangeAvg = salaryConversion({
      currency: mostUsedCurrency,
      salaryDescription: salaryDescription[descIndex],
    })

    salariesPerMonth.push(rangeAvg)
  })
  const salariesSum = salariesPerMonth.reduce((prev, next) => prev + next)

  const salaryAvg = (salariesSum / salariesPerMonth.length).toFixed(2)

  return salaryAvg
}

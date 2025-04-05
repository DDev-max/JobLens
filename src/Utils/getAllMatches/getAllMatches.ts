import { grammarWords } from '@/data/consts'
import type { JobDescription, SupportedLanguageKeys } from '@/data/types.ts'
import { normalizeString } from '@/Utils/normalizeString/normalizeString'

interface GetAllMatchesProps {
  stringsToBeMatched: readonly string[]
  data: readonly JobDescription[]
  propertyToSearch: 'location' | 'skills'
  language: SupportedLanguageKeys
}

export function getAllMatches({ stringsToBeMatched, data, propertyToSearch, language }: GetAllMatchesProps) {
  const cleanStrs2BMatched = stringsToBeMatched.map(string => normalizeString(string))
  const nameQttyObj: Record<string, number> = {}

  const flatCleanValues = data.flatMap(({ [propertyToSearch]: value, jobTitle }) => {
    const values = []

    const parsedString = Array.isArray(value)
      ? value.map(el => normalizeString(el)).join('|')
      : normalizeString(value)

    const skillRegexp = new RegExp(`\\b(${parsedString})\\b`)

    const isInTitleAndSkills = skillRegexp.test(normalizeString(jobTitle))

    values.push(...(Array.isArray(value) ? value.map(normalizeString) : [normalizeString(value)]))
    if (propertyToSearch === 'skills' && !isInTitleAndSkills) values.push(normalizeString(jobTitle))

    return values
  })

  const noGrammarRegexp = new RegExp(`\\b(${grammarWords[language].join('|')})\\b`, 'gi')

  const noGrammarWords = flatCleanValues.map(el => el?.replace(noGrammarRegexp, ''))

  const toSearchRegex = new RegExp(`\\b(${cleanStrs2BMatched.join('|')})\\b`, 'gi')

  cleanStrs2BMatched.forEach(el => (nameQttyObj[el] = 0))

  noGrammarWords.forEach(el => {
    if (!el) return
    const cleanElement = normalizeString(el)

    if (!cleanElement) return

    const matches = [...cleanElement.matchAll(toSearchRegex)]

    if (matches.length) {
      matches.forEach(match => {
        nameQttyObj[match[0]] += 1
      })

      return
    }

    if (cleanElement.length > 20) return

    if (nameQttyObj[cleanElement]) {
      nameQttyObj[cleanElement] += 1
    } else {
      nameQttyObj[cleanElement] = 1
    }
  })

  const nameQttyArray = Object.entries(nameQttyObj)

  const requestedValues: [string, number][] = []

  nameQttyArray.forEach(subArray => {
    if (cleanStrs2BMatched.some(string => subArray[0].includes(string))) {
      requestedValues.push(subArray)
    }
  })

  const nameQttySorted = nameQttyArray.toSorted((a, b) => {
    if (cleanStrs2BMatched.some(str => str === a[0] || str === b[0])) return 1
    return b[1] - a[1]
  })

  const otherValues = nameQttySorted.slice(5)

  const sumOthers = otherValues.reduce((prev, next) => prev + next[1], 0)

  const top5 = nameQttySorted.slice(0, 4)
  top5.push(['others', sumOthers])

  return top5
}

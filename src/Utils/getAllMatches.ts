import type { JobDescription, SupportedLanguageKeys } from '@/data/types.ts'
import { grammarWords } from '../data/consts'
import { normalizeString } from './normalizeString'

interface GetAllMatchesProps {
  stringsToBeMatched: readonly string[]
  data: readonly JobDescription[]
  propertyToSearch: 'location' | 'skills' | 'orgName'
  language: SupportedLanguageKeys
}

export function getAllMatches({ stringsToBeMatched, data, propertyToSearch, language }: GetAllMatchesProps) {
  const cleanStrs2BMatched = stringsToBeMatched.map(string => normalizeString(string))
  const nameQttyObj: Record<string, number> = {}

  const flatCleanValues = data.flatMap(({ [propertyToSearch]: value }) => {
    if (!value) return []
    return Array.isArray(value) ? value.map(normalizeString) : [normalizeString(value)]
  })

  const noGrammarRegexp = new RegExp(`\\b(${grammarWords[language].join('|')})\\b`, 'gi')

  const noGrammarWords = flatCleanValues.map(el => el?.replace(noGrammarRegexp, ''))

  const toSearchRegex = new RegExp(`\\b(${cleanStrs2BMatched.join('|')})\\b`, 'gi')

  cleanStrs2BMatched.forEach(el => (nameQttyObj[el] = 0))

  noGrammarWords.forEach(el => {
    if (!el) return
    const cleanElement = normalizeString(el).replace('hellip', '') // &hellip; (ellipsis)  Their HTML seems to be broken

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

  const nameQttySorted = nameQttyArray.sort((a, b) => {
    if (cleanStrs2BMatched.some(str => str === a[0] || str === b[0])) return 1
    return b[1] - a[1]
  })

  return nameQttySorted.slice(0, 5)
}

import { text1 } from './comparisons/text1'
import { text2 } from './comparisons/text2'

const text1Name = 'GitHub'
const text2Name = 'Jira'

const ignoreList: string[] = []

/** Matches a hyphen followed by 4 digits,
 *  then a non-digit character or the end of the string.
 *  EX: '-1234' or '-1234.' or '-1234 '
 */
const regex = /-\d{4}(\D|$)/g

const getMatches = (text: string) => {
  const matches = text.match(regex) || []
  return [...new Set(matches.map(match => match.replace(/\D/g, '')))].filter(
    match => !ignoreList.includes(match)
  )
}

const uniqueAndCommonMatches = (arr1: string[], arr2: string[]) => {
  const uniqueToFirst = arr1.filter(item => !arr2.includes(item))
  const uniqueToSecond = arr2.filter(item => !arr1.includes(item))
  const common = arr1.filter(item => arr2.includes(item))
  return { uniqueToFirst, uniqueToSecond, common }
}

const {
  uniqueToFirst: uniqueToText1,
  uniqueToSecond: uniqueToText2,
  common: inBoth,
} = uniqueAndCommonMatches(getMatches(text1), getMatches(text2))

console.log('\x1b[31m', `Unique to ${text1Name}:`, uniqueToText1)
console.log('\x1b[34m', `Unique to ${text2Name}:`, uniqueToText2)
console.log('\x1b[37m', 'Common to both:', inBoth)

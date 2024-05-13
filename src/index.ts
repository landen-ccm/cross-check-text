import { GitHub } from './comparisons/GitHub'
import { Jira } from './comparisons/Jira'
import { deploymentTicket } from './comparisons/Ignore'

const ignoreList: string[] = [...(deploymentTicket || [])]

/** Matches a hyphen followed by 4 digits,
 *  then a non-digit character or the end of the string.
 *  EX: '-1234' or '-1234/' or '-1234 '
 */
const matchRegex = /-\d{4}(\D|$)/g

// For removing non-digit characters
const formatRegex = /\D/g

const getMatches = (text: string) => {
  const matches = text.match(matchRegex) || []
  return [
    ...new Set(matches.map(match => match.replace(formatRegex, ''))),
  ].filter(match => !ignoreList.includes(match))
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
} = uniqueAndCommonMatches(getMatches(GitHub), getMatches(Jira))

console.log('\x1b[31m', `Unique to GitHub:`, uniqueToText1)
console.log('\x1b[34m', `Unique to Jira:`, uniqueToText2)
console.log('\x1b[37m', 'Common to both:', inBoth)

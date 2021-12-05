import {
  countSimpleOverlappingPoints,
  countOverlappingPoints,
} from '~/puzzle/day-5'
import { getInput } from '~/inputs'

describe('Part 1 - countSimpleOverlappingPoints', () => {
  it('should answer example', () => {
    const data = `
      0,9 -> 5,9
      8,0 -> 0,8
      9,4 -> 3,4
      2,2 -> 2,1
      7,0 -> 7,4
      6,4 -> 2,0
      0,9 -> 2,9
      3,4 -> 1,4
      0,0 -> 8,8
      5,5 -> 8,2
    `

    expect(countSimpleOverlappingPoints(data)).toBe(5)
  })

  it('should answer puzzle', () => {
    const data = getInput('day-5')

    expect(countSimpleOverlappingPoints(data)).toMatchInlineSnapshot(`4655`)
  })
})

describe('Part 2 - countOverlappingPoints', () => {
  it('should answer example', () => {
    const data = `
      0,9 -> 5,9
      8,0 -> 0,8
      9,4 -> 3,4
      2,2 -> 2,1
      7,0 -> 7,4
      6,4 -> 2,0
      0,9 -> 2,9
      3,4 -> 1,4
      0,0 -> 8,8
      5,5 -> 8,2
    `

    expect(countOverlappingPoints(data)).toBe(12)
  })

  it('should answer puzzle', () => {
    const data = getInput('day-5')

    expect(countOverlappingPoints(data)).toMatchInlineSnapshot(`20500`)
  })
})

import { sumLowPoints, multiplyLargestBasins } from '~/puzzle/day-9'
import { getInput } from '~/inputs'

describe('Methods', () => {
  /** Methods */
})

describe('Part 1', () => {
  it('should answer example', () => {
    const data = `
      2199943210
      3987894921
      9856789892
      8767896789
      9899965678
    `

    expect(sumLowPoints(data)).toBe(15)
  })

  it('should answer puzzle', () => {
    const data = getInput('day-9')

    expect(sumLowPoints(data)).toMatchInlineSnapshot(`594`)
  })
})

describe('Part 2', () => {
  it('should answer example', () => {
    const data = `
    2199943210
    3987894921
    9856789892
    8767896789
    9899965678
  `

    expect(multiplyLargestBasins(data)).toBe(1134)
  })

  it('should answer puzzle', () => {
    const data = getInput('day-9')
    const value = multiplyLargestBasins(data)

    expect(value).toMatchInlineSnapshot(`858494`)
  })
})

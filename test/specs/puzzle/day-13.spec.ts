import { fold, countPixels, plot } from '~/puzzle/day-13'
import { getInput } from '~/inputs'

describe('Part 1 ', () => {
  it('should answer example', () => {
    const data = `
      6,10
      0,14
      9,10
      0,3
      10,4
      4,11
      6,0
      6,12
      4,1
      0,13
      10,12
      3,4
      3,0
      8,4
      1,10
      2,14
      8,10
      9,0

      fold along y=7
      fold along x=5
    `

    expect(countPixels(fold(data, 1))).toBe(17)
    expect(countPixels(fold(data))).toBe(16)
  })

  it('should answer puzzle', () => {
    const data = getInput('day-13')

    expect(countPixels(fold(data, 1))).toMatchInlineSnapshot(`775`)
  })
})

describe('Part 2', () => {
  it('should answer puzzle', () => {
    const data = getInput('day-13')

    // console.log(plot(fold(data))) // eslint-disable-line no-console
  })
})

import { calculateLowestRisk, second, ExcludePosition } from '~/puzzle/day-15'
import { getInput } from '~/inputs'

describe('Methods', () => {
  /** Methods */
})

function calc(data: string, l: number, p: ExcludePosition = {}) {
  const arr = Array(l).fill(0)
    .map((placeholder, index) => index)
    .map((index) => {
      return [
        index,
        calculateLowestRisk(data, index, p),
      ]
    })
    .filter(([, risk]) => risk) as Array<[number, number]>

  return arr
}

describe('Part 1 ', () => {
  it('should answer example', () => {
    const data = `
      1163751742
      1381373672
      2136511328
      3694931569
      7463417111
      1319128137
      1359912421
      3125421639
      1293138521
      2311944581
    `
    const data2 = getInput('day-15')

    const count = 1
    const pos = [
      { top: true, left: true },
      // { top: true },
      // { left: true },
    ].flatMap((p) => calc(data, count, p))


    const arr2 = pos
      .sort(([,r1], [, r2]) => r1 - r2)

    // console.log(arr2[0][1])

    // expect(calculateLowestRisk(data, 7)).toBe(40)
  })
})

describe('Part 2', () => {
  it('should answer example', () => {
    const data = ``

    expect(second(data)).toBe(0)
  })

  it('should answer puzzle', () => {
    const data = getInput('day-15')

    expect(second(data)).toMatchInlineSnapshot(`0`)
  })
})

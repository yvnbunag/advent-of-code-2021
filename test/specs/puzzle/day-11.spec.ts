import { calculateFlashes, calculateSynchronization } from '~/puzzle/day-11'
import { getInput } from '~/inputs'

describe('Part 1', () => {
  it('should answer example', () => {
    const data = `
      5483143223
      2745854711
      5264556173
      6141336146
      6357385478
      4167524645
      2176841721
      6882881134
      4846848554
      5283751526
    `

    expect(calculateFlashes(data, 100)).toBe(1656)
  })

  it('should answer puzzle', () => {
    const data = getInput('day-11')

    expect(calculateFlashes(data, 100)).toMatchInlineSnapshot(`1669`)
  })
})

describe('Part 2', () => {
  it('should answer example', () => {
    const data = `
      5483143223
      2745854711
      5264556173
      6141336146
      6357385478
      4167524645
      2176841721
      6882881134
      4846848554
      5283751526
    `

    expect(calculateSynchronization(data)).toBe(195)
  })

  it('should answer puzzle', () => {
    const data = getInput('day-11')

    expect(calculateSynchronization(data)).toMatchInlineSnapshot(`351`)
  })
})

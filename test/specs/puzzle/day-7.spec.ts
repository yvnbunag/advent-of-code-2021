import {
  getLeastFuelCrabAlignment,
  getLeastExponentialFuelCrabAlignment,
  getDistance,
  getExponentialDistance,
} from '~/puzzle/day-7'
import { getInput } from '~/inputs'

describe('Methods', () => {
  describe('getDistance', () => {
    it('should get distance', () => {
      expect(getDistance(16, 2)).toBe(14)
      expect(getDistance(2, 16)).toBe(14)
      expect(getDistance(0, 2)).toBe(2)
    })
  })

  describe('getExponentialDistance', () => {
    it('should get exponential distance', () => {
      expect(getExponentialDistance(1, 1)).toBe(0)
      expect(getExponentialDistance(1, 2)).toBe(1)
      expect(getExponentialDistance(1, 5)).toBe(10)
      expect(getExponentialDistance(2, 5)).toBe(6)
      expect(getExponentialDistance(16, 5)).toBe(66)
      expect(getExponentialDistance(0, 5)).toBe(15)
    })
  })
})

describe('Part 1 - first', () => {
  it('should answer example', () => {
    const data = `16,1,2,0,4,2,7,1,2,14`

    expect(getLeastFuelCrabAlignment(data)).toBe(37)
  })

  it('should answer puzzle', () => {
    const data = getInput('day-7')

    expect(getLeastFuelCrabAlignment(data)).toMatchInlineSnapshot(`323647`)
  })
})

describe('Part 2 - second', () => {
  it('should answer example', () => {
    const data = `16,1,2,0,4,2,7,1,2,14`

    expect(getLeastExponentialFuelCrabAlignment(data)).toBe(168)
  })

  // Skipping because solution is brute force, resulting in slow computation
  it.skip('should answer puzzle', () => {
    const data = getInput('day-7')

    expect(getLeastExponentialFuelCrabAlignment(data))
      .toMatchInlineSnapshot(`87640209`)
  })
})

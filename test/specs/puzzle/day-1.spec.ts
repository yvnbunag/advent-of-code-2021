import { calculateIncrease, calculateGroupedIncrease } from '~/puzzle/day-1'
import { getInput } from '~/inputs'

describe('Part 1 - calculateIncrease', () => {
  it('should calculate no increase', () => {
    const report = `
        201
        200
        199
        198
      `
    expect(calculateIncrease(report)).toBe(0)
  })

  it('should calculate one increase', () => {
    const report = `
        199
        200
        199
        198
      `
    expect(calculateIncrease(report)).toBe(1)
  })

  it('should calculate multiple increases', () => {
    const report = `
        199
        200
        201
        199
      `
    expect(calculateIncrease(report)).toBe(2)
  })

  it('should calculate multiple spaced increases', () => {
    const report = `
        199
        200
        199
        201
      `
    expect(calculateIncrease(report)).toBe(2)
  })

  it('should answer example', () => {
    const report = `
        199
        200
        208
        210
        200
        207
        240
        269
        260
        263
      `
    expect(calculateIncrease(report)).toBe(7)
  })

  it('should answer puzzle', () => {
    const report = getInput('day-1')

    expect(calculateIncrease(report)).toMatchInlineSnapshot(`1226`)
  })
})

describe('Part 2 - calculateGroupedIncrease', () => {
  it('should answer example', () => {
    const report = `
        199
        200
        208
        210
        200
        207
        240
        269
        260
        263
      `

    expect(calculateGroupedIncrease(report)).toBe(5)
  })

  it('should answer puzzle', () => {
    const report = getInput('day-1')

    expect(calculateGroupedIncrease(report)).toMatchInlineSnapshot(`1252`)
  })
})

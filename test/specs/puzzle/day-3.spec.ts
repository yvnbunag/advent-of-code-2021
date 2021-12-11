import { calculateRates, calculateLifeSupport } from '~/puzzle/day-3'
import { getInput } from '~/inputs'

describe('Part 1', () => {
  it('should answer example', () => {
    const report = `
      00100
      11110
      10110
      10111
      10101
      01111
      00111
      11100
      10000
      11001
      00010
      01010
    `
    const rate = calculateRates(report)

    expect(rate).toEqual({ gamma: '10110', epsilon: '01001' })

    const answer = parseInt(rate.gamma, 2) * parseInt(rate.epsilon, 2)

    expect(answer).toMatchInlineSnapshot(`198`)
  })

  it('should answer puzzle', () => {
    const report = getInput('day-3')
    const rate = calculateRates(report)
    const answer = parseInt(rate.gamma, 2) * parseInt(rate.epsilon, 2)

    expect(answer).toMatchInlineSnapshot(`3320834`)
  })
})

describe('Part 2', () => {
  it('should answer example', () => {
    const report = `
      00100
      11110
      10110
      10111
      10101
      01111
      00111
      11100
      10000
      11001
      00010
      01010
    `
    const lifeSupport = calculateLifeSupport(report)

    expect(lifeSupport).toEqual({ O2: '10111', CO2: '01010' })

    const answer = parseInt(lifeSupport.O2, 2) * parseInt(lifeSupport.CO2, 2)

    expect(answer).toBe(230)
  })

  it('should answer puzzle', () => {
    const report = getInput('day-3')
    const lifeSupport = calculateLifeSupport(report)
    const answer = parseInt(lifeSupport.O2, 2) * parseInt(lifeSupport.CO2, 2)

    expect(answer).toMatchInlineSnapshot(`4481199`)
  })
})

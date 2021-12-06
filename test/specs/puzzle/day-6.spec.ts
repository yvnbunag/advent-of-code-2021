import { observeLanternFishSchool } from '~/puzzle/day-6'
import { getInput } from '~/inputs'

describe('Part 1 - first', () => {
  it('should answer example', () => {
    const data = `3,4,3,1,2`

    expect(observeLanternFishSchool(data, 18)).toBe(26)
    expect(observeLanternFishSchool(data, 80)).toBe(5934)
  })

  it('should answer puzzle', () => {
    const data = getInput('day-6')

    expect(observeLanternFishSchool(data, 80)).toMatchInlineSnapshot(`386640`)
  })
})

describe('Part 2 - second', () => {
  it('should answer puzzle', () => {
    const data = getInput('day-6')

    expect(observeLanternFishSchool(data, 256)).toMatchInlineSnapshot(`1733403626279`)
  })
})

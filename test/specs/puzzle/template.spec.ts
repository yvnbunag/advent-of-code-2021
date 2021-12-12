import { first, second } from '~/puzzle/template'
import { getInput } from '~/inputs'

describe('Methods', () => {
  /** Methods */
})

describe('Part 1 ', () => {
  it('should answer example', () => {
    const data = ``

    expect(first(data)).toBe(0)
  })

  it('should answer puzzle', () => {
    const data = getInput('template')

    expect(first(data)).toMatchInlineSnapshot(`0`)
  })
})

describe('Part 2', () => {
  it('should answer example', () => {
    const data = ``

    expect(second(data)).toBe(0)
  })

  it('should answer puzzle', () => {
    const data = getInput('template')

    expect(second(data)).toMatchInlineSnapshot(`0`)
  })
})

import { first, second } from '~/puzzle/day-10'
import { getInput } from '~/inputs'

describe('Methods', () => {
  /** Methods */
})

describe('Part 1 - first', () => {
  it('should answer example', () => {
    const data = `
      [({(<(())[]>[[{[]{<()<>>
      [(()[<>])]({[<{<<[]>>(
      {([(<{}[<>[]}>{[]{[(<()>
      (((({<>}<{<{<>}{[]{[]{}
      [[<[([]))<([[{}[[()]]]
      [{[{({}]{}}([{[{{{}}([]
      {<[[]]>}<{[{[{[]{()[[[]
      [<(<(<(<{}))><([]([]()
      <{([([[(<>()){}]>(<<{{
      <{([{{}}[<[[[<>{}]]]>[]]
    `

    expect(first(data)).toBe(26397)
  })

  it('should answer puzzle', () => {
    const data = getInput('day-10')

    expect(first(data)).toMatchInlineSnapshot(`464991`)
  })
})

describe('Part 2 - second', () => {
  it('should answer example', () => {
    const data = `
      [({(<(())[]>[[{[]{<()<>>
      [(()[<>])]({[<{<<[]>>(
      {([(<{}[<>[]}>{[]{[(<()>
      (((({<>}<{<{<>}{[]{[]{}
      [[<[([]))<([[{}[[()]]]
      [{[{({}]{}}([{[{{{}}([]
      {<[[]]>}<{[{[{[]{()[[[]
      [<(<(<(<{}))><([]([]()
      <{([([[(<>()){}]>(<<{{
      <{([{{}}[<[[[<>{}]]]>[]]
    `

    expect(second(data)).toBe(288957)
  })

  it('should answer puzzle', () => {
    const data = getInput('day-10')

    expect(second(data)).toMatchInlineSnapshot(`3662008566`)
  })
})

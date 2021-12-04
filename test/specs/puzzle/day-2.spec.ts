import { calculatePosition, calculateComplicatedPosition } from '~/puzzle/day-2'
import { getInput } from '~/inputs'

describe('Part 1 - calculatePosition', () => {
  it('should answer example', () => {
    const input = `
        forward 5
        down 5
        forward 8
        up 3
        down 8
        forward 2
      `
    const position = calculatePosition(input)
    const answer = position.horizontal * position.depth

    expect(answer).toBe(150)
  })

  it('should answer puzzle', () => {
    const input = getInput('day-2')
    const position = calculatePosition(input)
    const answer = position.horizontal * position.depth

    expect(answer).toMatchInlineSnapshot(`1882980`)
  })
})

describe('Part 2 - calculateComplicatedPosition', () => {
  it('should answer example', () => {
    const input = `
        forward 5
        down 5
        forward 8
        up 3
        down 8
        forward 2
      `
    const position = calculateComplicatedPosition(input)
    const answer = position.horizontal * position.depth

    expect(answer).toBe(900)
  })

  it('should answer puzzle', () => {
    const input = getInput('day-2')
    const position = calculateComplicatedPosition(input)
    const answer = position.horizontal * position.depth

    expect(answer).toMatchInlineSnapshot(`1971232560`)
  })
})

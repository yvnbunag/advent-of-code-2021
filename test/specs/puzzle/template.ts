import { first, second } from '~/puzzle/template'
import { getInput } from '~/inputs'

describe('Part 1', () => {
  it('should answer example', () => {
    const data = ``

    first(data)
  })

  it('should answer puzzle', () => {
    const data = getInput('day-1')

    first(data)
  })
})

describe('Part 2', () => {
  it('should answer example', () => {
    const data = ``

    second(data)
  })

  it('should answer puzzle', () => {
    const data = getInput('day-1')

    second(data)
  })
})

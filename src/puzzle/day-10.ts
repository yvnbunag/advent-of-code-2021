import { parseInputToList } from '~/puzzle/utils'

import { add, subtract } from '~/puzzle/utils/number'

type First = unknown

type Second = unknown

const map = {
  '{': '}',
  '(': ')',
  '[': ']',
  '<': '>',
}

const vmap = {
  ')': 3,
  ']': 57,
  '}': 1197,
  '>': 25137,
}

const vvmap = {
  ')': 1,
  ']': 2,
  '}': 3,
  '>': 4,
}

function isOpening(v: string): boolean {
  return Object.keys(map).includes(v)
}

class BrokenError extends Error {}
class IncompleteError extends Error {}

export function first(input: string): First {
  const data = parseInputToList(input)
  const errors: Array<Error> = []

  for (const line of data) {
    try {
      const opening: Array<string> = []

      for (const char of line.split('')) {
        if (isOpening(char)) {
          opening.push(char)
        }

        else {
          const pair = opening.pop() as keyof typeof map
          if (map[pair] !== char) {
            throw new BrokenError(char)
          }
        }
      }

      if (opening.length) throw new IncompleteError()
    } catch (err: any) {
      errors.push(err)
    }
  }

  const broken = errors
    .filter((error) => error instanceof BrokenError)
    .map(({ message }) => message)
    // @ts-expect-error asd
    .map((key) => vmap[key])
    .reduce(add, 0)

  return broken
}

export function second(input: string): Second {
  const data = parseInputToList(input)
  const errors: Array<Error> = []

  for (const line of data) {
    try {
      const opening: Array<string> = []

      for (const char of line.split('')) {
        if (isOpening(char)) {
          opening.push(char)
        }

        else {
          const pair = opening.pop() as keyof typeof map
          if (map[pair] !== char) {
            throw new BrokenError(char)
          }
        }
      }

      if (opening.length) throw new IncompleteError(opening.join(''))
    } catch (err: any) {
      errors.push(err)
    }
  }

  const incomplete = errors
    .filter((error) => error instanceof IncompleteError)
    .map(({ message }) => message)
    .map((v) => v.split('').reverse()
    // @ts-expect-error asd
      .map((v) => map[v]))

  const answer = incomplete.map((v) => {

    return v.reduce((q, w) => {
      // @ts-expect-error asd
      const ww = vvmap[w]

      return (q * 5) + ww
    }, 0)
  })

  return answer.sort(subtract)[Math.floor(answer.length / 2)]
}

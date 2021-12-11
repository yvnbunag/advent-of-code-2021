import { parseInputToList } from '~/puzzle/utils'

// @TODO remove return types

type First = unknown

type Second = unknown

export function first(input: string): First {
  const data = parseInputToList(input)

  return data
}

export function second(input: string): Second {
  const data = parseInputToList(input)

  return data
}

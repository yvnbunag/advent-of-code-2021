import { parseInputToList } from '~/puzzle/utils'

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

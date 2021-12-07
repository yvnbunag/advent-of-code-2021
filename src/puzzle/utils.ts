export type Predicate = (...args: Array<any>)=> boolean // eslint-disable-line @typescript-eslint/no-explicit-any

export function parseInputToList(
  input: string,
  delimiter = '\n',
): Array<string> {
  return input
    .split(delimiter)
    .map((value) => value.trim())
    .filter(Boolean)
}

export function not<WrappedPredicate extends Predicate>(
  predicate: WrappedPredicate,
): Predicate {
  return (...args: Array<unknown>) => !predicate(...args)
}

export function add(first: number, second: number) {
  return first + second
}

export function subtract(first: number, second: number) {
  return first - second
}

export function createListFromLength(length: number, start = 0) {
  return Array(length).fill(0)
    .map((value, index) => index + start)
}

export function createListFromRange(start: number, end: number) {
  const distance = Math.max(start, end) - Math.min(start, end)

  return Array(distance + 1)
    .fill(null)
    .map((value, index) => index + start)
}

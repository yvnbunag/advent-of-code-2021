export type Predicate = (...args: Array<any>)=> boolean // eslint-disable-line @typescript-eslint/no-explicit-any

export function parseInputToList(input: string): Array<string> {
  return input
    .split('\n')
    .map((value) => value.trim())
    .filter(Boolean)
}

export function not<WrappedPredicate extends Predicate>(
  predicate: WrappedPredicate,
): Predicate {
  return (...args: Array<unknown>) => !predicate(...args)
}

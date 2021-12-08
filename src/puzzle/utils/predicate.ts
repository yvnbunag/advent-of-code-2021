export type Predicate = (...args: Array<any>)=> boolean // eslint-disable-line @typescript-eslint/no-explicit-any

export function not<WrappedPredicate extends Predicate>(
  predicate: WrappedPredicate,
): Predicate {
  return (...args: Array<unknown>) => !predicate(...args)
}

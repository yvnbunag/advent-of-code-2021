export function omit<
  Source extends Record<string, unknown>,
  Keys extends Array<keyof Source>,
  Result extends Omit<Source, Keys[number]>,
>(source: Source, keys: Keys): Result {
  const filteredEntries = Object
    .entries(source)
    .filter(([key]) => !keys.includes(key))

  return Object.fromEntries(filteredEntries) as Result
}

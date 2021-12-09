export * from '~/puzzle/utils/predicate'
export * from '~/puzzle/utils/number'
export * from '~/puzzle/utils/list'

export * as predicate from '~/puzzle/utils/predicate'
export * as number from '~/puzzle/utils/number'
export * as list from '~/puzzle/utils/list'
export * as string from '~/puzzle/utils/string'

export function parseInputToList(
  input: string,
  delimiter = '\n',
): Array<string> {
  return input
    .split(delimiter)
    .map((value) => value.trim())
    .filter(Boolean)
}

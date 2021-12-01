export function parseInputToList(input: string): Array<string> {
  return input
    .split('\n')
    .map((value) => value.trim())
    .filter(Boolean)
}

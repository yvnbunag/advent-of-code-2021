export function createFromLength(length: number, start = 0) {
  return Array(length).fill(0)
    .map((value, index) => index + start)
}

export function createFromRange(start: number, end: number) {
  const distance = Math.max(start, end) - Math.min(start, end)

  return Array(distance + 1)
    .fill(null)
    .map((value, index) => index + start)
}

export function sortByLetter(list: Array<string>): Array<string> {
  return list.sort((first: string, second: string) => {
    return first.toLowerCase().localeCompare(second.toLowerCase())
  })
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getLastEntry<Entries extends Array<any>>(
  entries: Entries,
): Entries extends { length: 0 } ? undefined : Entries[number] {
  return entries[entries.length - 1]
}

export function getHighestValue(list: Array<number>): number {
  return list.reduce((current, next) => Math.max(current, next), -Infinity)
}

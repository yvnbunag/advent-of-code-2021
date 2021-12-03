import { parseInputToList } from '~/puzzle/utils'

export function calculateIncrease(report: string): number {
  return parseInputToList(report)
    .map(Number)
    .reduce((count, currentValue, currentIndex, original) => {
      if (!currentIndex) return 0

      if (currentValue > original[currentIndex - 1]) return count + 1

      return count
    }, 0)
}

export function calculateGroupedIncrease(report: string) {
  const values = parseInputToList(report).map(Number)
  const windowedValues = values
    .reduce(
      (collection, value, index, original) => {
        return [
          ...collection,
          original
            .slice(index, index + 3)
            .reduce((value, current) => value + current,0),
        ]
      },
    [] as Array<number>,
    )
    .slice(0, -2)

  return calculateIncrease(windowedValues.join('\n'))
}

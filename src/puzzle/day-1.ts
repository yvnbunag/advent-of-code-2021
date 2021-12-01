/** Day 1 Part 1 */
export function calculateIncrease(report: string): number {
  // @TODO reader util
  const values = report
    .split('\n')
    .map((value) => value.trim())
    .filter(Boolean)
    .map(Number)

  return values.reduce((count, currentValue, currentIndex, original) => {
    if (!currentIndex) return 0

    if (currentValue > original[currentIndex - 1]) return count + 1

    return count
  }, 0)
}

/** Day 1 Part 2 */
export function calculateGroupedIncrease(report: string) {
  // @TODO reader util
  const values = report
    .split('\n')
    .map((value) => value.trim())
    .filter(Boolean)
    .map(Number)
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

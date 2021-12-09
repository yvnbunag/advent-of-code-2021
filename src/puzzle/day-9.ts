import { parseInputToList, string, number, predicate } from '~/puzzle/utils'

const { trim } = string
const { not } = predicate

type Column = number

type Row = Array<Column>

type HeightMap = Array<Row>

type ColumnData = {
  rowIndex: number,
  columnIndex: number,
  value: Column,
}

type AdjacentColumns = {
  value: ColumnData,
  top?: ColumnData,
  bottom?: ColumnData,
  left?: ColumnData,
  right?: ColumnData,
}

function getAdjacentColumns(
  target: Pick<ColumnData, 'rowIndex' | 'columnIndex'>,
  map: HeightMap,
): AdjacentColumns {
  const value: ColumnData = {
    value: map[target.rowIndex][target.columnIndex],
    ...target,
  }
  const above: ColumnData | null = (() => {
    if (target.rowIndex <= 0) return null

    const rowIndex = target.rowIndex - 1
    const columnIndex = target.columnIndex
    const value = map[rowIndex][columnIndex]

    return { value, rowIndex, columnIndex }
  })()
  const below: ColumnData | null = (() => {
    if (map.length <= target.rowIndex + 1) return null

    const rowIndex = target.rowIndex + 1
    const columnIndex = target.columnIndex
    const value = map[rowIndex][columnIndex]

    return { value, rowIndex, columnIndex }
  })()
  const left: ColumnData | null = (() => {
    if (target.columnIndex <= 0) return null

    const rowIndex = target.rowIndex
    const columnIndex = target.columnIndex - 1
    const value = map[rowIndex][columnIndex]

    return { value, rowIndex, columnIndex }
  })()
  const right: ColumnData | null = (() => {
    if (map[target.rowIndex].length <= target.columnIndex + 1) return null

    const rowIndex = target.rowIndex
    const columnIndex = target.columnIndex + 1
    const value = map[rowIndex][columnIndex]

    return { value, rowIndex, columnIndex }
  })()

  const adjacent = [
    ['value', value],
    ...[
      ['above', above],
      ['below', below],
      ['left', left],
      ['right', right],
    ].filter(([, value ]) => value !== null),
  ]

  return Object.fromEntries(adjacent)
}

function createColumnDataVisitedCache() {
  const storage: Array<Array<boolean>> = []

  function isCached(columnData: ColumnData): boolean {
    const { rowIndex, columnIndex } = columnData

    return storage?.[rowIndex]?.[columnIndex] || false
  }

  function cache(columnData: ColumnData): boolean {
    const { rowIndex, columnIndex } = columnData

    if (!Array.isArray(storage[rowIndex])) storage[rowIndex] = []

    storage[rowIndex][columnIndex] = true

    return storage[rowIndex][columnIndex]
  }

  return { isCached, cache }
}

function calculateBasinSize(
  data: AdjacentColumns,
  map: HeightMap,
  cache: ReturnType<typeof createColumnDataVisitedCache>,
): number {
  const { value: current, ...adjacent } = data

  if (cache.isCached(current)) return 0
  if (current.value === 9) return 0

  cache.cache(current)

  const basinNeighbors: Array<ColumnData> = Object.values(adjacent)
    .filter(Boolean)
    .filter(not(cache.isCached))
  const basinNeighborsCount = basinNeighbors
    .map((columnData) => {
      return calculateBasinSize(getAdjacentColumns(columnData, map), map, cache)
    })
    .reduce(number.add, 0)

  return 1 + basinNeighborsCount
}

function parseInputToHeightMap(input: string): HeightMap {
  return parseInputToList(input)
    .map((row) => row.split('').map(trim)
      .map(Number))
}

export function sumLowPoints(input: string): number {
  const map = parseInputToHeightMap(input)
  const lowPoints: Array<number> = []

  for (const rowIndex of map.keys()) {
    for (const columnIndex of map[rowIndex].keys()) {
      const {
        value,
        ...adjacent
      } = getAdjacentColumns({ rowIndex, columnIndex }, map)
      const isLowPoint = Object.values(adjacent)
        .every((adjacentValue) => adjacentValue.value > value.value)

      if (isLowPoint) {
        lowPoints.push(value.value)
      }
    }
  }

  return lowPoints
    .map((lowPoint) => lowPoint + 1)
    .reduce(number.add, 0)
}

export function multiplyLargestBasins(input: string): number {
  const map = parseInputToHeightMap(input)
  const basins: Array<number> = []
  const basinCache = createColumnDataVisitedCache()

  for (const rowIndex of map.keys()) {
    for (const columnIndex of map[rowIndex].keys()) {
      const columnData = getAdjacentColumns({ rowIndex, columnIndex }, map)

      if (basinCache.isCached(columnData.value)) continue

      if (columnData.value.value === 9) {
        basinCache.cache(columnData.value)

        continue
      }

      const size = calculateBasinSize(columnData, map, basinCache)

      basins.push(size)
    }
  }

  return basins
    .sort(number.subtract)
    .slice(-3)
    .reduce(number.multiply, 1)
}

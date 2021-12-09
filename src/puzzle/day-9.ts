import { parseInputToList } from '~/puzzle/utils'
import { trim } from '~/puzzle/utils/string'
import { not } from '~/puzzle/utils/predicate'
import { omit } from '~/puzzle/utils/object'
import { add, subtract, multiply } from '~/puzzle/utils/number'
type Column = number

type Row = Array<Column>

type HeightMap = Array<Row>

type ColumnData = {
  rowIndex: number,
  columnIndex: number,
  value: Column,
}

type AdjacentColumnData = {
  target: ColumnData,
  top?: ColumnData,
  bottom?: ColumnData,
  left?: ColumnData,
  right?: ColumnData,
}

function getAdjacentColumns(
  target: Pick<ColumnData, 'rowIndex' | 'columnIndex'>,
  map: HeightMap,
): AdjacentColumnData {
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
    ['above', above],
    ['below', below],
    ['left', left],
    ['right', right],
  ].filter(([, value]) => value !== null)
  const data = [['target', value], ...adjacent]

  return Object.fromEntries(data)
}

function createColumnVisitLogger() {
  const storage: Array<Array<boolean>> = []

  function isVisited(columnData: ColumnData): boolean {
    const { rowIndex, columnIndex } = columnData

    return storage?.[rowIndex]?.[columnIndex] || false
  }

  function logVisit(columnData: ColumnData): boolean {
    const { rowIndex, columnIndex } = columnData

    if (!Array.isArray(storage[rowIndex])) storage[rowIndex] = []

    storage[rowIndex][columnIndex] = true

    return storage[rowIndex][columnIndex]
  }

  return { isVisited, logVisit }
}

function calculateBasinSize(
  adjacentColumnData: AdjacentColumnData,
  map: HeightMap,
  visitLogger: ReturnType<typeof createColumnVisitLogger>,
): number {
  const { target, ...adjacent } = adjacentColumnData

  if (target.value === 9) return 0
  if (visitLogger.isVisited(target)) return 0

  visitLogger.logVisit(target)

  const basinNeighbors: Array<ColumnData> = Object.values(adjacent)
    .filter(Boolean)
    .filter(not(visitLogger.isVisited))
  const basinNeighborsCount = basinNeighbors
    .map((columnData) => calculateBasinSize(
      getAdjacentColumns(columnData, map),
      map,
      visitLogger,
    ))
    .reduce(add, 0)

  return 1 + basinNeighborsCount
}

function parseInputToHeightMap(input: string): HeightMap {
  return parseInputToList(input)
    .map((row) => {
      return row.split('')
        .map(trim)
        .map(Number)
    })
}

export function sumLowPoints(input: string): number {
  const map = parseInputToHeightMap(input)
  const lowPoints: Array<number> = map.reduce((accLowPoints, row, rowIndex) => {
    const rowLowPoints = row.reduce((accRowLowPoints, column, columnIndex) => {
      const adjacentData = getAdjacentColumns({ rowIndex, columnIndex }, map)
      const adjacent = omit(adjacentData, ['target'])
      const isLowPoint = Object
        .values(adjacent)
        .every((adjacentValue) => adjacentValue.value > column)

      if (isLowPoint) return [...accRowLowPoints, column]

      return accRowLowPoints
    }, [] as Array<number>)

    return [...accLowPoints, ...rowLowPoints]
  }, [] as Array<number>)

  return lowPoints
    .map((lowPoint) => lowPoint + 1)
    .reduce(add, 0)
}

export function multiplyLargestBasins(input: string): number {
  const map = parseInputToHeightMap(input)
  const visitLogger = createColumnVisitLogger()
  const basinSizes = map.reduce((accBasinSizes, row, rowIndex) => {
    const rowBasinSizes = row.reduce((rowBasinSizes, column, columnIndex) => {
      const adjacentData = getAdjacentColumns({ rowIndex, columnIndex }, map)

      if (visitLogger.isVisited(adjacentData.target)) return rowBasinSizes

      const size = calculateBasinSize(adjacentData, map, visitLogger)

      return [...rowBasinSizes, size]
    }, [] as Array<number>)

    return [...accBasinSizes, ...rowBasinSizes]
  }, [] as Array<number>)

  return basinSizes
    .sort(subtract)
    .slice(-3)
    .reduce(multiply, 1)
}

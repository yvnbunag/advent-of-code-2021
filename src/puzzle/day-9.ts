import { parseInputToList } from '~/puzzle/utils'
import { trim } from '~/puzzle/utils/string'
import { not } from '~/puzzle/utils/predicate'
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

const PEAK_HEIGHT = 9

function getColumnData(
  map: HeightMap,
  rowIndex: number,
  columnIndex: number,
): ColumnData {
  return {
    value: map[rowIndex][columnIndex],
    rowIndex,
    columnIndex,
  }

}

function getAdjacentColumns(
  target: Pick<ColumnData, 'rowIndex' | 'columnIndex'>,
  map: HeightMap,
): AdjacentColumnData {
  const targetColumnData = getColumnData(
    map,
    target.rowIndex,
    target.columnIndex,
  )
  const above = target.rowIndex > 0
    ? getColumnData(map, target.rowIndex - 1, target.columnIndex)
    : null
  const below = map.length > target.rowIndex + 1
    ? getColumnData(map, target.rowIndex + 1, target.columnIndex)
    : null
  const left = target.columnIndex > 0
    ? getColumnData(map, target.rowIndex, target.columnIndex - 1)
    : null
  const right = map[target.rowIndex].length > target.columnIndex + 1
    ? getColumnData(map, target.rowIndex, target.columnIndex + 1)
    : null
  const adjacent = [
    ['above', above],
    ['below', below],
    ['left', left],
    ['right', right],
  ].filter(([, columnData]) => columnData !== null)
  const data = [['target', targetColumnData], ...adjacent]

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

  if (target.value === PEAK_HEIGHT) return 0
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
      const { target, ...adjacent } = adjacentData
      const isLowPoint = Object
        .values(adjacent)
        .every((adjacentValue) => adjacentValue.value > target.value)

      if (isLowPoint) return [...accRowLowPoints, target.value]

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

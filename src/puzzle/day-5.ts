import { parseInputToList } from '~/puzzle/utils/version-1'

type Point = `${string},${string}`

type Line = [Point, Point]

function getPointNumbers(point: Point): [number, number] {
  return point.split(',')
    .map((value) => value.trim())
    .map(Number) as [number, number]
}

function isHorizontal(line: Line): boolean {
  const [[startX], [endX]] = line.map(getPointNumbers)

  return startX === endX
}

function isVertical(line: Line): boolean {
  const [[,startY],[,endY]] = line.map(getPointNumbers)

  return startY === endY
}

function isPerfectDiagonal(line: Line): boolean {
  const [[startX,startY], [endX,endY]] = line.map(getPointNumbers)

  return Math.abs(+startX - +startY) === Math.abs(+endX - +endY)
    || +startX + +startY === +endX + +endY
    || (startX === startY && endX === endY)
}

function toHorizontalPaths(line: Line): Array<Point> {
  const [[startX,startY], [,endY]] = line.map(getPointNumbers)

  const min = Math.min(startY, endY)
  const max = Math.max(startY, endY)
  const distance = max - min - 1
  const centerPoints: Array<Point> = Array(distance)
    .fill(null)
    .map((value, index) => `${startX},${min + index + 1}` as Point)

  return [line[0], ...centerPoints, line[1]]
}

function toVerticalPaths(line: Line): Array<Point> {
  const [[startX,startY], [endX]] = line.map(getPointNumbers)

  const min = Math.min(startX, endX)
  const max = Math.max(startX, endX)
  const distance = max - min - 1
  const centerPoints: Array<Point> = Array(distance)
    .fill(null)
    .map((value, index) => `${min + index + 1},${startY}` as Point)

  return [line[0], ...centerPoints, line[1]]
}

export function getInBetween(first: number, second: number): Array<number> {
  if (first > second) {
    const difference = first - second - 1

    return [
      first,
      ...Array(difference).fill(null)
        .map((value, index) => second + 1 + index)
        .reverse(),
      second,
    ]
  }

  const difference = second - first - 1

  return [
    first,
    ...Array(difference).fill(null)
      .map((value, index) => first + index + 1),
    second,
  ]
}

function toDiagonalPaths(line: Line): Array<Point> {
  const [[xStart,xEnd], [yStart,yEnd]] = line.map(getPointNumbers)

  const x = getInBetween(xStart, yStart)
  const y = getInBetween(xEnd, yEnd)
  const result = x.map((v, i) => `${v},${y[i]}`)

  return result as Array<Point>
}


function draw(paths: Array<Array<Point>>) {
  const canvas: Array<Array<number>> = Array(1000)
    .fill(null)
    .map(() => Array(1000).fill(0))

  paths
    .flatMap((point) => point)
    .forEach((point) => {
      const [x,y] = getPointNumbers(point)

      canvas[y][x] = canvas[y][x] + 1
    })

  return canvas
    .map((row) => row.map((v) => v === 0 ? '.' : v).join(''))
    .join('\n')
}

function parseInputToLines(input: string) {
  return parseInputToList(input).map(
    (rawLine) => rawLine.split('->').map((point) => point.trim()),
  ) as Array<Line>
}

function countOverlaps(paths: Array<Array<Point>>): number {
  return [...draw(paths).matchAll(/[2-9]/g)].length
}

export function countSimpleOverlappingPoints(input: string) {
  const paths = parseInputToLines(input)
    .map((line) => {
      if (isHorizontal(line)) return toHorizontalPaths(line)

      if (isVertical(line)) return toVerticalPaths(line)

      return null
    })
    .filter(Boolean) as Array<Array<Point>>

  return countOverlaps(paths)
}

export function countOverlappingPoints(input: string) {
  const paths = parseInputToLines(input)
    .map((line) => {
      if (isHorizontal(line)) return toHorizontalPaths(line)

      if (isVertical(line)) return toVerticalPaths(line)

      if (isPerfectDiagonal(line)) return toDiagonalPaths(line)

      return null
    })
    .filter(Boolean) as Array<Array<Point>>

  return countOverlaps(paths)
}

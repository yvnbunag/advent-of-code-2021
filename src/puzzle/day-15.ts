import { parseInputToMatrix } from '~/puzzle/utils'
import { add, createMultipleOfCounter } from '~/puzzle/utils/number'

type Map = Array<Array<number>>

type VisitRecord = Record<string, boolean>

type Position = {
  y: number,
  x: number,
}

type Path = Array<Position>

const apCache: Record<string, Array<Position>> = {}
const lrCache: Record<string, Position> = {}
const lrpCache: Record<string, Path> = {}

export type ExcludePosition = Partial<Record<'top' | 'bottom' | 'left' | 'right', boolean>>

// @TODO helper?
function getAdjacentPosition(
  map: Map,
  { y, x }: Position,
  exclude: VisitRecord = {},
  ePosition: ExcludePosition = {},
): Array<Position> {
  const cache = apCache[`${y}${x}`]

  if (cache) return cache

  const top = y > 0 && { y: y - 1, x }
  const bottom = map.length > y + 1 && { y: y + 1, x }
  const left = x > 0 && { y, x: x - 1 }
  const right = map[y].length > x + 1 && { y, x: x + 1 }

  const positions = [
    ePosition.top ? false : top,
    ePosition.bottom ? false : bottom,
    ePosition.left ? false : left,
    ePosition.right ? false : right,
  ].filter((position) => position !== false) as Array<Position>

  const ap = positions.filter(({ y, x }) => !(`${y}${x}` in exclude))

  apCache[`${y}${x}`] = ap

  return ap
}

function parseInputToMap(input: string): Map {
  return parseInputToMatrix(input)
    .map((row) => row.map(Number))
}

function getPosition(path: Path) {
  return path[path.length - 1]
}

function atEnd(map: Map, path: Path): boolean {
  const lastY = map.length - 1
  const lastX = map[0].length - 1
  const { y, x } = getPosition(path)

  return y === lastY && x === lastX
}

function getRisk(map: Map, { x, y }: Position): number {
  return map[y][x]
}

function getLeastRisk(
  map: Map,
  position: Position,
  visitRecord: VisitRecord,
  ePosition: ExcludePosition = {},
): Position | null {
  const adjacent = getAdjacentPosition(map, position, visitRecord, ePosition)
  const cache = lrCache[`${position.y}${position.x}`]

  if (cache) return cache

  if (!adjacent.length) return null

  const lr = adjacent.reduce((current, next) => {
    const [
      currentRisk,
      nextRisk,
    ] = [current, next].map((pos) => getRisk(map, pos))

    if (nextRisk < currentRisk) return next

    return current
  })

  lrCache[`${position.y}${position.x}`] = lr

  return lr
}

function getLeastRiskPath(
  map: Map,
  position: Position,
  visitRecord: VisitRecord,
  lookAhead = 0,
  ePosition: ExcludePosition = {},
): Path | null {
  const cache = lrpCache[`${position.y}${position.x}`]

  if (cache) return cache

  const adjacent = getAdjacentPosition(map, position, visitRecord, ePosition)

  if (!adjacent.length) return null

  const lAdjacent = adjacent.map((pos) => {
    const path: Path = [pos]
    let internalLA = lookAhead

    while(internalLA) {
      const position = getPosition(path)
      const leastRisk = getLeastRisk(map, position, visitRecord, ePosition)

      if (!leastRisk) break

      internalLA = internalLA - 1
      path.push(leastRisk)
    }

    return path
  })
  const tAdjacent = lAdjacent
    .map((path) => totalRisk(map, path))
    .map((risk, index) => [risk, index])
  const sAdjacent = tAdjacent.sort(([r1], [r2]) => r1 - r2)
  const [,leastIndex] = sAdjacent[0]

  const lrp = lAdjacent[leastIndex]

  lrpCache[`${position.y}${position.x}`] = lrp

  return lrp
}

function getLowestRiskPath(
  map: Map,
  lookAhead = 0,
  ePosition: ExcludePosition = {},
) {
  const path: Array<Position> = [{ y:0, x: 0 }]
  const visitRecord: VisitRecord = {}

  while (!atEnd(map, path)) {
    const position = getPosition(path)
    visitRecord[`${position.y}${position.x}`] = true
    const [
      leastRisk,
    ] = getLeastRiskPath(map, position, visitRecord, lookAhead, ePosition) || []

    if (!leastRisk) break

    path.push(leastRisk)
  }

  return path
}

function totalRisk(
  map: Map,
  path: Path,
): number {
  return path.map((position) => getRisk(map, position)).reduce(add, 0)
}

function draw(map: Map, path: Path) {
  const markedMap = map.map((row) => {
    return row.map((risk) => ` ${risk} `)
  })

  path.forEach(({ y, x }) => {
    markedMap[y][x] = `[${markedMap[y][x].replace(/ /g, '')}]`
  })

  return markedMap.map((row) => row.join('')).join('\n')
}

const multiple = createMultipleOfCounter(10000)

export function calculateLowestRisk(
  input: string,
  lookAhead = 0,
  ePosition: ExcludePosition = {},
): number | false {
  // eslint-disable-next-line no-console
  if (multiple()) console.log(lookAhead)

  const map = parseInputToMap(input)
  const path = getLowestRiskPath(map, lookAhead, ePosition)

  // console.log(draw(map, path))

  if (!atEnd(map, path)) return false

  return totalRisk(map, path) - getRisk(map, path[0])
}

export function second(input: string) {
  // const data = parseInputToList(input)

  return 0
}

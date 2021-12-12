import { parseInputToList } from '~/puzzle/utils'
import { getLastEntry } from '~/puzzle/utils/list'
import { not, isLowerCase } from '~/puzzle/utils/predicate'

type Point = string

type From = Point

type To = Point

type Path = Array<Point>

type Paths = Array<Path>

type Connection = [From, To]

type Connections = Array<Connection>

type PathMap = Record<Point, Array<Point>>

const START: Point = 'start'

const END: Point = 'end'

function parseInputToConnections(
  input: string,
  start: Point,
  end: Point,
): Connections {
  const paths = parseInputToList(input)
    .map((rawPath) => rawPath.split('-').slice(0, 2) as Connection)
  const returnPaths = paths
    .filter(([from, to]) => from !== start && to !== end)
    .map(([from, to]) => [to, from] as Connection)

  return [...paths, ...returnPaths]
}

function toPathMap(connections: Connections): PathMap {
  return connections.reduce((pathMap, [from, to]) => {
    return {
      ...pathMap,
      [from]: [...(pathMap[from] || []), to],
    }
  }, {} as PathMap)
}

function createHasEnded(end: Point) {
  return (path: Path) => getLastEntry(path) === end
}

function createHasUniqueLowercasePoints(overflow = 0) {
  return (path: Path) => {
    const lowercase = path.filter(isLowerCase)
    const uniqueLowercase = [...new Set(lowercase)]

    return lowercase.length < uniqueLowercase.length + 1 + overflow
  }
}

export function findDistinctPaths(input: string, smallRepeat = 0): Paths {
  const hasUniqueLowercasePoints = createHasUniqueLowercasePoints(smallRepeat)
  const hasEnded = createHasEnded(END)

  function find(
    pathMap: PathMap,
    start: Point,
    pending: Paths = pathMap[start].map((to) => [start, to]),
    ended: Paths = [],
  ): Paths {
    if (!pending.length) return ended

    const branches = pending.reduce((accumulated, path) => {
      return [
        ...accumulated,
        ...(pathMap[getLastEntry(path)] || [])
          .filter((point) => point !== start)
          .map((point) => [...path, point].filter(Boolean))
          .filter(hasUniqueLowercasePoints),
      ]
    }, [] as Paths)
    const endBranches = branches.filter(hasEnded)
    const pendingBranches = branches.filter(not(hasEnded))

    return find(pathMap, start, pendingBranches, [...ended, ...endBranches])
  }

  const connections = parseInputToConnections(input, START, END)
  const pathMap = toPathMap(connections)

  return find(pathMap, START)
}

export function findSimpleDistinctPaths(input: string) {
  return findDistinctPaths(input, 0).length
}

export function findComplexDistinctPaths(input: string) {
  return findDistinctPaths(input, 1).length
}

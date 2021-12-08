import {
  parseInputToList,
  add,
  subtract,
  createListFromRange,
  createListFromLength,
} from '~/puzzle/utils/version-1'

function parseCrabPositionsToList(input: string): Array<number> {
  return parseInputToList(input, ',').map(Number)
}

export function getDistance(first: number, second: number): number {
  return Math.max(first, second) - Math.min(first, second)
}

export function getExponentialDistance(first: number, second: number): number {
  const distance = getDistance(first, second)

  return createListFromLength(distance + 1).reduce(add, 0)
}

export function getLeastFuelCrabAlignment(input: string) {
  const data = parseCrabPositionsToList(input).sort(subtract)
  const start = data[0]
  const end = data[data.length - 1]
  const positions = createListFromRange(start, end)
  const fuelConsumptions = positions.map((position) => {
    return data
      .map((individualPosition) => {
        return getDistance(position, individualPosition)
      })
      .reduce(add)
  })

  return fuelConsumptions.sort(subtract)[0]
}

export function getLeastExponentialFuelCrabAlignment(input: string) {
  const data = parseCrabPositionsToList(input).sort(subtract)
  const [start] = data
  const [end] = data.slice(-1)
  const positions = createListFromRange(start, end)
  const fuelConsumptions = positions.map((position) => {
    return data
      .map((individualPosition) => {
        return getExponentialDistance(position, individualPosition)
      })
      .reduce(add)
  })

  return fuelConsumptions.sort(subtract)[0]
}

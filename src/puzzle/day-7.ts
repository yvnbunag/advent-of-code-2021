import { parseInputToList } from '~/puzzle/utils'


function add(first: number, second: number) {
  return first + second
}

// @TODO helper location
function subtract(first: number, second: number) {
  return first - second
}

function parseCrabPositionsToList(input: string): Array<number> {
  return parseInputToList(input, ',').map(Number)
}

export function getDistance(first: number, second: number): number {
  return Math.max(first, second) - Math.min(first, second)
}

export function getExponentialDistance(first: number, second: number): number {
  if (first === second) return 0

  const distance = getDistance(first, second)

  return Array(distance + 1).fill(0)
    .map((value, index) => index)
    .reduce(add, 0)
}

export function getLeastFuelCrabAlignment(input: string) {
  const data = parseCrabPositionsToList(input).sort(subtract)
  const start = data[0]
  const end = data[data.length - 1]
  const distance = getDistance(start, end)
  // @TODO helper
  const positions = Array(distance + 1)
    .fill(null)
    .map((value, index) => index + start)
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
  const start = data[0]
  const end = data[data.length - 1]
  const distance = getDistance(start, end)
  const positions = Array(distance + 1)
    .fill(null)
    .map((value, index) => index + start)

  const fuelConsumptions = positions.map((position) => {
    return data
      .map((individualPosition) => {
        return getExponentialDistance(position, individualPosition)
      })
      .reduce(add)
  })

  return fuelConsumptions.sort(subtract)[0]
}

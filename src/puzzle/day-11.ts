/* eslint-disable @typescript-eslint/naming-convention */
import { parseInputToList } from '~/puzzle/utils'

type Position = {
  x: number,
  y: number,
}

type Flash = Position
class Octopus {
  static PEAK_ENERGY = 9
  static LOW_ENERGY = 0

  readonly position: Position

  constructor(
    y: number,
    x: number,
    private _energy: number = Octopus.LOW_ENERGY,
  ) {
    this.position = { y, x }
  }

  get energy() {
    return this._energy
  }

  step(): Flash | null {
    const energy = this.incrementEnergy()

    if (energy === Octopus.PEAK_ENERGY + 1) {
      return this.position
    }

    return null
  }

  settle() {
    if (this.energy > Octopus.PEAK_ENERGY) this.resetEnergy()
  }

  private incrementEnergy() {
    this._energy = this._energy + 1

    return this._energy
  }

  private resetEnergy() {
    this._energy = Octopus.LOW_ENERGY
  }

  static step(octopus: Octopus): ReturnType<Octopus['step']> {
    return octopus.step()
  }

  static settle(octopus: Octopus) {
    octopus.settle()
  }

  static getPosition(octopus: Octopus): Position {
    return octopus.position
  }

  static getEnergy(octopus: Octopus): Octopus['energy'] {
    return octopus.energy
  }
}

type OctopusRow = Array<Octopus>
type OctopusMatrix = Array<OctopusRow>

function toOctopusMatrix(row: Array<number>, y: number): OctopusRow {
  return row.map((energy: number, x: number) => {
    return new Octopus(y, x, energy)
  })
}

function getOctopusMatrixEnergy(
  matrix: OctopusMatrix,
): Array<Array<Octopus['energy']>> {
  return matrix.map((row) => row
    .map(Octopus.getEnergy)
    .map((energy) => (energy > 9 ? 'X' : energy) as Octopus['energy']),
  )
}

function getAdjacentOctopus(
  position: Position,
  matrix: OctopusMatrix,
): Array<Position> {
  const { y, x } = position
  const top = y > 0 ? { y: y - 1, x } : null
  const bottom = matrix.length > y + 1 ? { y: y + 1, x } : null
  const left = x > 0 ? { y, x: x - 1 } : null
  const right = matrix[y].length > x + 1 ? { y, x: x + 1 } : null
  const topLeft = top && left ? { y: top.y, x: left.x } : null
  const topRight = top && right ? { y: top.y, x: right.x } : null
  const bottomLeft = bottom && left ? { y: bottom.y, x: left.x } : null
  const bottomRight = bottom && right ? { y: bottom.y, x: right.x } : null

  return [
    top,
    bottom,
    left,
    right,
    topLeft,
    topRight,
    bottomLeft,
    bottomRight,
  ].filter((position) => position !== null) as Array<Position>
}

function getOctopusFromMatrix(
  matrix: OctopusMatrix,
  { y, x }: Position,
): Octopus {
  return matrix[y][x]
}

function parseToOctopusMatrix(input: string): OctopusMatrix {
  return parseInputToList(input)
    .map((row) => row.split('').map(Number))
    .map(toOctopusMatrix)
}

export function first(input: string, steps: number) {
  const matrix = parseToOctopusMatrix(input)
  let currentStep = steps
  let flashCount = 0

  while (currentStep > 0) {
    const flashes: Array<Flash> = matrix
      .flatMap((row) => row.map(Octopus.step))
      .filter(Boolean) as Array<Flash>

    while (flashes.length) {
      flashCount = flashCount + 1

      const flash = flashes.shift() as Flash
      const adjacentFlashes = getAdjacentOctopus(flash, matrix)
        .map((position) => getOctopusFromMatrix(matrix, position))
        .map(Octopus.step) as Array<Flash>

      flashes.push(...adjacentFlashes.filter(Boolean))
    }

    matrix.forEach((row) => row.forEach(Octopus.settle))

    // const print = getOctopusMatrixEnergy(matrix)
    //   .map((row) => row.join(''))
    //   .join('\n')
    // console.log(print)

    currentStep = currentStep - 1
  }

  return flashCount
}

export function second(input: string) {
  const matrix = parseToOctopusMatrix(input)
  let step = 0
  let flashed = false

  while (!flashed) {
    step = step + 1

    const flashes: Array<Flash> = matrix
      .flatMap((row) => row.map(Octopus.step))
      .filter(Boolean) as Array<Flash>

    while (flashes.length) {
      const flash = flashes.shift() as Flash
      const adjacentFlashes = getAdjacentOctopus(flash, matrix)
        .map((position) => getOctopusFromMatrix(matrix, position))
        .map(Octopus.step) as Array<Flash>

      flashes.push(...adjacentFlashes.filter(Boolean))
    }

    matrix.forEach((row) => row.forEach(Octopus.settle))

    const isSynchronized = !matrix.some((row) => {
      return row.some((octopus) => octopus.energy > 0)
    })

    if (isSynchronized) flashed = true
  }

  return step
}

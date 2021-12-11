/* eslint-disable @typescript-eslint/naming-convention */
import { parseInputToMatrix } from '~/puzzle/utils'

type Position = {
  y: number,
  x: number,
}

type Flash = {
  isPeak: boolean,
  center: Position,
}

type PeakFlash = Flash & { isPeak: true }

class Octopus {
  static PEAK_ENERGY = 9
  static LOW_ENERGY = 0

  readonly position: Position

  constructor(
    y: Position['y'],
    x: Position['x'],
    private _energy: number = Octopus.LOW_ENERGY,
  ) {
    this.position = { y, x }
  }

  get energy() { return this._energy }

  step(): Flash {
    const energy = this.incrementEnergy()
    const isPeak = energy === Octopus.PEAK_ENERGY + 1

    return { isPeak, center: this.position }
  }

  settle(): Octopus {
    if (this.energy > Octopus.PEAK_ENERGY) this.resetEnergy()

    return this
  }

  private incrementEnergy() {
    this._energy = this._energy + 1

    return this._energy
  }

  private resetEnergy() { this._energy = Octopus.LOW_ENERGY }

  static step(octopus: Octopus): ReturnType<Octopus['step']> {
    return octopus.step()
  }

  static settle(octopus: Octopus): ReturnType<Octopus['settle']> {
    return octopus.settle()
  }

  static getPosition(octopus: Octopus): Position {
    return octopus.position
  }
}

type OctopusRow = Array<Octopus>

type OctopusMatrix = Array<OctopusRow>

function toOctopusMatrix(row: Array<number>, y: number): OctopusRow {
  return row.map((energy: number, x: number) => {
    return new Octopus(y, x, energy)
  })
}

function parseToOctopusMatrix(input: string): OctopusMatrix {
  return parseInputToMatrix(input)
    .map((row) => row.map(Number))
    .map(toOctopusMatrix)
}

function getOctopusFromMatrix(
  matrix: OctopusMatrix,
  { y, x }: Position,
): Octopus {
  return matrix[y][x]
}

function getAdjacentOctopus(
  position: Position,
  matrix: OctopusMatrix,
): Array<Octopus> {
  const { y, x } = position
  const top = y > 0 && { y: y - 1, x }
  const bottom = matrix.length > y + 1 && { y: y + 1, x }
  const left = x > 0 && { y, x: x - 1 }
  const right = matrix[y].length > x + 1 && { y, x: x + 1 }
  const topLeft = top && left && { y: top.y, x: left.x }
  const topRight = top && right && { y: top.y, x: right.x }
  const bottomLeft = bottom && left && { y: bottom.y, x: left.x }
  const bottomRight = bottom && right && { y: bottom.y, x: right.x }

  const positions = [
    top,
    bottom,
    left,
    right,
    topLeft,
    topRight,
    bottomLeft,
    bottomRight,
  ].filter((position) => position !== false) as Array<Position>

  return positions.map((position) => getOctopusFromMatrix(matrix, position))
}

function isPeakFlash(flash: Flash): flash is PeakFlash {
  return flash.isPeak
}

function isSynchronized(matrix: OctopusMatrix): boolean {
  return !matrix.some((row) => row.some((octopus) => octopus.energy > 0))
}

export function calculateFlashes(input: string, steps: number) {
  function spreadFlash(
    matrix: OctopusMatrix,
    flashes: Array<PeakFlash>,
    count = 0,
  ): number {
    if (flashes.length === 0) return count

    const [{ center }, ...succeeding] = flashes
    const adjacent = getAdjacentOctopus(center, matrix)
      .map(Octopus.step)
      .filter(isPeakFlash)

    return spreadFlash(matrix, [...succeeding, ...adjacent], count + 1)
  }

  function calculate(
    matrix: OctopusMatrix,
    steps: number,
    count = 0,
  ): number {
    if (steps === 0) return count

    const flashes = matrix
      .flatMap((row) => row.map(Octopus.step))
      .filter(isPeakFlash)
    const spreadCount = spreadFlash(matrix, flashes)
    const settledMatrix = matrix.map((row) => row.map(Octopus.settle))

    return calculate(settledMatrix, steps - 1, count + spreadCount)
  }

  const matrix = parseToOctopusMatrix(input)

  return calculate(matrix, steps)
}

export function calculateSynchronization(input: string) {
  function spreadFlash(
    matrix: OctopusMatrix,
    flashes: Array<PeakFlash>,
  ): void {
    if (flashes.length === 0) return

    const [{ center }, ...succeeding] = flashes
    const adjacent = getAdjacentOctopus(center, matrix)
      .map(Octopus.step)
      .filter(isPeakFlash)

    return spreadFlash(matrix, [...succeeding, ...adjacent])
  }

  function calculate(
    matrix: OctopusMatrix,
    until: (matrix: OctopusMatrix)=> boolean,
    steps = 1,
  ): number {
    const flashes = matrix
      .flatMap((row) => row.map(Octopus.step))
      .filter(isPeakFlash)

    spreadFlash(matrix, flashes)

    const settledMatrix = matrix.map((row) => row.map(Octopus.settle))

    if (until(settledMatrix)) return steps

    return calculate(settledMatrix, until, steps + 1)
  }

  const matrix = parseToOctopusMatrix(input)

  return calculate(matrix, isSynchronized)
}

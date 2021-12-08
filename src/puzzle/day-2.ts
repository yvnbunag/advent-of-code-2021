import { parseInputToList } from '~/puzzle/utils/version-1'

const enum Instruction {
  FORWARD = 'forward',
  DOWN = 'down',
  UP = 'up',
}

type Position = { horizontal: number, depth: number }

function parseInputToInstruction(input: string): Array<[string, number]> {
  return parseInputToList(input)
    .map((rawInstruction) => rawInstruction.split(' '))
    .map(([instruction, value]) => [instruction, +value])
}

export function calculatePosition(input: string): Position {
  const instructions = parseInputToInstruction(input)

  return instructions.reduce(
    (reduction, [instruction, value]) => {
      if (instruction === Instruction.FORWARD) {
        return {
          ...reduction,
          horizontal: reduction.horizontal + value,
        }
      }

      if (instruction === Instruction.UP) {
        return {
          ...reduction,
          depth: reduction.depth - value,
        }
      }

      if (instruction === Instruction.DOWN) {
        return {
          ...reduction,
          depth: reduction.depth + value,
        }
      }


      return reduction
    },
    { horizontal: 0, depth: 0 } ,
  )
}

export function calculateComplicatedPosition(input: string): Position {
  const instructions = parseInputToInstruction(input)

  return instructions.reduce(
    (reduction, [instruction, value]: [string, number]) => {
      if (instruction === Instruction.FORWARD) {
        return {
          ...reduction,
          horizontal: reduction.horizontal + value,
          depth: reduction.depth + (reduction.aim * value),
        }
      }

      if (instruction === Instruction.UP) {
        return {
          ...reduction,
          aim: reduction.aim - value,
        }
      }

      if (instruction === Instruction.DOWN) {
        return {
          ...reduction,
          aim: reduction.aim + value,
        }
      }

      return reduction
    },
    { horizontal: 0, depth: 0, aim: 0 } ,
  )
}

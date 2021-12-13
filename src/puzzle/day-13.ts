import { parseInputToList } from '~/puzzle/utils'

import { splitBy } from '~/puzzle/utils/string'
import { not } from '~/puzzle/utils/predicate'
import { getHighestValue } from '~/puzzle/utils/list'
import { deepCopy } from '~/puzzle/utils/matrix'

// @TODO Verify solution

type Pixel = boolean

type Row = Array<Pixel>

type Paper = Array<Row>

type Axis = 'x' | 'y'

type RawInstruction = `fold along ${Axis}=${number}`

type RawLocation = `${number},${number}`

type Instruction = {
  axis: Axis,
  position: number,
}

type Manual = {
  paper: Paper,
  instructions: Array<Instruction>,
}

function parseLocationsToPaper(rawLocation: Array<RawLocation>): Paper {
  const locations = rawLocation.map(splitBy(','))
    .map((location) => location.map(Number))
  const width = getHighestValue(locations.map(([x]) => x)) + 1
  const height = getHighestValue(locations.map(([,y]) => y)) + 1
  const row = Array(width).fill(false)
  const paper = Array(height).fill([])
    .map(() => [...row])

  return locations.reduce((currentPaper, [x, y]) => {
    currentPaper[y][x] = true

    return currentPaper
  }, deepCopy(paper))
}

function parseInstruction(rawInstruction: RawInstruction) {
  const [,,data] = rawInstruction.split(' ')
  const [axis, position] = data.split('=') as [Axis, number]

  return { axis, position: Number(position) }
}

function isLocation(value: string): value is RawLocation {
  return value.includes(',')
}

const isRawInstruction = (() => {
  type IsInstruction = (value: string)=> value is RawInstruction

  return not(isLocation) as IsInstruction
})()

function parseInputToManual(input: string): Manual {
  const data = parseInputToList(input)
  const paper = parseLocationsToPaper(data.filter(isLocation))
  const instructions: Array<Instruction> = data
    .filter(isRawInstruction)
    .map(parseInstruction)

  return { paper, instructions }
}

export function plot(paper: Paper) {
  return paper
    .map((row) => row.map((pixel) => pixel ? '#' : '.').join(''))
    .join('\n')
}

function foldLeft(paper: Paper, position: number): Paper {
  const left = paper.map((row) => row.slice(0, position))
  const right = paper.map((row) => row.slice(position + 1))
  const foldedRight = right.map((row) => [...row].reverse())

  return left.map((row, y) => {
    return row.map((pixel, x) => {
      return pixel || foldedRight?.[y]?.[x] || false
    })
  })
}

function foldUp(paper: Paper, position: number): Paper {
  const upper = paper.slice(0, position)
  const lower = paper.slice(position + 1)
  const foldedLower = [...lower].reverse()

  return upper.map((row, y) => {
    return row.map((pixel, x) => {
      return pixel || foldedLower?.[y]?.[x] || false
    })
  })
}

export function fold(input: string, limit = Infinity): Paper {
  function recursiveFold(
    paper: Paper,
    instructions: Array<Instruction>,
    limit = Infinity,
  ): Paper {
    if (!instructions.length) return paper
    if (!limit) return paper

    const [{ axis, position }, ...nextInstructions] = instructions

    if (axis === 'y') {
      return recursiveFold(foldUp(paper, position), nextInstructions, limit - 1)
    }

    return recursiveFold(foldLeft(paper, position), nextInstructions, limit - 1)
  }

  const { paper, instructions } = parseInputToManual(input)

  return recursiveFold(paper, instructions, limit)
}

export function countPixels(paper: Paper): number {
  return paper.flatMap((value) => value).filter(Boolean).length
}

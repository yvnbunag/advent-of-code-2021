import { parseInputToList } from '~/puzzle/utils'

export type Cell = { value: number, called: boolean }

type Row = [Cell, Cell, Cell, Cell, Cell]

export type Board = [Row, Row, Row, Row, Row]

type Second = void

// @TODO create generator
const emptyBoard = [[], [], [], [] ,[]]

function not<
  Predicate extends (...args: Array<any>)=> boolean,
>(predicate: Predicate): Predicate {
  // @ts-expect-error @TODO correct type
  return (...args) => !predicate(...args)
}
function cellIsCalled(cell: Cell) {
  return cell.called
}

export function calculateScore(board: Board, winningCall: number): number {
  return winningCall * board
    .flatMap((cell) => cell)
    .filter(not(cellIsCalled))
    .map(({ value }) => value)
    .reduce((current, next) => current + next)
}

export function hasWon(board: Board): boolean {
  return hasWonHorizontally(board) || hasWonVertically(board)
}

function hasWonHorizontally(board: Board): boolean {
  return board.some((row) => row.filter(cellIsCalled).length === 5)
}

function hasWonVertically(board: Board): boolean {
  const flippedBoard = board
    // @ts-expect-error @TODO correct type
    .reduce((accumulatedBoard, row) => {
      const nextBoard = [...accumulatedBoard]

      return nextBoard.map((column, index) => {
        return [...column, row[index]]
      })
    }, emptyBoard) as unknown as Board // @TODO correct

  return hasWonHorizontally(flippedBoard)
}

export function markBoard(board: Board, call: number): Board {
  // @TODO
  const markedBoard = [
    [...board[0]],
    [...board[1]],
    [...board[2]],
    [...board[3]],
    [...board[4]],
  ]

  markedBoard.forEach((row) => {
    row.forEach((cell) => {
      if (cell.value === call) cell.called = true
    })
  })

  return markedBoard as Board
}

function extractBoards(rawBoards: Array<string>): Array<Board> {
  if (!rawBoards.length) return []

  const firstRawBoard = rawBoards.slice(0, 5)
  const nextRawBoards = rawBoards.splice(5)
  const firstBoard = firstRawBoard.map((row) => {
    return row
      .split(/\s+/)
      .map(Number)
      .map((value) => ({ value, called: false }))
  }) as unknown as Board

  return [firstBoard, ...extractBoards(nextRawBoards)]
}

type Game = {
  sequence: Array<number>,
  boards: Array<Board>,
}

export function parseGame(data: string): Game {
  const [rawSequence, ...rawBoards] = parseInputToList(data)
  const sequence = rawSequence.split(',').map(Number)
  const boards = extractBoards(rawBoards)

  return {
    sequence,
    boards,
  }
}

export function playBingo(data: string) {
  let game = parseGame(data)
  let winnerIndex = -1
  let lastCall = -1

  while (winnerIndex < 0) {
    const { sequence, boards } = game
    const [call, ...nextSequence] = sequence
    const nextBoards = boards.map((board) => markBoard(board, call))
    winnerIndex = nextBoards.findIndex((board) => hasWon(board))
    lastCall = call
    game = { sequence: nextSequence, boards: nextBoards }
  }

  const score = calculateScore(game.boards[winnerIndex], lastCall)

  return {
    winner: winnerIndex + 1,
    score,
  }
}

const boardIndexKey = Symbol('board-index-key')

function injectProperty(board: Board, value: unknown) {
  Object.defineProperty(board, boardIndexKey, {
    enumerable : false,
    value,
  })

  return board
}

function extractProperty(board: Board): unknown {
  // @TODO
  if (boardIndexKey in board) return board[boardIndexKey as any]

  return undefined
}

export function playLosingBingo(data: string) {
  let game = parseGame(data)
  let lastWinningBoards: Array<Board> = []
  let lastCall = -1

  game.boards = game.boards.map((board, index) => injectProperty(board, index))

  while(game.boards.length) {
    const { sequence, boards } = game
    const [call, ...nextSequence] = sequence
    const nextBoards = boards.map((board) => {
      return injectProperty(markBoard(board, call), extractProperty(board))
    })
    const continuingBoards = nextBoards.filter((board) => !hasWon(board))

    lastWinningBoards = nextBoards
    lastCall = call
    game = { sequence: nextSequence, boards: continuingBoards }
  }

  const [lastWinningBoard] = lastWinningBoards
  const score = calculateScore(lastWinningBoard, lastCall)
  const winner = Number(extractProperty(lastWinningBoard)) + 1

  return { score, winner }
}

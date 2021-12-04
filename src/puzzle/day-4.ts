import { parseInputToList, not } from '~/puzzle/utils'

export type Cell = { value: number, called: boolean }
type Row = [Cell, Cell, Cell, Cell, Cell]
export type Board = [Row, Row, Row, Row, Row]
type Game = { sequence: Array<number>, boards: Array<Board> }
type Winner = { id: number, score: number }

import type { Predicate } from '~/puzzle/utils'

const cellIsCalled: Predicate = (cell: Cell) => cell.called

export function calculateScore(board: Board, winningCall: number): number {
  return winningCall * board
    .flatMap((cell) => cell)
    .filter(not(cellIsCalled))
    .map(({ value }) => value)
    .reduce((current, next) => current + next)
}

export const hasWon: Predicate = (board: Board): boolean => {
  return hasWonHorizontally(board) || hasWonVertically(board)
}

function hasWonHorizontally(board: Board): boolean {
  return board.some((row) => row.every(cellIsCalled))
}

function hasWonVertically(board: Board): boolean {
  const emptyBoard = [[], [], [], [] ,[]] as unknown as Board
  const flippedBoard = board.reduce((accumulatedBoard, row) => {
    return [...accumulatedBoard].map(
      (column, index) => [...column, row[index]] as unknown as Row,
    ) as Board
  }, emptyBoard)

  return hasWonHorizontally(flippedBoard)
}

export function markBoard(board: Board, call: number): Board {
  return board.map((row) => {
    return row.map((cell) => {
      if (cell.value !== call) return cell

      return { ...cell, called: true }
    })
  }) as Board
}

function mapBoards(rawBoards: Array<string>): Array<Board> {
  if (!rawBoards.length) return []

  const firstRawBoard = rawBoards.slice(0, 5)
  const nextRawBoards = rawBoards.splice(5)
  const firstBoard = firstRawBoard.map((row) => {
    return row
      .split(/\s+/)
      .map(Number)
      .map((value) => ({ value, called: false }))
  }) as unknown as Board

  return [firstBoard, ...mapBoards(nextRawBoards)]
}

function parseGame(data: string): Game {
  const [rawSequence, ...rawBoards] = parseInputToList(data)
  const sequence = rawSequence.split(',').map(Number)
  const boards = mapBoards(rawBoards)

  return {
    sequence,
    boards,
  }
}

function duplicateBoard(board: Board): Board {
  return board.map((row) => row.map((cell) => cell)) as Board
}

const {
  injectBoardIndex,
  extractBoardIndex,
} = (() => {
  const boardIndexKey = Symbol('board-index-key')

  type IndexedBoard = Board & { [key in typeof boardIndexKey]: number }

  function isIndexedBoard(board: Board | IndexedBoard): board is IndexedBoard {
    return boardIndexKey in board
  }

  function injectBoardIndex(board: Board, value: number): IndexedBoard {
    const injectedBoard = duplicateBoard(board)

    Object.defineProperty(injectedBoard, boardIndexKey, {
      enumerable : false,
      value,
    })

    return injectedBoard as IndexedBoard
  }

  function extractBoardIndex(board: Board | IndexedBoard): number {
    if (isIndexedBoard(board)) return board[boardIndexKey]

    return -1
  }

  return {
    injectBoardIndex,
    extractBoardIndex,
  }
})()

export function playBingo(data: string): Winner {
  let game = parseGame(data)
  let winnerIndex = -1
  let lastCall = -1

  while (winnerIndex < 0) {
    const { sequence, boards } = game
    const [call, ...nextSequence] = sequence
    const nextBoards = boards.map((board) => markBoard(board, call))

    winnerIndex = nextBoards.findIndex(hasWon)
    lastCall = call
    game = { sequence: nextSequence, boards: nextBoards }
  }

  const id = winnerIndex + 1
  const score = calculateScore(game.boards[winnerIndex], lastCall)

  return { id, score }
}

export function playInvertedBingo(data: string): Array<Winner> {
  let game = parseGame(data)
  let remainingBoards: Array<Board> = []
  let lastCall = -1

  game.boards = game.boards
    .map((board, index) => injectBoardIndex(board, index))

  while(game.boards.length) {
    const { sequence, boards } = game
    const [call, ...nextSequence] = sequence
    const nextBoards = boards.map((board) => {
      return injectBoardIndex(markBoard(board, call), extractBoardIndex(board))
    })
    const continuingBoards = nextBoards.filter(not(hasWon))

    remainingBoards = nextBoards
    lastCall = call
    game = { sequence: nextSequence, boards: continuingBoards }
  }

  return remainingBoards.map((board) => {
    return {
      id: Number(extractBoardIndex(board)) + 1,
      score: calculateScore(board, lastCall),
    }
  })
}

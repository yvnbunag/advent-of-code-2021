import {
  calculateScore,
  hasWon,
  markBoard,
  playBingo,
  playInvertedBingo,
} from '~/puzzle/day-4'
import { getInput } from '~/inputs'

import type { Cell, Board } from '~/puzzle/day-4'

describe('Part 1', () => {
  // Cell called generator
  function O(value = 0): Cell & { called: true } {
    return { value, called: true }
  }

  // Cell not called generator
  function X(value = 0): Cell & { called: false } {
    return { value, called: false }
  }

  describe('calculateScore', () => {
    it('should calculate score', () => {
      const board: Board = [
        [O(14), O(21), O(17), O(24), O( 4)],
        [X(10), X(16), X(15), O( 9), X(19)],
        [X(18), X( 8), O(23), X(26), X(20)],
        [X(22), O(11), X(13), X( 6), O( 5)],
        [O( 2), O( 0), X(12), X( 3), O( 7)],
      ]
      expect(calculateScore(board, 24)).toBe(4512)
    })
  })

  describe('hasWon', () => {
    it('should determine if board has won with vertical combination', () => {
      const board: Board = [
        [O(), X(), X(), X(), X()],
        [O(), X(), X(), X(), X()],
        [O(), X(), X(), X(), X()],
        [O(), X(), X(), X(), X()],
        [O(), X(), X(), X(), X()],
      ]

      expect(hasWon(board)).toBeTruthy()
    })

    it('should determine if board has won with horizontal combination', () => {
      const board: Board = [
        [O(), O(), O(), O(), O()],
        [X(), X(), X(), X(), X()],
        [X(), X(), X(), X(), X()],
        [X(), X(), X(), X(), X()],
        [X(), X(), X(), X(), X()],
      ]

      expect(hasWon(board)).toBeTruthy()
    })

    it('should determine if board has not won', () => {
      const board: Board = [
        [O(), O(), X(), O(), O()],
        [O(), X(), X(), X(), X()],
        [X(), X(), X(), X(), X()],
        [O(), X(), X(), X(), X()],
        [O(), X(), X(), X(), X()],
      ]

      expect(hasWon(board)).toBeFalsy()
    })
  })

  describe('markBoard', () => {
    let sharedBoard: Board = [
      [X(1), O( ), X( ), O( ), O( )],
      [X( ), X( ), X( ), X( ), X( )],
      [X( ), X( ), X(2), X( ), X( )],
      [X( ), X( ), X( ), X( ), X( )],
      [X( ), X( ), X( ), X( ), X(3)],
    ]
    function getTargetCells(board: Board): Array<boolean> {
      return [board[0][0], board[2][2], board[4][4]].map(({ called }) => called)
    }

    it('should mark board after 1 pass', () => {
      sharedBoard = markBoard(sharedBoard, 1)

      expect(getTargetCells(sharedBoard)).toEqual([true, false, false])
    })

    it('should mark board after 2 passes', () => {
      sharedBoard = markBoard(sharedBoard, 2)

      expect(getTargetCells(sharedBoard)).toEqual([true, true, false])
    })

    it('should mark board after 3 passes', () => {
      sharedBoard = markBoard(sharedBoard, 3)

      expect(getTargetCells(sharedBoard)).toEqual([true, true, true])
    })
  })

  it('should answer example', () => {
    const data = `
      7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1

      22 13 17 11  0
      8  2 23  4 24
      21  9 14 16  7
      6 10  3 18  5
      1 12 20 15 19

      3 15  0  2 22
      9 18 13 17  5
      19  8  7 25 23
      20 11 10 24  4
      14 21 16 12  6

      14 21 17 24  4
      10 16 15  9 19
      18  8 23 26 20
      22 11 13  6  5
      2  0 12  3  7
    `
    const { id, score } = playBingo(data)

    expect(id).toBe(3)
    expect(score).toBe(4512)
  })

  it('should answer puzzle', () => {
    const data = getInput('day-4')
    const { id, score } = playBingo(data)

    expect(id).toMatchInlineSnapshot(`41`)
    expect(score).toMatchInlineSnapshot(`87456`)
  })

  describe('Part 2', () => {
    it('should answer example', () => {
      const data = `
        7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1

        22 13 17 11  0
        8  2 23  4 24
        21  9 14 16  7
        6 10  3 18  5
        1 12 20 15 19

        3 15  0  2 22
        9 18 13 17  5
        19  8  7 25 23
        20 11 10 24  4
        14 21 16 12  6

        14 21 17 24  4
        10 16 15  9 19
        18  8 23 26 20
        22 11 13  6  5
        2  0 12  3  7
      `
      const [{ id, score }] = playInvertedBingo(data)

      expect(id).toBe(2)
      expect(score).toBe(1924)
    })

    it('should answer puzzle', () => {
      const data = getInput('day-4')
      const [{ id, score }] = playInvertedBingo(data)

      expect(id).toMatchInlineSnapshot(`85`)
      expect(score).toMatchInlineSnapshot(`15561`)
    })
  })
})

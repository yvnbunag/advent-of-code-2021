import {
  calculateScore,
  hasWon,
  markBoard,
  playBingo,
  playLosingBingo,
} from '~/puzzle/day-4'
import { getInput } from '~/inputs'

import type { Cell, Board } from '~/puzzle/day-4'

describe('Part 1', () => {
  // Called generator
  function y(value = 0): Cell & { called: true } {
    return { value, called: true }
  }

  // Not called generator
  function x(value = 0): Cell & { called: false } {
    return { value, called: false }
  }

  describe('calculateScore', () => {
    it('should calculate score', () => {
      const board: Board = [
        [y(14), y(21), y(17), y(24), y(4)],
        [x(10), x(16), x(15), y(9), x(19)],
        [x(18), x(8), y(23), x(26), x(20)],
        [x(22), y(11), x(13), x(6), y(5)],
        [y(2), y(0), x(12), x(3), y(7)],
      ]
      expect(calculateScore(board, 24)).toBe(4512)
    })
  })

  describe('hasWon', () => {
    it('should determine if board has won with vertical combination', () => {
      const board: Board = [
        [y(), x(), x(), x(), x()],
        [y(), x(), x(), x(), x()],
        [y(), x(), x(), x(), x()],
        [y(), x(), x(), x(), x()],
        [y(), x(), x(), x(), x()],
      ]

      expect(hasWon(board)).toBeTruthy()
    })

    it('should determine if board has won with horizontal combination', () => {
      const board: Board = [
        [y(), y(), y(), y(), y()],
        [x(), x(), x(), x(), x()],
        [x(), x(), x(), x(), x()],
        [x(), x(), x(), x(), x()],
        [x(), x(), x(), x(), x()],
      ]

      expect(hasWon(board)).toBeTruthy()
    })

    it('should determine if board has not won', () => {
      const board: Board = [
        [y(), y(), x(), y(), y()],
        [x(), x(), x(), x(), x()],
        [x(), x(), x(), x(), x()],
        [x(), x(), x(), x(), x()],
        [x(), x(), x(), x(), x()],
      ]

      expect(hasWon(board)).toBeFalsy()
    })
  })

  describe('markBoard', () => {
    let sharedBoard: Board = [
      [x(1), y(), x(), y(), y()],
      [x(), x(), x(), x(), x()],
      [x(), x(), x(2), x(), x()],
      [x(), x(), x(), x(), x()],
      [x(), x(), x(), x(), x(3)],
    ]
    it('should mark board after 1 pass', () => {
      sharedBoard = markBoard(sharedBoard, 1)

      expect(sharedBoard[0][0].called).toBeTruthy()
    })

    it('should mark board after 2 passes', () => {
      sharedBoard = markBoard(sharedBoard, 2)

      expect(sharedBoard[2][2].called).toBeTruthy()
    })

    it('should mark board after 3 passes', () => {
      sharedBoard = markBoard(sharedBoard, 3)

      expect(sharedBoard[4][4].called).toBeTruthy()
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

    expect(playBingo(data).score).toBe(4512)
  })

  it('should answer puzzle', () => {
    const data = getInput('day-4')

    expect(playBingo(data)).toMatchInlineSnapshot(`
      Object {
        "score": 87456,
        "winner": 41,
      }
    `)
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

      expect(playLosingBingo(data)).toMatchInlineSnapshot(`
        Object {
          "score": 1924,
          "winner": 2,
        }
      `)
    })

    it('should answer puzzle', () => {
      const data = getInput('day-4')

      expect(playLosingBingo(data)).toMatchInlineSnapshot(`
        Object {
          "score": 15561,
          "winner": 85,
        }
      `)
    })
  })
})

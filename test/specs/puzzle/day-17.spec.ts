import { shoot, isWithinTarget, isBeyondTarget, first, second } from '~/puzzle/day-17'
import { getInput } from '~/inputs'

import type { TargetArea, Position, Trajectory } from '~/puzzle/day-17'

describe('Methods', () => {
  test('shoot', () => {
    const position: Position = { x: 0, y: 0 }
    const trajectory: Trajectory = { x:7, y: 2 }
    const probe = { position, trajectory }
    const history = shoot(probe, ({ length }) => length > 7 )
    const [
      p1, p2, p3, p4, p5, p6, p7, p8,
    ] = history

    expect(p1).toMatchSnapshot()
    expect(p2).toMatchSnapshot()
    expect(p3).toMatchSnapshot()
    expect(p4).toMatchSnapshot()
    expect(p5).toMatchSnapshot()
    expect(p6).toMatchSnapshot()
    expect(p7).toMatchSnapshot()
    expect(p8).toMatchSnapshot()
  })

  describe('isWithinTarget', () => {
    test('Inside 1', () => {
      const target = {
        x: [20, 30],
        y: [-10, -5],
      } as TargetArea
      const position: Position = {
        x: 28,
        y: -7,
      }
      expect(isWithinTarget(target, position)).toBe(true)
    })

    test('Outside 1', () => {
      const target = {
        x: [20, 30],
        y: [-10, -5],
      } as TargetArea
      const position: Position = {
        x: 27,
        y: -3,
      }
      expect(isWithinTarget(target, position)).toBe(false)
    })

    test('Inside 2', () => {
      const target = {
        x: [20, 30],
        y: [-10, -5],
      } as TargetArea
      const position: Position = {
        x: 22,
        y: -9,
      }
      expect(isWithinTarget(target, position)).toBe(true)
    })

    test('Outside 2', () => {
      const target = {
        x: [20, 30],
        y: [-10, -5],
      } as TargetArea
      const position: Position = {
        x: 22,
        y: -4,
      }
      expect(isWithinTarget(target, position)).toBe(false)
    })
  })

  describe('isBeyondTarget', () => {
    test('before 1', () => {
      const target = {
        x: [20, 30],
        y: [-10, -5],
      } as TargetArea
      const position: Position = {
        x: 27,
        y: -3,
      }
      expect(isBeyondTarget(target, position)).toBe(false)
    })

    test('within 1', () => {
      const target = {
        x: [20, 30],
        y: [-10, -5],
      } as TargetArea
      const position: Position = {
        x: 28,
        y: -7,
      }
      expect(isBeyondTarget(target, position)).toBe(false)
    })

    test('beyond 1', () => {
      const target = {
        x: [20, 30],
        y: [-10, -5],
      } as TargetArea
      const position: Position = {
        x: 28,
        y: -12,
      }
      expect(isBeyondTarget(target, position)).toBe(true)
    })

    test('before 2', () => {
      const target = {
        x: [20, 30],
        y: [-10, -5],
      } as TargetArea
      const position: Position = {
        x: 24,
        y: -3,
      }
      expect(isBeyondTarget(target, position)).toBe(false)
    })

    test('within 2', () => {
      const target = {
        x: [20, 30],
        y: [-10, -5],
      } as TargetArea
      const position: Position = {
        x: 30,
        y: -6,
      }
      expect(isBeyondTarget(target, position)).toBe(false)
    })

    test('beyond 2', () => {
      const target = {
        x: [20, 30],
        y: [-10, -5],
      } as TargetArea
      const position: Position = {
        x: 35,
        y: -10,
      }
      expect(isBeyondTarget(target, position)).toBe(true)
    })
  })
})

describe('Part 1 ', () => {
  it('should answer example', () => {
    const data = `target area: x=20..30, y=-10..-5`

    // expect(first(data)).toBe(0)
  })

  it('should answer puzzle', () => {
    // const data = getInput('day-17')

    // expect(first(data)).toMatchInlineSnapshot(`0`)
  })
})

describe('Part 2', () => {
  it('should answer example', () => {
    const data = ``

    expect(second(data)).toBe(0)
  })

  it('should answer puzzle', () => {
    const data = getInput('day-17')

    expect(second(data)).toMatchInlineSnapshot(`0`)
  })
})

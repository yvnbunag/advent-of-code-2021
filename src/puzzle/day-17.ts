import { parseInputToList } from '~/puzzle/utils'

export type Trajectory = {
  x: number,
  y: number,
}

export type Position = {
  x: number,
  y: number,
}

type Range = [number, number]

export type TargetArea = {
  x: Range,
  y: Range,
}

type Probe = {
  trajectory: Trajectory,
  position: Position,
}

type History = Array<Probe>

function parseToTargetArea(input: string) {
  const x = input.match(/x=(-*\d+)..(-*\d+)/)?.slice(1, 3)
    .map(Number)
  const y = input.match(/y=(-*\d+)..(-*\d+)/)?.slice(1, 3)
    .map(Number)

  return { x, y } as TargetArea
}

export function shoot(
  probe: Probe,
  until: (history: History)=> boolean = () => false,
): History {
  const history = [probe]
  const currentPosition: Position = { ...probe.position }
  const currentTrajectory: Trajectory = { ...probe.trajectory }

  while (!until(history)) {
    if (currentTrajectory.x > 0) {
      currentPosition.x = currentPosition.x + currentTrajectory.x--
    }

    currentPosition.y = currentPosition.y + currentTrajectory.y--

    history.push({
      position: { ...currentPosition },
      trajectory: { ...currentTrajectory },
    })
  }

  return history
}

export function isWithinTarget(area: TargetArea, { x, y }: Position) {
  const withinX = x >= area.x[0] && x <= area.x[1]
  const withinY = y >= area.y[0] && y <= area.y[1]

  return withinX && withinY
}

export function isBeyondTarget(area: TargetArea, { x, y }: Position) {
  const beyondX = x > area.x[1]
  const beyondY = y < area.y[0]

  return beyondX || beyondY
}

export function first(input: string) {
  const data = parseToTargetArea(input)
  const initial: Position = { x: 0, y: 0 }

  console.log(data)

  return 0
}

export function second(input: string) {
  const data = parseInputToList(input)

  return 0
}

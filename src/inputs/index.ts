import { readFileSync } from 'fs'

type Numbers = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 0
type Days = `${Numbers}${Numbers}` | Numbers
type FileName = `day-${Days}-${Numbers}`

export function getInput(filename: FileName): string {
  return readFileSync(`${__dirname}/${filename}.txt`, { encoding: 'utf8' })
}

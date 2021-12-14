import { parseInputToList } from '~/puzzle/utils'
import { splitBy, trim } from '~/puzzle/utils/string'
import { createMultipleOfCounter } from '~/puzzle/utils/number'
import {
  createNameGenerator,
  createAppendWriter,
  endWriter,
  createLineReader,
  read,
} from '~/puzzle/utils/file'

import type { FileName } from '~/puzzle/utils/file'

type Rules = Record<string, string>

export async function insert(
  input: string,
  step: number,
) {
  async function recursiveInsert(
    rules: Rules,
    step: number,
    createName: ReturnType<typeof createNameGenerator>,
  ): Promise<FileName> {
    if (step < 1) return createName(step) // Last file

    const nextStep = step - 1
    const writer = createAppendWriter(createName(nextStep))
    const isMultipleOfMillion = createMultipleOfCounter(1000000)
    let previous: string | null = null
    const setPrevious = (value: string) => previous = value

    /**
     * Skipped recursive function implementation as it would hit max call stack
     *  limit within 1M line length
     */
    for await (const line of createLineReader(createName(step))) {
      for (const element of line.split('')) {
        if (!previous) {
          writer.write(setPrevious(element))

          continue
        }

        const separator = isMultipleOfMillion() ? '\n' : ''
        const pairEquivalent = rules[`${previous}${element}`]

        writer.write(`${separator}${pairEquivalent}${element}`)
        setPrevious(element)
      }
    }

    await endWriter(writer)

    return recursiveInsert(rules, nextStep, createName)
  }

  const data = parseInputToList(input)
  const [template, ...rawRules] = data
  const rules: Rules = Object.fromEntries(
    rawRules
      .map(splitBy('->'))
      .map((ruleTuple) => ruleTuple.map(trim)),
  )
  const createName = createNameGenerator('day-14')
  const writer = createAppendWriter(createName(step))

  writer.write(template)
  await endWriter(writer)

  return recursiveInsert(rules, step, createName)
}

export async function readTemplate(fileName: FileName) {
  const template = await read(fileName)

  return template.replace(/\n/g, '')
}

export async function getEdgeCountDifference(fileName: FileName) {
  const counts: Record<string, number> = {}

  for await (const line of createLineReader(fileName)) {
    for (const element of line.split('')) {
      if (!(element in counts)) counts[element] = 0

      counts[element] = counts[element] + 1
    }
  }

  const ordered = Object.entries(counts)
    .sort(([,first], [,second]) => first - second)
  const [,lowest] = ordered[0]
  const [,highest] = ordered[ordered.length - 1]

  return highest - lowest
}

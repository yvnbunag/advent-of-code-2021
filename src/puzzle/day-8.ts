/* eslint-disable max-len */
import { parseInputToList, add } from '~/puzzle/utils'

type Note = {
  signals: Array<Array<string>>,
  output: Array<Array<string>>,
}

function splitBy(delimiter: string) {
  return (value: string) => value.split(delimiter)
}

function trim(value: string): string {
  return value.trim()
}

function sortByLetter(list: Array<string>): Array<string> {
  function sort(first: string, second: string) {
    return first.toLowerCase().localeCompare(second.toLowerCase())
  }

  return list.sort(sort)
}

const segments: Note['signals'] = [
  /** 0 **/ ['a', 'b', 'c', 'e', 'f', 'g'],
  /** 1 **/ ['c', 'f'],
  /** 2 **/ ['a', 'c', 'd', 'e', 'g'],
  /** 3 **/ ['a', 'c', 'd', 'f', 'g'],
  /** 4 **/ ['b', 'c', 'd', 'f'],
  /** 5 **/ ['a', 'b', 'd', 'f', 'g'],
  /** 6 **/ ['a', 'b', 'd', 'e', 'f', 'g'],
  /** 7 **/ ['a', 'c', 'f'],
  /** 8 **/ ['a', 'b', 'c', 'd','e', 'f', 'g'],
  /** 9 **/ ['a', 'b', 'c', 'd', 'f', 'g'],
]

function isOne(signal: Note['signals'][number]): boolean {
  return signal.length === segments[1].length
}

function isSeven(signal: Note['signals'][number]): boolean {
  return signal.length === segments[7].length
}

function isFour(signal: Note['signals'][number]): boolean {
  return signal.length === segments[4].length
}

function isEight(signal: Note['signals'][number]): boolean {
  return signal.length === segments[8].length
}

function isEquivalentSignal(
  first: Array<string>,
  second: Array<string>,
): boolean {
  return first.join('') === second.join('')
}

export function first(input: string) {
  const data: Array<Note> = parseInputToList(input, '\n')
    .map(splitBy('|'))
    .map((rawNotes) => rawNotes.map(trim))
    .map((rawNotes) => rawNotes.map(splitBy(' ')))
    .map(([rawSignals, rawOutput]) => [rawSignals.map(splitBy('')), rawOutput.map(splitBy(''))])
    .map(([signals, output]) => [signals.map(sortByLetter), output.map(sortByLetter)])
    .map(([signals, output]) => ({ signals, output }))

  let count = 0

  data.forEach((note) => {
    const one = note.signals[note.signals.findIndex(isOne)]
    const seven = note.signals[note.signals.findIndex(isSeven)]
    const four = note.signals[note.signals.findIndex(isFour)]
    const eight = note.signals[note.signals.findIndex(isEight)]

    note.output.forEach((value) => {
      if (isEquivalentSignal(value, one)) count = count + 1
      if (isEquivalentSignal(value, seven)) count = count + 1
      if (isEquivalentSignal(value, four)) count = count + 1
      if (isEquivalentSignal(value, eight)) count = count + 1
    })
  })

  return count
}

function createIsNine(
  equivalents: Record<'one' | 'four' | 'seven', Note['signals'][number]>,
) {
  const equivalentsList = Object.values(equivalents)

  return (signal: Note['signals'][number]): boolean => {
    return equivalentsList.every((equivalent) => {
      return equivalent.every((eq) => signal.some((value) => value.includes(eq)))
        && !isEight(signal)
    })
  }
}

function createIsZero(
  equivalents: Record<'one' | 'seven', Note['signals'][number]>,
  isNine: ReturnType<typeof createIsNine>,
) {
  const equivalentsList = Object.values(equivalents)

  return (signal: Note['signals'][number]): boolean => {
    return equivalentsList.every((equivalent) => {
      return equivalent.every((eq) => signal.some((value) => value.includes(eq)))
        && !isEight(signal)
    }) && !isNine(signal) && signal.length === segments[0].length
  }
}

function createIsSix(
  isZero: ReturnType<typeof createIsZero>,
  isNine: ReturnType<typeof createIsNine>,
) {
  return (signal: Note['signals'][number]): boolean => {
    return signal.length === segments[6].length
      && !isZero(signal)
      && !isNine(signal)
  }
}

function createIsThree(
  equivalents: Record<'one' | 'seven', Note['signals'][number]>,
) {
  const equivalentsList = Object.values(equivalents)

  return (signal: Note['signals'][number]): boolean => {
    return equivalentsList.every((equivalent) => {
      return equivalent.every((eq) => signal.some((value) => value.includes(eq)))
        && signal.length === segments[3].length
    })
  }
}

function createIsTwo(
  isThree: ReturnType<typeof createIsThree>,
  isFive: ReturnType<typeof createIsFive>,
) {
  return (signal: Note['signals'][number]): boolean => {
    return signal.length === segments[2].length
      && !isThree(signal)
      && !isFive(signal)
  }
}

function createIsFive(
  commons: Record<'one' | 'six', Note['signals'][number]>,
  isThree: ReturnType<typeof createIsThree>,
) {
  const { six, one } = commons
  const commonF = one.find((value) => six.includes(value))

  return (signal: Note['signals'][number]): boolean => {
    return signal.some((value) => value === commonF)
      && signal.length === segments[5].length
      && !isThree(signal)
  }
}

export function second(input: string) {
  const data: Array<Note> = parseInputToList(input, '\n')
    .map(splitBy('|'))
    .map((rawNotes) => rawNotes.map(trim))
    .map((rawNotes) => rawNotes.map(splitBy(' ')))
    .map(([rawSignals, rawOutput]) => [rawSignals.map(splitBy('')), rawOutput.map(splitBy(''))])
    .map(([signals, output]) => [signals.map(sortByLetter), output.map(sortByLetter)])
    .map(([signals, output]) => ({ signals, output }))

  const values = data.map((note) => {
    const one = note.signals[note.signals.findIndex(isOne)]
    const seven = note.signals[note.signals.findIndex(isSeven)]
    const four = note.signals[note.signals.findIndex(isFour)]
    const eight = note.signals[note.signals.findIndex(isEight)]

    const isNine = createIsNine({ one, four, seven })
    const nine = note.signals[note.signals.findIndex(isNine)]

    const isZero = createIsZero({ one, seven }, isNine)
    const zero = note.signals[note.signals.findIndex(isZero)]

    const isSix = createIsSix(isZero, isNine)
    const six = note.signals[note.signals.findIndex(isSix)]

    const isThree = createIsThree({ one, seven })
    const three = note.signals[note.signals.findIndex(isThree)]

    const isFive = createIsFive({ one, six }, isThree)
    const five = note.signals[note.signals.findIndex(isFive)]

    const isTwo = createIsTwo(isThree, isFive)
    const two = note.signals[note.signals.findIndex(isTwo)]
    const equivalents = [
      zero,
      one,
      two,
      three,
      four,
      five,
      six,
      seven,
      eight,
      nine,
    ]

    const outputValue = note.output.map((value) => {
      return equivalents.findIndex((equivalent) => isEquivalentSignal(equivalent, value))
    })

    return Number(outputValue.join(''))
  })

  return values.reduce(add, 0)
}

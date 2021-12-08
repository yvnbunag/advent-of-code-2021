import { parseInputToList, operation, string, list } from '~/puzzle/utils'

const { trim, splitBy } = string
const { sortByLetter } = list

type Display = ReadonlyArray<string>

type Signal = Array<Display>

type Note = {
  signal: Signal,
  output: Signal,
}

type DisplayPredicate = (signal: Display)=> boolean

const correctSegments: Signal = [
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

function hasEveryShadow(display: Display, shadows: Array<Display>): boolean {
  return Object.values(shadows).every((shadow) => {
    return shadow.every(
      (shadowValue) => display
        .some((displayValue) => displayValue.includes(shadowValue)),
    )
  })
}

function isOne({ length }: Display): boolean {
  return length === correctSegments[1].length
}

function isSeven({ length }: Display): boolean {
  return length === correctSegments[7].length
}

function isFour({ length }: Display): boolean {
  return length === correctSegments[4].length
}

function isEight({ length }: Display): boolean {
  return length === correctSegments[8].length
}

function createIsNine(
  shadows: Record<'one' | 'four' | 'seven', Display>,
): DisplayPredicate {
  return (signal) => {
    return hasEveryShadow(signal, Object.values(shadows))
      && !isEight(signal)
  }
}

function createIsZero(
  shadows: Record<'one' | 'seven', Display>,
  notPredicates: Record<'isNine', DisplayPredicate>,
): DisplayPredicate {
  return (signal) => {
    return signal.length === correctSegments[0].length
      && hasEveryShadow(signal, Object.values(shadows))
      && !Object.values(notPredicates).some((predicate) => predicate(signal))
  }
}

function createIsSix(
  notPredicates: Record<'isNine' | 'isZero', DisplayPredicate>,
): DisplayPredicate {
  return (signal) => {
    return signal.length === correctSegments[6].length
      && !Object.values(notPredicates).some((predicate) => predicate(signal))
  }
}

function createIsThree(
  shadows: Record<'one' | 'seven', Display>,
): DisplayPredicate {
  return (signal) => {
    return signal.length === correctSegments[3].length
      && hasEveryShadow(signal, Object.values(shadows))
  }
}

function createIsFive(
  commonDisplaySources: Record<'one' | 'six', Display>,
  notPredicates: Record<'isThree', DisplayPredicate>,
): DisplayPredicate {
  // Intersect 1 and 6 to get common display with 5
  const { one, six } = commonDisplaySources
  const commonDisplay = one.find((value) => six.includes(value))

  return (signal) => {
    return signal.length === correctSegments[5].length
      && signal.some((value) => value === commonDisplay)
      && !Object.values(notPredicates).some((predicate) => predicate(signal))
  }
}

function createIsTwo(
  notPredicates: Record<'isThree' | 'isFive', DisplayPredicate>,
): DisplayPredicate {
  return (signal) => {
    return signal.length === correctSegments[2].length
      && !Object.values(notPredicates).some((predicate) => predicate(signal))
  }
}

function extractDisplay(
  signal: Signal,
  condition: (display: Display)=> boolean,
): Display {
  return signal[signal.findIndex(condition)]
}

function isEquivalentSignal(first: Display, second: Display): boolean {
  return first.join('') === second.join('')
}

function createGetDisplayValue(
  signal: Signal,
): (display: Display)=> number {
  const one = extractDisplay(signal, isOne)
  const seven = extractDisplay(signal, isSeven)
  const four = extractDisplay(signal, isFour)
  const eight = extractDisplay(signal, isEight)

  const isNine = createIsNine({ one, four, seven })
  const nine = extractDisplay(signal, isNine)

  const isZero = createIsZero({ one, seven }, { isNine })
  const zero = extractDisplay(signal, isZero)

  const isSix = createIsSix({ isZero, isNine })
  const six = extractDisplay(signal, isSix)

  const isThree = createIsThree({ one, seven })
  const three = extractDisplay(signal, isThree)

  const isFive = createIsFive({ one, six }, { isThree })
  const five = extractDisplay(signal, isFive)

  const isTwo = createIsTwo({ isThree, isFive })
  const two = extractDisplay(signal, isTwo)

  const segments = [zero, one, two, three, four, five, six, seven, eight, nine]

  return (display) => segments
    .findIndex((segment) => isEquivalentSignal(segment, display))
}

function parseInputToNotes(input: string): Array<Note> {
  return parseInputToList(input, '\n')
    .map(splitBy('|'))
    .map((rawNotes) => rawNotes.map(trim))
    .map((rawNotes) => rawNotes.map(splitBy(' ')))
    .map((rawNote) => rawNote.map((noteEntry) => noteEntry.map(splitBy(''))))
    .map((rawNote) => rawNote.map((noteEntry) => noteEntry.map(sortByLetter)))
    .map(([signal, output]) => ({ signal, output }))
}

function createToOutputOccurrences(
  getDisplayValue: ReturnType<typeof createGetDisplayValue>,
  values: Array<number>,
) {
  return (occurrences: number, display: Display) => {
    const displayOccurrences = values
      .filter((value) => getDisplayValue(display) === value)
      .length

    return occurrences + displayOccurrences
  }
}

function createToNoteOccurrences(values: Array<number>) {
  return (occurrences: number, { signal, output }: Note) => {
    const getDisplayValue = createGetDisplayValue(signal)
    const outputOccurrences = output
      .reduce(createToOutputOccurrences(getDisplayValue, values), 0)

    return occurrences + outputOccurrences
  }
}

export function inferOccurrences(input: string, values: Array<number>) {
  const notes = parseInputToNotes(input)

  return notes.reduce(createToNoteOccurrences(values), 0)
}

export function inferOutputTotal(input: string) {
  const notes = parseInputToNotes(input)
  const values = notes.map(({ signal, output }) => {
    const getDisplayValue = createGetDisplayValue(signal)
    const outputValue = output.map(getDisplayValue)

    return Number(outputValue.join(''))
  })

  return values.reduce(operation.add, 0)
}

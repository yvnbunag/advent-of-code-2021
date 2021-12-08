import { parseInputToList } from '~/puzzle/utils/version-1'

type Rate = {
  gamma: string,
  epsilon: string,
}

type LifeSupport = {
  O2: string,
  CO2: string,
}

function aggregateByCommonCondition<
  Value,
  Map extends Record<string, Value>,
> (
  map: Map,
  getCommonKey: (
    common: Value,
    next: Value,
    commonKey: keyof Map,
    nextKey: keyof Map,
    )=> keyof Map,
) {
  let commonKey: keyof Map | null = null

  for (const key of Object.keys(map)) {
    if (commonKey === null) {
      commonKey = key

      continue
    }

    commonKey = getCommonKey(map[commonKey], map[key], commonKey, key)
  }

  return commonKey
}

function mapUniqueCounts<
  Value extends string | number,
  Map extends Record<Value, number>,
>(values: Array<Value>): Map {
  return values.reduce((accumulation, value) => {
    if (value in accumulation) {
      return {
        ...accumulation,
        [value]: accumulation[value] + 1,
      }
    }

    return {
      ...accumulation,
      [value]: 1,
    }
  }, {} as Map)
}

function getCommonValue<
  Value,
  Map extends Record<string, Value>,
>(map: Map, equalKey?: keyof Map) {
  return aggregateByCommonCondition<Value, Map>(
    map,
    (common, next, commonKey, nextKey) => {
      if (next > common) return nextKey

      if (equalKey && next === common) return equalKey

      return commonKey
    },
  )
}

function getUncommonValue<
  Value,
  Map extends Record<string, Value>,
>(map: Map, equalKey?: keyof Map) {
  return aggregateByCommonCondition<Value, Map>(
    map,
    (common, next, commonKey, nextKey) => {
      if (next < common) return nextKey

      if (equalKey && next === common) return equalKey

      return commonKey
    },
  )
}

function getMatchingKeys<Value, Values extends Array<Value>>(
  values: Values,
  matchingValue: Value,
): Array<keyof Values> {
  return values
    .map((value, index) => {
      if (value === matchingValue) return index

      return null
    })
    .filter((key) => key !== null) as Array<keyof Values>
}

export function calculateRates(report: string): Rate {
  const binaries = parseInputToList(report)
  const binaryMatrix = binaries.map((binary) => binary.split(''))
  const binaryGroup = binaryMatrix
    .reduce((group, matrix) => {
      const currentGroup = [...group]

      for (const key of matrix.keys()) {
        if (!Array.isArray(currentGroup[key])) {
          currentGroup[key] = [matrix[key]]

          continue
        }

        currentGroup[key] = [...currentGroup[key], matrix[key]]
      }

      return currentGroup
    }, [] as Array<Array<string>>)
    .map((group) => mapUniqueCounts(group))
  const gamma = binaryGroup
    .map((counts) => getCommonValue(counts, '1'))
    .join('')
  const epsilon = binaryGroup
    .map((counts) => getUncommonValue(counts, '1'))
    .join('')

  return { gamma, epsilon }
}

export function calculateLifeSupport(report: string): LifeSupport {
  const binaries = parseInputToList(report)
  const binaryMatrix = binaries.map((binary) => binary.split(''))
  const O2 = calculateOxygen(binaryMatrix)
  const CO2 = calculateCarbonDioxide(binaryMatrix)

  return { O2, CO2 }
}

function calculateOxygen(
  binaryMatrix: Array<Array<string>>,
  position = 0,
): string {
  if (binaryMatrix.length === 1) return binaryMatrix[0].join('')

  const currentBits = binaryMatrix.map((binary) => binary[position])
  const uniqueCounts = mapUniqueCounts(currentBits)
  const commonBit = getCommonValue(uniqueCounts, '1')
  const commonKeys = getMatchingKeys(currentBits, commonBit)
  const commonMatrix = binaryMatrix.filter(
    (value, index) => commonKeys.includes(index),
  )

  return calculateOxygen(commonMatrix, position + 1)
}

function calculateCarbonDioxide(
  binaryMatrix: Array<Array<string>>,
  position = 0,
): string {
  if (binaryMatrix.length === 1) return binaryMatrix[0].join('')

  const currentBits = binaryMatrix.map((binary) => binary[position])
  const uniqueCounts = mapUniqueCounts(currentBits)
  const uncommonBit = getUncommonValue(uniqueCounts, '0')
  const uncommonKeys = getMatchingKeys(currentBits, uncommonBit)
  const uncommonMatrix = binaryMatrix.filter(
    (value, index) => uncommonKeys.includes(index),
  )

  return calculateCarbonDioxide(uncommonMatrix, position + 1)
}

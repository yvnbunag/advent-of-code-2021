import { parseInputToList } from '~/puzzle/utils'

type Rate = {
  gamma: string,
  epsilon: string,
}

/** Day 3 Part 1 */
export function calculateRates(report: string): Rate {
  const binaries = parseInputToList(report)
  const binaryMatrix = binaries.map((binary) => binary.split(''))
  const binaryGroup = binaryMatrix
    .reduce((accumulation, matrix) => {
      const newAccumulation = [...accumulation]

      for (const key of matrix.keys()) {
        if (Array.isArray(newAccumulation[key])) {
          newAccumulation[key] = [...newAccumulation[key], matrix[key]]
        } else {
          newAccumulation[key] = [matrix[key]]
        }
      }

      return newAccumulation
    }, [] as Array<Array<string>>)
    .map((group) => {
      return group.reduce((counts, value) => {
        if (value in counts) {
          return {
            ...counts,
            [value]: counts[value] + 1,
          }
        }

        return {
          ...counts,
          [value]: 0,
        }
      }, {} as Record<string, number>)
    })

  const commonBinaries = binaryGroup.map((counts) => {
    let highestCount = -Infinity
    let commonBinary = null

    for (const key of Object.keys(counts)) {
      if (counts[key] > highestCount) {
        highestCount = counts[key]
        commonBinary = key
      }
    }

    return commonBinary
  })
  const uncommonBinaries = binaryGroup.map((counts) => {
    let highestCount = Infinity
    let commonBinary = null

    for (const key of Object.keys(counts)) {
      if (counts[key] < highestCount) {
        highestCount = counts[key]
        commonBinary = key
      }
    }

    return commonBinary
  })

  return {
    gamma: commonBinaries.join(''),
    epsilon: uncommonBinaries.join(''),
  }
}

type LifeSupport = {
  O2: string,
  CO2: string,
}

/** Day 3 Part 2 */
export function calculateLifeSupport(report: string): LifeSupport {
  const binaries = parseInputToList(report)
  const binaryMatrix = binaries.map((binary) => binary.split(''))

  return {
    O2: calculateOxygen(binaryMatrix),
    CO2: calculateCarbonDioxide(binaryMatrix),
  }
}

function calculateOxygen(
  binaryMatrix: Array<Array<string>>,
  position = 0,
): string {
  if (binaryMatrix.length === 1) return binaryMatrix[0].join('')

  const currentBits = binaryMatrix.map((binary) => binary[position])
  const counts = currentBits.reduce((accumulation, value) => {
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
  }, {} as Record<string, number>)
  const commonBit = (() => {
    let highestCount = -Infinity
    let common = null

    for (const key of Object.keys(counts)) {
      if (counts[key] > highestCount) {
        highestCount = counts[key]
        common = key

        continue
      }

      if (counts[key] === highestCount) {
        common = '1'

        continue
      }
    }

    return common
  })()

  const commonKeys = currentBits
    .map((value, index) => {
      if (value === commonBit) return index

      return null
    })
    .filter((key) => key !== null)
  const commonMatrix = binaryMatrix.filter((value, index) => {
    return commonKeys.includes(index)
  })

  return calculateOxygen(commonMatrix, position + 1)
}

function calculateCarbonDioxide(
  binaryMatrix: Array<Array<string>>,
  position = 0,
): string {
  if (binaryMatrix.length === 1) return binaryMatrix[0].join('')

  const currentBits = binaryMatrix.map((binary) => binary[position])
  const counts = currentBits.reduce((accumulation, value) => {
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
  }, {} as Record<string, number>)
  const uncommonBit = (() => {
    let lowestCount = Infinity
    let common = null

    for (const key of Object.keys(counts)) {
      if (counts[key] < lowestCount) {
        lowestCount = counts[key]
        common = key

        continue
      }

      if (counts[key] === lowestCount) {
        common = '0'

        continue
      }
    }

    return common
  })()

  const uncommonKeys = currentBits
    .map((value, index) => {
      if (value === uncommonBit) return index

      return null
    })
    .filter((key) => key !== null)
  const uncommonMatrix = binaryMatrix.filter((value, index) => {
    return uncommonKeys.includes(index)
  })

  return calculateCarbonDioxide(uncommonMatrix, position + 1)
}
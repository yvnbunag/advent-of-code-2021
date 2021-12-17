import { parseInputToList } from '~/puzzle/utils'
import { add } from '~/puzzle/utils/number'
import { memoize } from '~/puzzle/utils/cache'

const binaryMap: Record<string, string> = {
  '0': '0000',
  '1': '0001',
  '2': '0010',
  '3': '0011',
  '4': '0100',
  '5': '0101',
  '6': '0110',
  '7': '0111',
  '8': '1000',
  '9': '1001',
  'A': '1010',
  'B': '1011',
  'C': '1100',
  'D': '1101',
  'E': '1110',
  'F': '1111',
}

type Bit = '0' | '1'

type PacketVersion = `${Bit}${Bit}${Bit}`

type PacketType = `${Bit}${Bit}${Bit}`

type SubPacket = string

type Packet = `${PacketVersion}${PacketType}${SubPacket}`


// @TODO lib
function splitAtIndex(value: string, index: number) {
  return [value.substring(0, index), value.substring(index)]
}

export function toNumber(binary: string): number {
  return parseInt(binary, 2)
}

const disabled = true

export const toPacket = memoize(
  (value: string) => {
    return value.split('')
      .map((part) => binaryMap[part])
      .join('') as Packet
  },
  { disabled },
)

export const getVersion = memoize(
  (packet: Packet) => {
    return toNumber(packet.substring(0, 3))
  },
  { disabled },
)

export const getType = memoize(
  (packet: Packet) => {
    return toNumber(packet.substring(3, 6))
  },
  { disabled },
)

export const extractSubPackets = memoize(
  (
    packet: Packet,
    startFrom = 0,
  ): Array<Packet> => {
    const packets: Array<Packet> = []
    let remaining = packet.substring(startFrom)

    while (remaining.length) {
      let [binary, splitRemaining] = splitAtIndex(remaining, 6)

      // eslint-disable-next-line no-constant-condition
      while (true) {
        const [current, next] = splitAtIndex(splitRemaining, 5)

        binary = binary + current
        splitRemaining = next

        if (current[0] !== '1') {
          remaining = next
          packets.push(binary as Packet)

          break
        }
      }
    }

    return packets
  },
  {
    getKey: (packet, startFrom) => [packet, String(startFrom)],
    disabled,
  },
)

export const getLiteralValue = memoize(
  (packet: Packet) => {
    let binary = ''
    let remaining = packet.substring(6)
    let type = '1'

    while (type === '1') {
      const [current, next] = splitAtIndex(remaining, 5)
      const [currentType, value]= splitAtIndex(current, 1)

      binary = binary + value
      remaining = next
      type = currentType
    }

    return toNumber(binary)
  },
  { disabled },
)

export const isLiteral = memoize(
  (packet: Packet): boolean => {
    return getType(packet) === 4
  },
  { disabled },
)

export const isOperator = memoize(
  (packet: Packet): boolean => {
    return !isLiteral(packet)
  },
  { disabled },
)

export const getOperatorLengthTypeID = memoize(
  (packet: Packet) => {
    return +packet[6]
  },
  { disabled },
)

export const isSubPacketLength = memoize(
  (lengthTypeId: number) => {
    return lengthTypeId === 0
  },
  { disabled },
)

export const getOperatorSubPacketLength = memoize(
  (packet: Packet) => {
    return toNumber(packet.substring(7, 22))
  },
  { disabled },
)

export const isSubPacketCount = memoize(
  (lengthTypeId: number) => {
    return lengthTypeId === 1
  },
  { disabled },
)

export const getOperatorSubPacketCount = memoize(
  (packet: Packet) => {
    return toNumber(packet.substring(7, 18))
  },
  { disabled },
)

export function first(input: string) {
  const queue: Array<Packet> = [toPacket(input)]
  let totalVersions = 0
  totalVersions = 0

  while (queue.length) {
    const packet = queue.pop() as Packet
    totalVersions = totalVersions + getVersion(packet)


    if (isLiteral(packet)) continue

    const lengthTypeID = getOperatorLengthTypeID(packet)

    if (isSubPacketLength(lengthTypeID)) {
      const length = getOperatorSubPacketLength(packet)
      const subPackets = extractSubPackets(
        packet,
        22,
      )
      let index = 0
      let count = 0

      for (const subPacket of subPackets) {
        count = count + subPacket.length
        index = index + 1

        if (count >= length) break
      }

      queue.push(...subPackets.slice(0, index + 1))
    }
    else {
      const count = getOperatorSubPacketCount(packet)
      const subPackets = count === 1
        ? [packet.substring(18) as Packet]
        : (() => {
          const sp = extractSubPackets(
            packet,
            18,
          )
          const sliced = sp.splice(0, count)

          if (sp.length) {
            // @ts-expect-error asd
            sliced[sliced.length - 1] = sliced[sliced.length - 1] + sp.join('')
          }

          return sliced
        })()

      queue.push(...subPackets)
    }
  }

  return totalVersions
}

export function second(input: string) {
  const data = parseInputToList(input)

  return 0
}
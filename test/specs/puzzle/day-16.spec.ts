import {
  toPacket,
  getVersion,
  getType,
  getLiteralValue,
  isLiteral,
  isOperator,
  getOperatorLengthTypeID,
  getOperatorSubPacketLength,
  getOperatorSubPacketCount,
  extractSubPackets,
  first,
  second,
} from '~/puzzle/day-16'
import { getInput } from '~/inputs'
import { resetCache } from '~/puzzle/utils/cache'
import { add } from '~/puzzle/utils/number'

describe('Methods', () => {
  afterEach(resetCache)

  test('toBinary', () => {
    expect(toPacket('0')).toMatchInlineSnapshot(`"0000"`)
    expect(toPacket('F')).toMatchInlineSnapshot(`"1111"`)
    expect(toPacket('9A')).toMatchInlineSnapshot(`"10011010"`)
    expect(toPacket('D2FE28')).toBe('110100101111111000101000')
  })

  test('getVersion', () => {
    expect(getVersion('100111')).toBe(4)
    expect(getVersion('101111')).toBe(5)
  })

  test('getType', () => {
    expect(getType('111100')).toBe(4)
    expect(getType('111101')).toBe(5)
  })

  test('getLiteralValue', () => {
    expect(getLiteralValue('110100101111111000101000')).toBe(2021)
  })

  test('isLiteral', () => {
    expect(isLiteral('110100101111111000101000')).toBe(true)
    expect(isLiteral('110101101111111000101000')).toBe(false)
  })

  test('isOperator', () => {
    expect(isOperator('110101101111111000101000')).toBe(true)
    expect(isOperator('110100101111111000101000')).toBe(false)
  })

  test('getOperatorLengthType', () => {
    expect(getOperatorLengthTypeID('00111000000000000110111101000101001010010001001000000000')).toBe(0)
    expect(getOperatorLengthTypeID('11101110000000001101010000001100100000100011000001100000')).toBe(1)
  })

  test('getOperatorSubPacketLength', () => {
    expect(getOperatorSubPacketLength('00111000000000000110111101000101001010010001001000000000')).toBe(27)
  })

  test('getOperatorSubPacketCount', () => {
    expect(getOperatorSubPacketCount('11101110000000001101010000001100100000100011000001100000')).toBe(3)
  })

  test('extractSubPackets', () => {
    const subPacketsLength = extractSubPackets(
      '00111000000000000110111101000101001010010001001000000000',
      22,
    )
    const subPacketsCount = extractSubPackets(
      '11101110000000001101010000001100100000100011000001100000',
      18,
    )

    expect(subPacketsLength).toEqual([
      '11010001010',
      '0101001000100100',
      '0000000',
    ])
    expect(subPacketsCount).toEqual([
      '01010000001',
      '10010000010',
      '00110000011',
      '00000',
    ])
  })
})

describe('Part 1 ', () => {
  it('should answer example', () => {
    expect(first('38006F45291200')).toBe(9)
    expect(first('EE00D40C823060')).toBe(14)
    expect(first('8A004A801A8002F478')).toBe(16)
    // expect(first('620080001611562C8802118E34')).toBe(12)
    // expect(first('C0015000016115A2E0802F182340')).toBe(23)
    // expect(first('A0016C880162017C3686B18A3D4780')).toBe(31)
  })

  it('should answer puzzle', () => {
    const data = getInput('day-16')

    // expect(first(data)).toMatchInlineSnapshot(`0`)
  })
})

describe('Part 2', () => {
  it('should answer example', () => {
    const data = ``

    expect(second(data)).toBe(0)
  })

  it('should answer puzzle', () => {
    const data = getInput('day-16')

    expect(second(data)).toMatchInlineSnapshot(`0`)
  })
})

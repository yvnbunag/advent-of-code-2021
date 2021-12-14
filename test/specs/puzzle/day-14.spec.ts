import { insert, readTemplate, getEdgeCountDifference } from '~/puzzle/day-14'
import { getInput } from '~/inputs'

describe('Part 1 ', () => {
  it('should answer example', async () => {
    const data = `
      NNCB

      CH -> B
      HH -> N
      CB -> H
      NH -> C
      HB -> C
      HC -> B
      HN -> C
      NN -> C
      BH -> H
      NC -> B
      NB -> B
      BN -> B
      BB -> N
      BC -> B
      CC -> N
      CN -> C
    `

    const resultFor1 = await insert(data, 1).then(readTemplate)
    expect(resultFor1).toBe('NCNBCHB')

    const resultFor2 = await insert(data, 2).then(readTemplate)
    expect(resultFor2).toBe('NBCCNBBBCBHCB')

    const resultFor3 = await insert(data, 3).then(readTemplate)
    expect(resultFor3).toBe('NBBBCNCCNBBNBNBBCHBHHBCHB')

    const resultFor4 = await insert(data, 4).then(readTemplate)
    expect(resultFor4).toBe('NBBNBNBBCCNBCNCCNBBNBBNBBBNBBNBBCBHCBHHNHCBBCBHCB')

    const resultFor10 = await insert(data, 10).then(getEdgeCountDifference)
    expect(resultFor10).toBe(1588)
  })

  it('should answer puzzle', async () => {
    const data = getInput('day-14')
    const result = await insert(data, 10).then(getEdgeCountDifference)

    expect(result).toMatchInlineSnapshot(`3213`)
  })
})

// Skipped because current approach constrained by disk space and TTF
describe.skip('Part 2', () => {
  it('should answer example', async () => {
    const data = `
      NNCB

      CH -> B
      HH -> N
      CB -> H
      NH -> C
      HB -> C
      HC -> B
      HN -> C
      NN -> C
      BH -> H
      NC -> B
      NB -> B
      BN -> B
      BB -> N
      BC -> B
      CC -> N
      CN -> C
    `
    const result = await insert(data, 40).then(getEdgeCountDifference)

    expect(result).toBe(2188189693529)
  })

  it('should answer puzzle', async () => {
    const data = getInput('day-14')
    const result = await insert(data, 40).then(getEdgeCountDifference)

    expect(result).toMatchInlineSnapshot(`0`)
  })
})

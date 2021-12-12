import { findSimpleDistinctPaths, findComplexDistinctPaths } from '~/puzzle/day-12'
import { getInput } from '~/inputs'

describe('Part 1 ', () => {
  it('should answer first example', () => {
    const data = `
      start-A
      start-b
      A-c
      A-b
      b-d
      A-end
      b-end
    `

    expect(findSimpleDistinctPaths(data)).toBe(10)
  })


  it('should answer second example', () => {
    const data = `
      dc-end
      HN-start
      start-kj
      dc-start
      dc-HN
      LN-dc
      HN-end
      kj-sa
      kj-HN
      kj-dc
    `

    expect(findSimpleDistinctPaths(data)).toBe(19)
  })

  it('should answer third example', () => {
    const data = `
      fs-end
      he-DX
      fs-he
      start-DX
      pj-DX
      end-zg
      zg-sl
      zg-pj
      pj-he
      RW-he
      fs-DX
      pj-RW
      zg-RW
      start-pj
      he-WI
      zg-he
      pj-fs
      start-RW
    `

    expect(findSimpleDistinctPaths(data)).toBe(226)
  })

  it('should answer puzzle', () => {
    const data = getInput('day-12')

    expect(findSimpleDistinctPaths(data)).toMatchInlineSnapshot(`3856`)
  })
})

describe('Part 2', () => {
  it('should answer first example', () => {
    const data = `
      start-A
      start-b
      A-c
      A-b
      b-d
      A-end
      b-end
    `

    expect(findComplexDistinctPaths(data)).toBe(36)
  })

  it('should answer second example', () => {
    const data = `
      dc-end
      HN-start
      start-kj
      dc-start
      dc-HN
      LN-dc
      HN-end
      kj-sa
      kj-HN
      kj-dc
    `

    expect(findComplexDistinctPaths(data)).toBe(103)
  })

  it('should answer third example', () => {
    const data = `
      fs-end
      he-DX
      fs-he
      start-DX
      pj-DX
      end-zg
      zg-sl
      zg-pj
      pj-he
      RW-he
      fs-DX
      pj-RW
      zg-RW
      start-pj
      he-WI
      zg-he
      pj-fs
      start-RW
    `

    expect(findComplexDistinctPaths(data)).toBe(3509)
  })

  // Skipping because solution is brute force, resulting in slow computation
  it.skip('should answer puzzle', () => {
    const data = getInput('day-12')

    expect(findComplexDistinctPaths(data)).toMatchInlineSnapshot(`116692`)
  })
})

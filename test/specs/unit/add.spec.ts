import { add } from '~/modules/add'

it('should add positive values', () => {
  const result = add(5, 5)

  expect(result).toMatchInlineSnapshot(`10`)
})

it('should add negative values', () => {
  const result = add(-5, -5)

  expect(result).toMatchInlineSnapshot(`-10`)
})

it('should add mixed values', () => {
  const result = add(10, -5)

  expect(result).toMatchInlineSnapshot(`5`)
})

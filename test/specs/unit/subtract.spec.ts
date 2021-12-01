import { subtract } from '~/modules/subtract'

it('should subtract positive values', () => {
  const result = subtract(10, 5)

  expect(result).toMatchInlineSnapshot(`5`)
})

it('should subtract negative values', () => {
  const result = subtract(-10, -5)

  expect(result).toMatchInlineSnapshot(`-5`)
})

it('should subtract mixed values', () => {
  const result = subtract(5, -5)

  expect(result).toMatchInlineSnapshot(`10`)
})

/**
 * Primitive keys
 *
 */
type PrimitiveKey = string | number

/**
 * Primitive types
 */
type Primitive = string
  | number
  | boolean
  | symbol
  | { [key in PrimitiveKey]: Primitive }
  | Array<Primitive>
  | undefined
  | null

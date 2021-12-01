/**
 * Indicator that a methods performed a side effect
 */
type SideEffect<Type = void> = Type

/**
 * Indicator that a methods performed an async side effect
 */
type AsyncSideEffect<Type = void> = Promise<SideEffect<Type>>

/**
 * Type that matches any function definition, useful for type argument
 *  constraints
 */
type Method = (...args: Array<any>)=> any // eslint-disable-line @typescript-eslint/no-explicit-any

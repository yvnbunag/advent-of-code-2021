/**
 * Generic type to allow types to be set to null
 *
 * @typeParam Type - type to be allowed as null
 */
type Nullable<Type> = Type | null

/**
 * Generic type to modify a method's return type to be a promise
 *
 * @typeParam MethodType - method to be set to an async method
 */
type Async<
  MethodType extends Method,
> = (...args: Parameters<MethodType>)=> Promise<ReturnType<Method>>

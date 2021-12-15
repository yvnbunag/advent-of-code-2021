export const {
  resetCacheListen,
  resetCache,
} = (() => {
  type Listener = ()=> unknown

  const listeners: Array<Listener> = []

  function resetCacheListen(listener: Listener) {
    listeners.push(listener)
  }

  function resetCache() {
    listeners.forEach((listener) => listener())
  }

  return {
    resetCacheListen,
    resetCache,
  }
})()

const memoKey: unique symbol = Symbol('keyed')
export type Keyed = { [key in typeof memoKey]: true }

export const {
  toMemo,
  getMemoKey,
} = (() => {
  type AnyReference = Record<string | number | symbol, unknown>

  let cache = new WeakMap()
  let counter = 0

  resetCacheListen(() => cache = new WeakMap())
  resetCacheListen(() => counter = 0)

  function toMemo<
    Reference extends AnyReference,
  >(reference: Reference): Reference & Keyed {
    const key = `memo-${counter++}`

    cache.set(reference, key)

    return reference as Reference & Keyed
  }

  function getMemoKey(reference: Keyed): string {
    if (cache.has(reference)) return cache.get(reference)

    throw new Error(`${JSON.stringify(reference)} has no memoization key`)
  }

  return {
    toMemo,
    getMemoKey,
  }
})()

type MemoizeOptions<Method extends (...args: Array<unknown>)=> unknown> = {
  disabled?: boolean,
  getKey: (...args: Parameters<Method>)=> string,
}

export function memoize<
  Method extends (...args: Array<unknown>)=> never,
>(
  method: Method,
  { getKey, disabled = false }: MemoizeOptions<Method>,
): (...args: Parameters<Method>)=> ReturnType<Method> {
  if (disabled) return method

  let cache: Record<string, ReturnType<Method>> = {}

  resetCacheListen(() => cache = {})

  return (...args)=> {
    const key = getKey(...args)

    if (!(key in cache)) cache[key] = method(...args)

    return cache[key]
  }
}

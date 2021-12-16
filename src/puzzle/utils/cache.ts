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

declare const memoKeyed: unique symbol
export type MemoKeyed = { [key in typeof memoKeyed]: true }

export const {
  toMemoKeyed,
  getMemoKey,
} = (() => {
  type AnyReference = Record<string | number | symbol, unknown>

  let cache = new WeakMap()
  let counter = 0

  resetCacheListen(() => cache = new WeakMap())
  resetCacheListen(() => counter = 0)

  function toMemoKeyed<
    Reference extends AnyReference,
  >(reference: Reference): Reference & MemoKeyed {
    const key = `memo-${counter++}`

    cache.set(reference, key)

    return reference as Reference & MemoKeyed
  }

  function getMemoKey(reference: MemoKeyed): string {
    if (cache.has(reference)) return cache.get(reference)

    throw new Error(`${JSON.stringify(reference)} has no memoization key`)
  }

  return {
    toMemoKeyed,
    getMemoKey,
  }
})()

type MemoizeOptions<Method extends (...args: Array<unknown>)=> unknown> = {
  disabled?: boolean,
  getKey?: (...args: Parameters<Method>)=> Array<string>,
}

export function memoize<
  Method extends (...args: Array<any>)=> any,
>(
  method: Method,
  options: MemoizeOptions<Method> = {},
): (...args: Parameters<Method>)=> ReturnType<Method> {
  const { disabled = false, getKey = (...args) => args } = options
  if (disabled) return method

  let cache: Record<string, ReturnType<Method>> = {}

  resetCacheListen(() => cache = {})

  return (...args)=> {
    const key = getKey(...args).join('-')

    if (!(key in cache)) cache[key] = method(...args)

    return cache[key]
  }
}

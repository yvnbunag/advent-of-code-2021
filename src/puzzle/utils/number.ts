export function add(first: number, second: number): number {
  return first + second
}

export function subtract(first: number, second: number): number {
  return first - second
}

export function multiply(first: number, second: number): number {
  return first * second
}

export function createCounter(): ()=> number {
  let count = 0

  return () => {
    count = count + 1

    return count
  }
}

export function createMultipleOfCounter(multipleOf: number): ()=> boolean {
  const counter = createCounter()

  return () => {
    return (counter() % multipleOf) === 0
  }
}

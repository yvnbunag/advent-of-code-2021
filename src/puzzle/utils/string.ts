export function splitBy(delimiter: string) {
  return (value: string) => value.split(delimiter)
}

export function trim(value: string): string {
  return value.trim()
}

import { createWriteStream, createReadStream } from 'fs'
import { readFile } from 'fs/promises'
import readline from 'readline'

import type { WriteStream } from 'fs'

export type FileName = string

export const createNameGenerator = (() => {
  let globalInstance = 0

  return (namespace = 'file', instance = globalInstance++) => {
    return (tag: string | number) => {
      return `temp/${namespace}-${instance}-${tag}`
    }
  }
})()

export function createAppendWriter(fileName: FileName): WriteStream {
  return createWriteStream(fileName, { flags: 'a' })
}

export async function endWriter(writer: WriteStream): Promise<unknown> {
  writer.end()

  return new Promise((resolve, reject) => {
    writer.on('finish', resolve)
    writer.on('error', reject)
  })
}

export function createLineReader(fileName: FileName): readline.Interface {
  const readStream = createReadStream(fileName)

  // Note: we use the crlfDelay option to recognize all instances of CR LF
  // ('\r\n') in input.txt as a single line break.
  return readline.createInterface({
    input: readStream,
    crlfDelay: Infinity,
  })
}

export function read(fileName: FileName): Promise<string> {
  return readFile(fileName, { encoding: 'utf-8' })
}

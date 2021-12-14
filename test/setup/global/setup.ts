/* eslint-disable import/order */
import { existsSync, mkdirSync } from 'fs'
import rimraf from 'rimraf'

export default function setup() {
  rimraf.sync('temp/*')

  if (!existsSync('temp')) mkdirSync('temp')
}

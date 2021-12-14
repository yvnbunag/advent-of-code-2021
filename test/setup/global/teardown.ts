/* eslint-disable import/order */
import rimraf from 'rimraf'

export default function teardown() {
  rimraf.sync('temp/*')
}

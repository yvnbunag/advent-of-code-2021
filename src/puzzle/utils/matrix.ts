export function deepCopy<
  Matrix extends Array<Array<unknown>>,
>(matrix: Matrix): Matrix {
  return matrix.map((row) => row.map((column) => column)) as Matrix
}

Array.prototype.push2 = function (...pushEles) {
  const pushEleLength = pushEles.length
  const length = this.length

  let i = 0

  while (i < pushEleLength) {
    this[ length + i ] = pushEles[ i ]
    i++
  }

  return this.length
}

let arr = [ 1, 2 ]

console.log(arr.push2(3, 4), arr)
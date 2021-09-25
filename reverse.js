Array.prototype.reverse2 = function () {
  let i = 0
  let j = this.length - 1

  while (i < j) {
    [ this[ i ], this[ j ] ] = [ this[ j ], this[ i ] ]
    i++
    j--
  }

  return this
}

let arr = [ 1, 2, 3, 4 ]

// console.log(arr.reverse())
console.log(arr.reverse2(), arr)
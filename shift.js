Array.prototype.shift2 = function () {
  const length = this.length
  const delValue = this[ 0 ]

  let i = 1

  while (i < length) {
    this[ i - 1 ] = this[ i ]
    i++
  }

  this.length = length - 1

  return delValue
}

let arr = [ 1, 2, 3, 4, 5, 6 ]

console.log(arr.shift2())
console.log(arr)
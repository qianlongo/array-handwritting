Array.prototype.unshift2 = function (...unshiftEles) {
  let newArray = [ ...unshiftEles, ...this ]
  let length = newArray.length
  
  let i = 0

  if (unshiftEles.length === 0) {
    return length
  }

  while (i < length) {
    this[ i ] = newArray[ i ]
    i++
  }
  
  return this.length
}

let arr = [ 4, 5, 6 ]

console.log(arr.unshift2(1, 2, 3))
console.log(arr)
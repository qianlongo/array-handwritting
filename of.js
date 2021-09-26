Array.of2 = function (...eles) {
  const length = eles.length
  let i = 0
  let newArray = []

  while (i < length) {
    newArray[ i ] = eles[ i ]
    i++
  }

  return newArray
}

console.log(Array.of2(1))         // [1]
console.log(Array.of2(1, 2, 3))   // [1, 2, 3]
console.log(Array.of2(undefined)) // [undefined]
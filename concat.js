Array.prototype.concat2 = function (...concatEles) {
  const length = concatEles.length
  let newArray = [ ...this ]
  let i = 0

  while (i < length) {
    const value = concatEles[ i ]
    Array.isArray(value) ? newArray.push(...value) : newArray.push(value)
    i++
  }

  return newArray
}
const arr1 = [ 1, 2 ]
const arr2 = [ 3, 4 ]
const ele = 5

// let concatResult = 

console.log(arr1.concat2(arr2.concat2(ele)))
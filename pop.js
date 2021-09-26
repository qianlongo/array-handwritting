Array.prototype.pop2 = function () {
  const length = this.length
  // 空数组上pop，直接返回undefined
  if (length === 0) {
    return undefined
  }

  const delEle = this[ length - 1 ]

  this.length = length - 1

  return delEle
}

let arr = [ 1, 2 ]
let arr2 = []

console.log(arr.pop2(), arr)
console.log(arr2.pop2(), arr2)
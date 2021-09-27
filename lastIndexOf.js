Array.prototype.lastIndexOf2 = function (targetEle, fromIndex) {
  const length = this.length

  fromIndex = typeof fromIndex === 'undefined' ? length - 1 : fromIndex
  // 数组为空，以及该值为负时，其绝对值大于数组长度，则方法返回 -1，即数组不会被查找。
  if (length === 0 || fromIndex < 0 && Math.abs(fromIndex) >= length) {
    return -1
  }

  let i

  if (fromIndex >= 0) {
    i = Math.min(fromIndex, length - 1)
  } else {
    i = length - Math.abs(fromIndex)
  }

  while (i >= 0) {
    if (i in this && targetEle === this[ i ]) {
      return i
    }

    i--
  }

  return -1
}

let array = [2, 5, 9, 2]

console.log(array.lastIndexOf2(2)) // 3
console.log(array.lastIndexOf2(7)) // -1
console.log(array.lastIndexOf2(2, 3)) // 3
console.log(array.lastIndexOf2(2, 2)) // 0
console.log(array.lastIndexOf2(2, -2)) // 0
console.log(array.lastIndexOf2(2, -1)) // 3
Array.prototype.fill2 = function (value, start, end) {
  const length = this.length
  // 这里是个亮点
  start = start >> 0
  end = typeof end === 'undefined' ? length : end >> 0

  start = start >= 0 ? Math.min(start, length) : Math.max(start + length, 0)
  end = end >= 0 ? Math.min(end, length) : Math.max(end + length, 0)

  while (start < end) {
    this[ start ] = value
    start++
  }

  return this
}

console.log([1, 2, 3].fill2(4))
console.log([1, 2, 3].fill2(4, 1))
console.log([1, 2, 3].fill2(4, 1, 2))
console.log([1, 2, 3].fill2(4, 1, 1))
console.log([1, 2, 3].fill2(4, 3, 3))
console.log([1, 2, 3].fill2(4, -3, -2))
console.log([1, 2, 3].fill2(4, NaN, NaN))
console.log([1, 2, 3].fill2(4, 3, 5))
console.log(Array(3).fill(4))
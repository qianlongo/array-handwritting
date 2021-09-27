Array.prototype.some2 = function (callback, thisCtx) {
  if (typeof callback !== 'function') {
    throw `${callback} is not a function`
  }

  const length = this.length
  let i = 0

  while (i < length) {
    if (i in this && callback.call(thisCtx, this[ i ], i, this)) {
      return true
    }

    i++
  }

  return false
}

let emptyArr = []
// 空数组直接返回true
console.log(emptyArr.some2((it) => it > 0))
let arr = [ 0, 1, 2, 3, 4,, 5, -1 ]

delete arr[7]

console.log(arr.some2((it) => it < 0))
console.log(arr.some2((it) => it > 0)) // true
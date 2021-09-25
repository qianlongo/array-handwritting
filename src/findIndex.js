Array.prototype.findIndex2 = function (callback, thisCtx) {
  if (typeof callback !== 'function') {
    throw `${callback} is not a function`
  }

  const length = this.length
  let i = 0

  while (i < length) {
    if (i in this && callback.call(thisCtx, this[ i ], i, this)) {
      return i
    }

    i++
  }

  return -1
}

let arr = [ 0, 1, 2, 3, 4,, 5 ]

let index = arr.findIndex2(function (it, i, array) {
  console.log(it, i, array, this)
  return it > 3
}, { name: '前端胖头鱼' })

console.log(index)
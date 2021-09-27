Array.prototype.find2 = function (callback, thisCtx) {
  if (typeof callback !== 'function') {
    throw `${callback} is not a function`
  }

  const length = this.length
  let i = 0

  while (i < length) {
    const value = this[ i ]

    if (callback.call(thisCtx, value, i, this)) {
      return value
    }

    i++
  }

  return undefined
}

let arr = [ 0, 1, 2, 3, 4,, 5 ]

let index = arr.find2(function (it, i, array) {
  console.log(it, i, array, this)
  return it > 3
}, { name: '前端胖头鱼' })

console.log(index)
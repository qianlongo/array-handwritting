Array.prototype.map2 = function (callback, thisCtx) {
  if (typeof callback !== 'function') {
    throw `${callback} is not a function`
  }

  const length = this.length
  let i = 0
  let newArray = []

  while (i < length) {
    if (i in this) {
      const newValue = callback.call(thisCtx, this[ i ], i, this)
      newArray.push(newValue)
    }

    i++
  }

  return newArray
}

let arr = [ 0, 1, 2, 3, 4,, 5 ]

let arr2 = arr.map2(function (it, i, array) {
  // console.log(it, i, array, this)
  return it * it
})

console.log(arr2)
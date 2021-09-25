Array.prototype.filter2 = function (callback, thisCtx) {
  if (typeof callback !== 'function') {
    throw `${callback} is not a function`
  }

  const length = this.length
  let newArray = []
  let i = 0

  while (i < length) {
    if (callback.call(thisCtx, this[ i ], i, this)) {
      newArray.push(this[ i ])
    }
    i++
  }

  return newArray
}

let arr = [ 0, 1, 2, 3, 4,, 5 ]

let arr2 = arr.filter2(function (it, i, array) {
  console.log(it, i, array, this)
  return it >= 3
}, { name: '前端胖头鱼' })

console.log(arr2)
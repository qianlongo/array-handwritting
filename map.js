Array.prototype.map2 = function (callback, thisCtx) {
  if (typeof callback !== 'function') {
    throw `${callback} is not a function`
  }

  const length = this.length
  let i = 0
  let newArray = []

  while (i < length) {
    if (i in this) {
      newArray.push(callback.call(thisCtx, this[ i ], i, this))
    }

    i++
  }

  return newArray
}

let arr = [ 0, 1, 2, 3, 4,, 5 ]

let newArr = arr.map((it) => it * it )

console.log(newArr)

let arr2 = arr.map2(function (it, i, array) {
  console.log(it, i, array, this)
  return it * it
}, { name: '前端胖头鱼' })

console.log(arr2)
Array.prototype.forEach2 = function (callback, thisCtx) {
  if (typeof callback !== 'function') {
    throw `${callback} is not a function`
  }

  const length = this.length
  let i = 0

  while (i < length) {
    if (i in this) {
      callback.call(thisCtx, this[ i ], i, this)
    }

    i++
  }
}

// 测试
let arr = [ 0, 1, 2, 3, 4,, 5 ]

arr.forEach2(function (it, i, array) {
  if (i === 2) {
    arr.splice(3, 1)
  }
  console.log(it, i, array, this)
}, { name: '前端胖头鱼2' })
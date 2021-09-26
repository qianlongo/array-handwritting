Array.prototype.flatMap2 = function (callback, thisCtx) {
  if (typeof callback !== 'function') {
    throw `${callback} is not a function`
  }
  // map和flat具体实现可以看map.js和flat.js
  return this.map(function (it, i, array) {
    return callback.call(thisCtx, it, i, array)
  }).flat(1)
}

let arr = [ 1, 2, [ 3 ], 4, [ 5, [ 6 ] ] ]

console.log(arr.flatMap2((it, i, array) => {
  console.log(it, i, array, this)
  return it
}, { name: '前端胖头鱼' }))
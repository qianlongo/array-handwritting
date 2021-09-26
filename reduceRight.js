Array.prototype.reduceRight2 = function (callback, initValue) {
  if (typeof callback !== 'function') {
    throw `${callback} is not a function`
  }

  let pre = initValue
  const length = this.length
  let i = length - 1

  if (typeof pre === 'undefined') {
    pre = this[i]
    i--
  }

  while (i >= 0) {
    if (i in this) {
      pre = callback(pre, this[ i ], i, this)
    }
    i--
  }

  return pre
}

let arr = [ 1, 2, 3 ] 

console.log(arr.reduceRight2((result, it, i )=> {
  console.log(it, i)
  result += it
  return result
}, 0))
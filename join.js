Array.prototype.join2 = function (format = ',') {
  const length = this.length
  let lastEle = this[ length - 1 ]
  let string = ''

  if (length === 0) {
    return ''
  }

  for (i = 0; i < length - 1; i++) {
    string += this[ i ] + format
  }

  return string + lastEle
}
// let arr = [ 1, 2, 3, 4, 5, 6 ]
let arr = [  ]

console.log(arr.join2('-'))
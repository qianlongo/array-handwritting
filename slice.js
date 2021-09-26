Array.prototype.slice2 = function (start, end) {
  const length = this.length
  let newArray = []

  start = start >> 0
  end = typeof end === 'undefined' ? length : end >> 0

  start = start >= 0 ? Math.min(start, length) : Math.max(start + length, 0)
  end = end >= 0 ? Math.min(end, length) : Math.max(end + length, 0)

  while (start < end) {
    newArray.push(this[ start ])
    start++
  }

  return newArray
}


const animals = ['ant', 'bison', 'camel', 'duck', 'elephant'];

console.log(animals.slice2(2));
// expected output: Array ["camel", "duck", "elephant"]

console.log(animals.slice2(2, 4));
// expected output: Array ["camel", "duck"]

console.log(animals.slice2(1, 5));
// expected output: Array ["bison", "camel", "duck", "elephant"]

console.log(animals.slice2(-2));
// expected output: Array ["duck", "elephant"]

console.log(animals.slice2(2, -1));
// // expected output: Array ["camel", "duck"]

console.log(animals.slice2(100));
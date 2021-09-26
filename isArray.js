Array.isArray2 = function (ele) {
  return  Object.prototype.toString.call(ele) === '[object Array]';
}

console.log(Array.isArray2([]))
console.log(Array.isArray2(1))
console.log(Array.isArray2(null))
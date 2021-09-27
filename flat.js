Array.prototype.flat2 = function (depth = 1) {
  const result = []
  const flat = (arr, depth) => {
    for (let item of arr) {
      if (Array.isArray(item) && depth > 0) {
        flat(item, depth - 1)
      } else {
        // 去除空元素，添加非undefined元素
        item !== void 0 && result.push(item);
      }
    }
  }

  flat(this, depth)

  return result
}

const arr1 = [0, 1, 2, [3, 4]];

console.log(arr1.flat2()) // [0, 1, 2, 3, 4]


const arr2 = [0, 1, 2, [[[3, 4]]]]

console.log(arr2.flat2(2)) // [0, 1, 2, [3, 4]] 
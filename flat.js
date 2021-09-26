Array.prototype.flat2 = function (depth = 1) {
  const forFlat = (arr = [], depth = 1) => {
    const result = [];
    (function flat(arr, depth) {
      for (let item of arr) {
        if (Array.isArray(item) && depth > 0) {
          flat(item, depth - 1)
        } else {
          // 去除空元素，添加非undefined元素
          item !== void 0 && result.push(item);
        }
      }
    })(arr, depth)
    return result;
  }

  return forFlat(this, depth)
}

console.log([ 1, [ 2, [ 3 ] ] ].flat2(Infinity))
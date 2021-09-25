Array.prototype.includes2 = function (targetEle, fromIndex) {
  const length = this.length

  fromIndex = +fromIndex || 0

  // 数组为空或者从大于等于数组长度的地方开始检索，都直接是-1
  if (length === 0 || fromIndex >= length) {
    return -1
  }
  /*
    1. 从fromIndex开始搜索元素
    2. fromIndex大于0时候直接取即可
    3. 小于0先用长度减去fromIndex的绝对值，如果还是小于0，就直接取0即可
  */
  let i = Math.max(fromIndex >= 0 ? fromIndex : length - Math.abs(fromIndex), 0)

  while (i < length) {
    const value = this[ i ]

    if (targetEle === value || typeof targetEle === 'number' && typeof value === 'number' && isNaN(targetEle) && isNaN(value)) {
      return true
    }

    i++
  }

  return false
}

let arr = [ 0, 1, 2, 3, 4,, 5 ]

let result = arr.includes2(10)

console.log(result)
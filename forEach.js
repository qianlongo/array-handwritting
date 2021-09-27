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


// 举个小例子
let demoArr = [ 1, 2, 3, 4, , 5 ]

// demoArr.forEach((it, i) => {
//   if (i === 1) {
//     // 后添加进去的不会被访问到
//     demoArr.push(5)
//   } else if (i === 2) {
//     // 4将不会被访问到，相仿4-4会被访问到
//     demoArr.splice(3, 1, '4-4')
//   }

//   console.log(it)
// })

demoArr.forEach2((it, i) => {
  if (i === 1) {
    // 后添加进去的不会被访问到
    demoArr.push(5)
  } else if (i === 2) {
    // 4将不会被访问到，相仿4-4会被访问到
    demoArr.splice(3, 1, '4-4')
  }

  console.log(it)
})

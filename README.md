
# 前言



**数组是我们日常工作中用的最频繁的一类数据结构，能帮助我们解决许多问题，而其本身也包含接近33个之多的方法，做了一个脑图分类如下，熟练使用数组的你，是否想知道他们内部的实现原理呢？**

这篇文章会和你一起探究24+原生数组方法的内部实现，相信你看完一定会有属于自己不一样的收获。

![数组方法.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/dd1a1e965fa94bdd8e84d81152bb852d~tplv-k3u1fbpfcp-watermark.image?)

# 遍历类


## 1. forEach

### 基本使用

> `forEach`一个日常用的非常多的遍历函数，你一定熟悉到不能再熟悉啦！这里我们着重看一些比较重要且容易忽略的点。[mdn](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)

1. 该方法对数组的每个元素执行一次给定的函数，返回值是`undefiend`。

2. 该方法按升序为数组中**含有效值**的每一项执行一次 `callback` 函数，未初始化的项将被跳过（例如在稀疏数组上）。

3. 如果已经存在的值被改变，则传递给 `callback` 的值是 `forEach()` 遍历到他们那一刻的值。

4. 已删除的项不会被遍历到

**举个小例子**

``` javascript


let demoArr = [ 1, 2, 3, 4, , 5 ]

demoArr.forEach((it, i) => {
  if (i === 1) {
    // 后添加进去的不会被访问到
    demoArr.push(5)
  } else if (i === 2) {
    // 4将不会被访问到，而4-4会被访问到
    demoArr.splice(3, 1, '4-4')
  }

  console.log(it)
})

/*
 1
 2
 3
 4-4
 5
*/

```


### 代码实现

[点击查看源码实现](https://github.com/qianlongo/array-handwritting/blob/main/forEach.js)

``` javascript
Array.prototype.forEach2 = function (callback, thisCtx) {
  if (typeof callback !== 'function') {
    throw `${callback} is not a function`
  }

  const length = this.length
  let i = 0

  while (i < length) {
    // 被删除的，新增的元素索引i不在数组内，所以不会被访问到
    if (i in this) {
      callback.call(thisCtx, this[ i ], i, this)
    }

    i++
  }
}

```
同样用刚才的例子，改下后的输出是一样的

### 测试一把

``` javascript

// 测试
let demoArr = [ 1, 2, 3, 4, , 5 ]

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

/*
 1
 2
 3
 4-4
 5
*/

```



## 2. map

### 基本使用
> ` map` 方法创建一个新数组，其结果是该数组中的每个元素是调用一次提供的函数后的返回值。[mdn](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/map)

**注意点**

1. `callback` 函数只会在有值的索引上被调用
2. 从来没被赋过值或者使用 `delete` 删除的索引则不会被调用。



``` javascript
// 注意索引为2的位置没有赋值
let arr = [ 1, 2, ,4, 5 ]

// 删除索引3
delete arr[3]

console.log(arr.map((it) => it * it))
// [ 1, 4, 25 ]

```

### 代码实现

[点击查看源码实现](https://github.com/qianlongo/array-handwritting/blob/main/map.js)

``` javascript
Array.prototype.map2 = function (callback, thisCtx) {
  if (typeof callback !== 'function') {
    throw `${callback} is not a function`
  }

  const length = this.length
  let i = 0
  // map返回值是一个新的数组
  let newArray = []

  while (i < length) {
    // 被删除的，未初始化的都不会被遍历到
    if (i in this) {
      newArray.push(callback.call(thisCtx, this[ i ], i, this))
    }

    i++
  }
  // 返回新的数组
  return newArray
}


```


### 测试一把

``` javascript
let arr = [ 0, 1, 2, 3, 4,, 5 ]

let arr2 = arr.map2(function (it, i, array) {
  console.log(it, i, array, this)
  return it * it
}, { name: '前端胖头鱼' })

console.log(arr2)

```

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/51d115ce17cc4c85bd2872c6c337b9ea~tplv-k3u1fbpfcp-watermark.image?)

## 3. every

### 基本使用

> ` every` 方法测试一个数组内的所有元素是否都能通过某个指定函数的测试。它返回一个布尔值。[mdn](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/every)

**注意点**

1. 若收到一个空数组，此方法在一切情况下都会返回 `true`。

2. `callback` 只会为那些已经被赋值的索引调用

3. 不会为那些被删除或从未被赋值的索引调用

``` javascript
// 举例
let emptyArr = []
// 空数组直接返回true
console.log(emptyArr.every((it) => it > 0)) // true
// 有未被赋值的
let arr = [ 0, 1, 2, 3, 4,, 5, -1 ]
// 删除元素
delete arr[7]

console.log(arr.every((it) => it >= 0)) // true

```

### 代码实现

[点击查看源码实现](https://github.com/qianlongo/array-handwritting/blob/main/every.js)

``` javascript

Array.prototype.every2 = function (callback, thisCtx) {
  if (typeof callback !== 'function') {
    throw `${callback} is not a function`
  }

  const length = this.length
  let i = 0
  // 空函数不会走进循环
  while (i < length) {
    // 只要有一个值不符合callback预期就返回false
    if (i in this && !callback.call(thisCtx, this[ i ], i, this)) {
      return false
    }

    i++
  }

  return true
}


```

### 测试一把

**还是拿例子做测试**

``` javascript

let emptyArr = []

console.log(emptyArr.every2((it) => it > 0)) // true

let arr = [ 0, 1, 2, 3, 4,, 5, -1 ]

delete arr[7]

console.log(arr.every2((it) => it >= 0)) // true

```


## 4. some

### 基本使用

> `some` 方法测试数组中是不是至少有1个元素通过了被提供的函数测试。它返回的是一个Boolean类型的值。 [mdn](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/some)

**注意点**

1. `callback` 只会在那些”有值“的索引上被调用，不会在那些被删除或从来未被赋值的索引上调用。

**举个例子**



``` javascript

let emptyArr = []
// 空数组直接返回false
console.log(emptyArr.some((it) => it > 0)) // false
let arr = [ 0, 1, 2, 3, 4,, 5, -1 ]
// 还没有遍历前把-1删除了，唯一小于0的值不存在了，即返回false
delete arr[7]

console.log(arr.some((it) => it < 0)) // false

```

### 代码实现

[点击查看源码实现](https://github.com/qianlongo/array-handwritting/blob/main/some.js)

``` javascript
Array.prototype.some2 = function (callback, thisCtx) {
  if (typeof callback !== 'function') {
    throw `${callback} is not a function`
  }

  const length = this.length
  let i = 0

  while (i < length) {
    // 只要有一个元素符合callback条件，就返回true
    if (i in this && callback.call(thisCtx, this[ i ], i, this)) {
      return true
    }

    i++
  }

  return false
}
```

### 测试一把

``` javascript

let emptyArr = []
// 空数组直接返回true
console.log(emptyArr.some2((it) => it > 0)) // false
let arr = [ 0, 1, 2, 3, 4,, 5, -1 ]

delete arr[7]

console.log(arr.some2((it) => it < 0)) // false
console.log(arr.some2((it) => it > 0)) // true

```

## 5. filter

### 基本使用
> `filter` 方法创建一个新数组, 其包含通过所提供函数测试的所有元素。 [mdn](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)

**注意点**

1. `filter` 为数组中的每个元素调用一次 `callback` 函数，并利用所有使得 `callback` 返回 true 或[等价于 true 的值](https://developer.mozilla.org/zh-CN/docs/Glossary/Truthy)的元素创建一个新数组。

2. `callback` 只会在已经赋值的索引上被调用，对于那些已经被删除或者从未被赋值的索引不会被调用。

3. 那些没有通过 `callback` 测试的元素会被跳过，不会被包含在新数组中。

``` javascript
// 索引为5的位置，没有初始化值，不会被遍历
let arr = [ 0, 1, 2, -3, 4,, 5 ]
// 删除掉最后一个元素
delete arr[6]
// 过滤出大于0的值
let filterArr = arr.filter((it) => it > 0)

console.log(filterArr) // [ 1, 2, 4 ]


```


### 代码实现

[点击查看源码实现](https://github.com/qianlongo/array-handwritting/blob/main/filter.js)


``` javascript
Array.prototype.filter2 = function (callback, thisCtx) {
  if (typeof callback !== 'function') {
    throw `${callback} is not a function`
  }

  const length = this.length
  let newArray = []
  let i = 0

  while (i < length) {
    if (i in this && callback.call(thisCtx, this[ i ], i, this)) {
      newArray.push(this[ i ])
    }
    i++
  }

  return newArray
}

```

### 测试

``` javascript

// 索引为5的位置，没有初始化值，不会被遍历
let arr = [ 0, 1, 2, -3, 4,, 5 ]
// 删除掉最后一个元素
delete arr[6]
// 过滤出大于0的值
let filterArr = arr.filter2((it) => it > 0)

console.log(filterArr) // [ 1, 2, 4 ]
```

## 6. reduce

### 基本使用

> `reduce` 方法对数组中的每个元素执行一个由您提供的**reducer**函数(升序执行)，将其结果汇总为单个返回值 [mdn](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce)


这个函数稍微复杂一些，我们用一个例子来看一下他是怎么用的。


``` javascript

const sum = [1, 2, 3, 4].reduce((prev, cur) => {
  return prev + cur;
})

console.log(sum) // 10

// 初始设置
prev = initialValue = 1, cur = 2

// 第一次迭代
prev = (1 + 2) =  3, cur = 3

// 第二次迭代
prev = (3 + 3) =  6, cur = 4

// 第三次迭代
prev = (6 + 4) =  10, cur = undefined (退出)

```


### 代码实现

[点击查看源码实现](https://github.com/qianlongo/array-handwritting/blob/main/reduce.js)

``` javascript
Array.prototype.reduce2 = function (callback, initValue) {
  if (typeof callback !== 'function') {
    throw `${callback} is not a function`
  }

  let pre = initValue
  let i = 0
  const length = this.length
  // 当没有传递初始值时，取第一个作为初始值  
  if (typeof pre === 'undefined') {
    pre = this[0]
    i = 1
  }

  while (i < length) {
    if (i in this) {
      pre = callback(pre, this[ i ], i, this)
    }
    i++
  }

  return pre
}

```

### 测试一把

``` javascript
const sum = [1, 2, 3, 4].reduce2((prev, cur) => {
  return prev + cur;
})

console.log(sum) // 10

```

## 7. reduceRight


### 基本使用

> `reduceRight` 方法对数组中的每个元素执行一个由您提供的**reducer**函数(降序执行)，将其结果汇总为单个返回值 [mdn](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/reduceRIght)

和reduce很类似，唯一不同的是`reduceRight`从右往左遍历


``` javascript
const sum = [1, 2, 3, 4].reduce((prev, cur) => {
  console.log(cur)
  return prev + cur;
})

// 2 1
// 3 2
// 4 3

console.log(sum) // 10

const sum2 = [1, 2, 3, 4].reduceRight((prev, cur) => {
  console.log(cur)
  return prev + cur;
})
// 3 2 
// 2 1
// 1 0

console.log(sum2) // 10

```

### 代码实现

[点击查看源码实现](https://github.com/qianlongo/array-handwritting/blob/main/reduceRight.js)

``` javascript
Array.prototype.reduceRight2 = function (callback, initValue) {
  if (typeof callback !== 'function') {
    throw `${callback} is not a function`
  }

  let pre = initValue
  const length = this.length
  // 从最后一个元素开始遍历
  let i = length - 1
  // 如果没有传递初始值，则取最后一个作为初始值
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

```

### 测试一把

``` javascript
const sum = [1, 2, 3, 4].reduceRight2((prev, cur) => {
  console.log(cur)
  return prev + cur;
})

// 3 2
// 2 1
// 1 0

console.log(sum) // 10

```

# 查找类

## 8. find

### 基本使用

> ` find` 方法返回数组中满足测试函数的第一个元素的值。否则返回 `undefined`, [mdn](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/find)

注意点

1. `find`方法对数组中的每一项元素执行一次 `callback` 函数，直至有一个 callback 返回 `true`

2. 当找到了这样一个元素后，该方法会立即返回这个元素的值，否则返回 `undefined`

3. `callback `函数会为数组中的每个索引调用即从 `0 `到 `length - 1`，而不仅仅是那些被赋值的索引。`（这个点是和前面几个函数不一样的地方）`

```
let arr = [ 0, 1, 2, 3, 4,, 5 ]

let index = arr.find((it) =>  {
  return it > 3
}, { name: '前端胖头鱼' })

console.log(index) // 4

```

### 代码实现


[点击查看源码实现](https://github.com/qianlongo/array-handwritting/blob/main/find.js)

``` javascript

Array.prototype.find2 = function (callback, thisCtx) {
  if (typeof callback !== 'function') {
    throw `${callback} is not a function`
  }

  const length = this.length
  let i = 0

  while (i < length) {
    const value = this[ i ]
    // 只要有一个元素符合callback回调函数的逻辑，就返回元素value
    if (callback.call(thisCtx, value, i, this)) {
      return value
    }

    i++
  }
  // 否则返回undefined  
  return undefined
}

```

### 测试一把


``` javascript

let arr = [ 0, 1, 2, 3, 4,, 5 ]

let index = arr.find2(function (it, i, array) {
  console.log(it, i, array, this)
  return it > 3
}, { name: '前端胖头鱼' })

console.log(index) // 4

```


![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/10baa8e79f8c49bc9f5875984f485698~tplv-k3u1fbpfcp-watermark.image?)

## 9. findIndex

### 基本使用

> ` findIndex`方法返回数组中满足提供的测试函数的第一个元素的**索引**。若没有找到对应元素则返回-1。 [mdn](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex)

和find函数不同的地方在于，findIndex是返回**索引而非值**, 注意点也和find基本一样

1. `findIndex`方法对数组中的每个数组索引`0 ~ length-1`（包括）执行一次`callback`函数，直到找到一个`callback`函数返回true的值。

2. 如果找到这样的元素，`findIndex`会立即返回该元素的索引。如果回调从不返回真值，或者数组的`length`为0，则`findIndex`返回-1

3. 与某些其他数组方法（如Array#some）不同，在稀疏数组中，即使对于数组中不存在的条目的索引也会调用回调函数

``` javascript
let arr = [ 0, 1, 2, 3, 4,, 5 ]

let index = arr.findIndex((it, i, array) => {
  return it > 2
})

console.log(index) // 3

```


### 代码实现

[点击查看源码实现](https://github.com/qianlongo/array-handwritting/blob/main/findIndex.js)

``` javascript
Array.prototype.findIndex2 = function (callback, thisCtx) {
  if (typeof callback !== 'function') {
    throw `${callback} is not a function`
  }

  const length = this.length
  let i = 0

  while (i < length) {
    // 符合callback逻辑的直接返回索引i
    if (callback.call(thisCtx, this[ i ], i, this)) {
      return i
    }

    i++
  }
  // 否则返回-1  
  return -1
}


```

### 测试一把

``` javascript
let arr = [ 0, 1, 2, 3, 4,, 5 ]

let index = arr.findIndex2(function (it, i, array) {
  console.log(it, i, array, this)
  return it > 2
}, { name: '前端胖头鱼' })

console.log(index) // 3

```

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/79810edecc8e43b88da5448f6303fbe3~tplv-k3u1fbpfcp-watermark.image?)

## 10. indexOf

### 基本使用
> ` indexOf`方法返回在数组中可以找到一个给定元素的第一个索引，如果不存在，则返回-1。 [mdn](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf)

```
arr.indexOf(searchElement[, fromIndex])
```

**注意点**


1. 如果开始查找的索引值大于或等于数组长度，意味着不会在数组里查找，返回-1

2. 如果参数中提供的索引值是一个**负值**，则将其作为数组末尾的一个抵消，即-1表示从最后一个元素开始查找，-2表示从倒数第二个元素开始查找 ，以此类推

3. 如果参数中提供的索引值是一个负值，并不改变其查找顺序，查找顺序仍然是从前向后查询数组

4. 如果抵消后的索引值仍小于0，则整个数组都将会被查询。其默认值为0.



```javascript
const array = [2, 5, 9]

console.log(array.indexOf(2))      // 0
console.log(array.indexOf(7))      // -1
console.log(array.indexOf(9, 2))   // 2
console.log(array.indexOf(2, -1))  // -1
console.log(array.indexOf(2, -3))  // 0
```


### 代码实现

[点击查看源码实现](https://github.com/qianlongo/array-handwritting/blob/main/indexOf.js)

有了上面的注意点和基本你使用，聪明的你肯定一眼就知道怎么写啦

``` javascript
Array.prototype.indexOf2 = function (targetEle, fromIndex) {
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
    // 在数组内的元素并且和targetEle强等
    if (i in this && targetEle === this[ i ]) {
      return i
    }

    i++
  }

  return -1
}

```

### 测试一把

``` javascript

const array = [2, 5, 9]

console.log(array.indexOf2(2))      // 0
console.log(array.indexOf2(7))      // -1
console.log(array.indexOf2(9, 2))   // 2
console.log(array.indexOf2(2, -1))  // -1
console.log(array.indexOf2(2, -3))  // 0

```


## 11. lastIndexOf

### 基本使用

> ` lastIndexOf` 方法返回指定元素在数组中的最后一个的索引，如果不存在则返回 -1。 [mdn](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/lastIndexOf)

```
arr.lastIndexOf(searchElement[, fromIndex])
```

**注意点**

1. 从``arr.length - 1``位置开始逆向查找。

2. 如果`fromIndex`大于或等于数组的长度，则整个数组会被查找。

3. 如果`fromIndex`为负值，将其视为从数组末尾向前的偏移。即使该值为负，数组仍然会被从后向前查找。

4. 如果`fromIndex`值为负时，其绝对值大于数组长度，则方法返回 -1，即数组不会被查找。

``` javascript
let array = [2, 5, 9, 2]

console.log(array.lastIndexOf(2)) // 3
console.log(array.lastIndexOf(7)) // -1
console.log(array.lastIndexOf(2, 3)) // 3
console.log(array.lastIndexOf(2, 2)) // 0
console.log(array.lastIndexOf(2, -2)) // 0
console.log(array.lastIndexOf(2, -1)) // 3

```

### 代码实现
[点击查看源码实现](https://github.com/qianlongo/array-handwritting/blob/main/lastIndexOf.js)

``` javascript
Array.prototype.lastIndexOf2 = function (targetEle, fromIndex) {
  const length = this.length

  fromIndex = typeof fromIndex === 'undefined' ? length - 1 : fromIndex
  // 数组为空，以及该值为负时且绝对值大于数组长度，则方法返回 -1，即数组不会被查找。
  if (length === 0 || fromIndex < 0 && Math.abs(fromIndex) >= length) {
    return -1
  }

  let i

  if (fromIndex >= 0) {
    // 如果`fromIndex`大于或等于数组的长度，则整个数组会被查找。
    // 也就是当大于数组length - 1时，会取length - 1
    i = Math.min(fromIndex, length - 1)
  } else {
    i = length - Math.abs(fromIndex)
  }

  while (i >= 0) {
    // 等于targetEle时返回索引
    if (i in this && targetEle === this[ i ]) {
      return i
    }
    // 逆向遍历
    i--
  }
  // 没找到返回-1
  return -1
}

```

### 测试一把

``` javascript

let array = [2, 5, 9, 2]

console.log(array.lastIndexOf2(2)) // 3
console.log(array.lastIndexOf2(7)) // -1
console.log(array.lastIndexOf2(2, 3)) // 3
console.log(array.lastIndexOf2(2, 2)) // 0
console.log(array.lastIndexOf2(2, -2)) // 0
console.log(array.lastIndexOf2(2, -1)) // 3

```


## 12. includes

### 基本使用

> ` includes` 方法用来判断一个数组是否包含一个指定的值,如果包含则返回 true，否则返回false。[mdn](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/includes)

``` javascript
arr.includes(valueToFind[, fromIndex])

```

**注意点**

1. 从`fromIndex` 索引处开始查找 `valueToFind`。
2. 如果为负值，则按升序从 `array.length + fromIndex` 的索引开始搜
3. 数组中存在NaN的话，`[ ..., NaN ].includes(NaN)为true`


``` javascript

console.log([1, 2, 3].includes(2))     // true
console.log([1, 2, 3].includes(4))     // false
console.log([1, 2, 3].includes(3, 3))  // false
console.log([1, 2, 3].includes(3, -1)) // true
console.log([1, 2, NaN].includes(NaN)) // true

```


### 代码实现

[点击查看源码实现](https://github.com/qianlongo/array-handwritting/blob/main/includes.js)

``` javascript
Array.prototype.includes2 = function (targetEle, fromIndex) {
  const length = this.length

  fromIndex = +fromIndex || 0

  // 数组为空或者从大于等于数组长度的地方开始检索，都直接是-1
  if (length === 0 || fromIndex >= length) {
    return false
  }
  /*
    1. 从fromIndex开始搜索元素
    2. fromIndex大于0时候直接取即可
    3. 小于0先用长度减去fromIndex的绝对值，如果还是小于0，就直接取0即可
  */
  let i = Math.max(fromIndex >= 0 ? fromIndex : length - Math.abs(fromIndex), 0)

  while (i < length) {
    const value = this[ i ]
    // 注意NaN情况
    if (targetEle === value || typeof targetEle === 'number' && typeof value === 'number' && isNaN(targetEle) && isNaN(value)) {
      return true
    }

    i++
  }

  return false
}

```

### 测试一把
``` javascript

console.log([1, 2, 3].includes2(2))     // true
console.log([1, 2, 3].includes2(4))     // false
console.log([1, 2, 3].includes2(3, 3))  // false
console.log([1, 2, 3].includes2(3, -1)) // true
console.log([1, 2, NaN].includes2(NaN)) // true


```


# 增删改类

## 13. push

### 基本使用
> `push` 方法将一个或多个元素添加到数组的末尾，并返回该数组的新长度。[mdn](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/push)

``` javascript
const animals = ['pigs', 'goats', 'sheep']
animals.push('cows')

console.log(animals, animals.length) 
// ["pigs", "goats", "sheep", "cows"], 4

animals.push('chickens', 'cats', 'dogs')

console.log(animals, animals.length) 

// ["pigs", "goats", "sheep", "cows", "chickens", "cats", "dogs"], 7


```

### 代码实现
[点击查看源码实现](https://github.com/qianlongo/array-handwritting/blob/main/push.js)

``` javascript

Array.prototype.push2 = function (...pushEles) {
  const pushEleLength = pushEles.length
  const length = this.length

  let i = 0
  
  while (i < pushEleLength) {
    this[ length + i ] = pushEles[ i ]
    i++
  }

  return this.length
}


```
### 测试一把

``` javascript
const animals = ['pigs', 'goats', 'sheep']
animals.push2('cows')

console.log(animals, animals.length) 
// ["pigs", "goats", "sheep", "cows"], 4

animals.push2('chickens', 'cats', 'dogs')

console.log(animals, animals.length) 

// ["pigs", "goats", "sheep", "cows", "chickens", "cats", "dogs"], 7

```

## 14. pop

### 基本使用

>  `pop`方法从数组中删除最后一个元素，并返回该元素的值。此方法更改数组的长度。[mdn](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/pop)

``` javascript
let arr = [ 1, 2 ]
let arr2 = []

console.log(arr.pop(), arr) // 2 [1]
console.log(arr2.pop(), arr2) // undefined []

```
代码实现和使用一样简单，只要把数组的最后一个元素返回，并且让数组长度减1即可

### 代码实现

[点击查看源码实现](https://github.com/qianlongo/array-handwritting/blob/main/pop.js)

``` javascript
Array.prototype.pop2 = function () {
  const length = this.length
  // 空数组上pop，直接返回undefined
  if (length === 0) {
    return undefined
  }

  const delEle = this[ length - 1 ]

  this.length = length - 1

  return delEle
}

```

### 测试一把

``` javascript
let arr = [ 1, 2 ]
let arr2 = []

console.log(arr.pop2(), arr) // 2 [1]
console.log(arr2.pop2(), arr2) // undefined []


```


## 15. unshift



### 基本使用
> **`unshift`**  方法将一个或多个元素添加到数组的**开头**，并返回该数组的**新长度(该**方法修改原有数组 **)** 。

**注意点**

1. 如果传入多个参数，它们会被以块的形式插入到对象的开始位置，它们的顺序和被作为参数传入时的顺序一致。

2. 传入多个参数调用一次 `unshift` ，和传入一个参数调用多次 `unshift` (例如，循环调用)，它们将得到不同的结果。例如:



```javascript
let arr = [4,5,6]
// 一次性插入
arr.unshift(1,2,3)

console.log(arr) // [1, 2, 3, 4, 5, 6]

let arr2 = [4,5,6]
// 插入多次
arr2.unshift(1)
arr2.unshift(2)
arr2.unshift(3)

console.log(arr2); // [3, 2, 1, 4, 5, 6]


```

### 代码实现
[点击查看源码实现](https://github.com/qianlongo/array-handwritting/blob/main/unshift.js)
``` javascript
Array.prototype.unshift2 = function (...unshiftEles) {
  // 借助扩展符，将需要添加的元素以块的形式插入到数组前面
  let newArray = [ ...unshiftEles, ...this ]
  let length = newArray.length
  
  let i = 0

  if (unshiftEles.length === 0) {
    return length
  }
  // 重新复制给数组
  while (i < length) {
    this[ i ] = newArray[ i ]
    i++
  }
  
  return this.length
}

```

### 测试一把

``` javascript

let arr = [4,5,6]
// 一次性插入
arr.unshift2(1,2,3)

console.log(arr) // [1, 2, 3, 4, 5, 6]

let arr2 = [4,5,6]
// 插入多次
arr2.unshift2(1)
arr2.unshift2(2)
arr2.unshift2(3)

console.log(arr2); // [3, 2, 1, 4, 5, 6]

```


## 16. shift

### 基本使用
> ` shift` 方法从数组中删除**第一个**元素，并返回该元素的值。 [mdn](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/shift)


``` javascript

let arr = [ 1, 2 ]

console.log(arr.shift(), arr) // 1 [2]
console.log(arr.shift(), arr) // 2 []


```

### 代码实现

[点击查看源码实现](https://github.com/qianlongo/array-handwritting/blob/main/shift.js)

``` javascript
Array.prototype.shift2 = function () {
  const length = this.length
  const delValue = this[ 0 ]

  let i = 1

  while (i < length) {
    // 从第一个元素开始，后面的元素都往前移动一位
    this[ i - 1 ] = this[ i ]
    i++
  }
  // 设置好数组的长度
  this.length = length - 1
  // 返回删除的值
  return delValue
}

```


### 测试一把

``` javascript

let arr = [ 1, 2 ]

console.log(arr.shift2(), arr) // 1 [2]
console.log(arr.shift2(), arr) // 2 []

```


## 17. reverse

### 基本使用

> `reverse` 方法将数组中元素的位置颠倒，并返回该数组。即数组的第一个元素会变成最后一个，数组的最后一个元素变成第一个。[mdn](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/reverse)

```

``` javascript
const arr = [1, 2, 3]

console.log(arr) // [1, 2, 3]

arr.reverse()

console.log(arr) // [3, 2, 1]
```


### 代码实现

[点击查看源码实现](https://github.com/qianlongo/array-handwritting/blob/main/reverse.js)

``` javascript
Array.prototype.reverse2 = function () {
  // 设置双指针，往中间靠拢
  let i = 0
  let j = this.length - 1

  while (i < j) {
    // 第一个和最后一个，第二个和倒数第二个进行位置调换
    [ this[ i ], this[ j ] ] = [ this[ j ], this[ i ] ]
    i++
    j--
  }

  return this
}

```

### 测试一把

``` javascript

const arr = [1, 2, 3]

console.log(arr) // [1, 2, 3]

arr.reverse2()

console.log(arr) // [3, 2, 1]

```

## 18. fill


### 基本使用

> ` fill ` 方法用一个固定值填充一个数组中从起始索引到终止索引内的全部元素。不包括终止索引。[mdn](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/fill)

``` javascript

const array1 = [1, 2, 3, 4];

console.log(array1.fill(0, 2, 4)) // [1, 2, 0, 0]


console.log(array1.fill(5, 1)) // [1, 5, 5, 5]

console.log(array1.fill(6)) // [6, 6, 6, 6]

```


### 代码实现

[点击查看源码实现](https://github.com/qianlongo/array-handwritting/blob/main/fill.js)

``` javascript
Array.prototype.fill2 = function (value, start, end) {
  const length = this.length

  start = start >> 0
  // end没填的话，默认是length，否则取填写的 
  end = typeof end === 'undefined' ? length : end >> 0
  // start最小取0，最大取length
  start = start >= 0 ? Math.min(start, length) : Math.max(start + length, 0)
  // end最小取0，最大取length 
  end = end >= 0 ? Math.min(end, length) : Math.max(end + length, 0)
  // 填充指定范围的索引为value
  while (start < end) {
    this[ start ] = value
    start++
  }
  // 返回被修改的数组
  return this
}


```

### 测试一把
``` javascript

const array1 = [1, 2, 3, 4];

console.log(array1.fill2(0, 2, 4)) // [1, 2, 0, 0]


console.log(array1.fill2(5, 1)) // [1, 5, 5, 5]

console.log(array1.fill2(6)) // [6, 6, 6, 6]

```


# 连接、拼接

## 19. concat

### 基本使用

> ` concat` 方法用于合并两个或多个数组。此方法不会更改现有数组，而是返回一个新数组 [mdn](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/concat)

``` javascript


let num1 = [[1]]
let num2 = [2, [3]]
let num3=[5,[6]]

let nums = num1.concat(num2) // [[1], 2, [3]]
let nums2 = num1.concat(4, num3) // [[1], 4, 5,[6]]

```


### 代码实现

[点击查看源码实现](https://github.com/qianlongo/array-handwritting/blob/main/concat.js)

``` javascript
Array.prototype.concat2 = function (...concatEles) {
  const length = concatEles.length
  // 数组本身展开一层
  let newArray = [ ...this ]
  let i = 0

  while (i < length) {
    const value = concatEles[ i ]
    // 对数组元素展开一层 
    Array.isArray(value) ? newArray.push(...value) : newArray.push(value)
    i++
  }

  return newArray
}


```

### 测试一把

``` javascript

let num1 = [[1]]
let num2 = [2, [3]]
let num3=[5,[6]]

let nums = num1.concat2(num2) // [[1], 2, [3]]
let nums2 = num1.concat2(4, num3) // [[1], 4, 5,[6]]

```


## 20. join

### 基本使用

> ` join` 方法将一个数组的所有元素通过`字符标识`连接成一个字符串并返回这个字符串。如果数组只有一个项目，那么将返回该项目而不使用分隔符。


``` javascript
const elements = ['Fire', 'Air', 'Water']
const elements2 = ['Fire']

console.log(elements.join()) // Fire,Air,Water
console.log(elements.join('')) // FireAirWater
console.log(elements.join('-')) //  Fire-Air-Water
console.log(elements2.join('-')) // Fire

```

### 代码实现

[点击查看源码实现](https://github.com/qianlongo/array-handwritting/blob/main/join.js)

``` javascript
Array.prototype.join2 = function (format = ',') {
  const length = this.length
  // 保存最后一个元素，因为他不参与format连接 
  let lastEle = this[ length - 1 ]
  let string = ''

  if (length === 0) {
    return string
  }

  for (i = 0; i < length - 1; i++) {
    string += this[ i ] + format
  }

  return string + lastEle
}


```


### 测试一把

``` javascript
const elements = ['Fire', 'Air', 'Water']
const elements2 = ['Fire']

console.log(elements.join2()) // Fire,Air,Water
console.log(elements.join2('')) // FireAirWater
console.log(elements.join2('-')) //  Fire-Air-Water
console.log(elements2.join2('-')) // Fire

```


# 静态方法

## 21. Array.isArray



### 基本使用

> **Array.isArray()** 用于确定传递的值是否是一个 [`Array`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array)。

``` javascript

Array.isArray([1, 2, 3]) // true

Array.isArray({foo: 123}) // false

Array.isArray("foobar") // false

Array.isArray(undefined) // false

```

### 代码实现
[点击查看源码实现](https://github.com/qianlongo/array-handwritting/blob/main/isArray.js)

这个非常简单，只需要一句话就可以

``` javascript
Array.isArray2 = function (ele) {
  return  Object.prototype.toString.call(ele) === '[object Array]';
}

```


### 测试一把

``` javascript

Array.isArray2([1, 2, 3]) // true

Array.isArray2({foo: 123}) // false

Array.isArray2("foobar") // false

Array.isArray2(undefined) // false
```


## 22. Array.of

### 基本使用
> ` Array.of` 方法创建一个具有可变数量参数的新数组实例，而不考虑参数的数量或类型。

**注意点**

` Array.of()  ` 和 `Array` 构造函数之间的区别在于处理整数参数：

` Array.of(7)  `创建一个具有单个元素 **7** 的数组，而 **`Array(7)`** 创建一个长度为7的空数组（**注意：** 这是指一个有7个空位(empty)的数组，而不是由7个`undefined`组成的数组）


``` javascript
Array.of(7);       // [7]
Array.of(1, 2, 3); // [1, 2, 3]

Array(7);          // [ , , , , , , ]
Array(1, 2, 3);    // [1, 2, 3]
```

### 代码实现

[点击查看源码实现](https://github.com/qianlongo/array-handwritting/blob/main/of.js)

实现思路就是把你穿进去的值，挨个赋值到当前数组即可

``` javascript
Array.of2 = function (...eles) {
  const length = eles.length
  let i = 0
  let newArray = []

  while (i < length) {
    newArray[ i ] = eles[ i ]
    i++
  }

  return newArray
}

```

### 测试一把
 
``` javascript

Array.of2(7);       // [7]
Array.of2(1, 2, 3); // [1, 2, 3]

```


# 扁平类

## 23. flat

### 基本使用

> ` flat()  ` 方法会按照一个可指定的深度递归遍历数组，并将所有元素与遍历到的子数组中的元素合并为一个新数组返回。 [mdn](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/flat)

``` javascript
const arr1 = [0, 1, 2, [3, 4]];

console.log(arr1.flat()) // [0, 1, 2, 3, 4] 默认会平铺展开一层


const arr2 = [0, 1, 2, [[[3, 4]]]]

console.log(arr2.flat(2)) // [0, 1, 2, [3, 4]] 指定展开两层


```

### 代码实现

[点击查看源码实现](https://github.com/qianlongo/array-handwritting/blob/main/flat.js)

``` javascript

Array.prototype.flat2 = function (depth = 1) {
  const result = []
  const flat = (arr, depth) => {
    for (let item of arr) {
      // 当层数还未全部展开的时候，进行递归处理
      if (Array.isArray(item) && depth > 0) {
        flat(item, depth - 1)
      } else {
        // 去除空元素，添加非undefined元素
        item !== void 0 && result.push(item)
      }
    }
  }

  flat(this, depth)

  return result
}

```

### 测试一把


``` javascript

const arr1 = [0, 1, 2, [3, 4]];

console.log(arr1.flat2()) // [0, 1, 2, 3, 4]


const arr2 = [0, 1, 2, [[[3, 4]]]]

console.log(arr2.flat2(2)) // [0, 1, 2, [3, 4]] 

```

## 24. flatMap

### 基本使用
> ` flatMap` 方法首先使用映射函数映射每个元素，然后将结果压缩成一个新数组。它与 [map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) 连着深度值为1的 [flat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flat) 几乎相同。 [mdn](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/flatMap)


``` javascript

let arr = [1, 2, 3, 4]


arr.flatMap(x => [x * 2]) // [2, 4, 6, 8]

```


### 代码实现

[点击查看源码实现](https://github.com/qianlongo/array-handwritting/blob/main/flatMap.js)

``` javascript

Array.prototype.flatMap2 = function (callback, thisCtx) {
  if (typeof callback !== 'function') {
    throw `${callback} is not a function`
  }
  // map和flat具体实现可以看map.js和flat.js
  return this.map(function (it, i, array) {
    return callback.call(thisCtx, it, i, array)
  }).flat(1)
}

```


### 测试

```
let arr = [1, 2, 3, 4]


arr.flatMap2(x => [x * 2]) // [2, 4, 6, 8]

```

# 结尾

> 国庆将至，祝大家节日快乐，浪浪浪七天乐。

> 文章中可能包含实现有问题或者不够充分的情况，欢迎大家在评论区指出，一定马不停蹄地改正，拜谢。

> 篇幅原因，还有不少数组方法没有写在文章中，如果对大家有一些用处，后续还会出一篇`splice`、`keys`、`values`...等剩余函数的原生实现。祝大家晚安啦 🌹




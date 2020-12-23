# `Promise`

> `Promise` 是异步编程的一种解决方案。一个 `Promise` 对象代表一个在创建时不一定已知的值。

## 状态

- `pending`, `fulfilled`, `rejected`
- 状态只能由 `pending` 转为 `fulfilled` 或者 `rejected`, 且状态不可逆
- 因为 `Promise.prototype.then` 和  `Promise.prototype.catch` 方法返回的是 `promise`， 所以它们可以被链式调用。

## 示意图

![promises](https://media.prod.mdn.mozit.cloud/attachments/2014/09/18/8633/51a934a714e191f53e588bff719bc321/promises.png "promises")

## 注意事项

### 创建 `promise` 的最佳实践 `return resolve()`

`resolve` 和 `reject` 函数并不会立即终止同步代码的执行，最佳实践是立即 `return` 或者置于末尾

``` js
// not recommended
new Promise((resolve, reject) => {
    console.log(1)
    resolve()
    console.log(2)
}).then(() => {
    console.log(3)
})
// 1 -> 2 -> 3

// recommended
new Promise((resolve, reject) => {
    console.log(1)
    return resolve()
}).then(() => {
    console.log(3)
})
// 1 -> 3
```

### 抛出异常 `return new Error('error!!!')`

``` js
Promise.resolve()
  .then(() => {
    return new Error('error!!!')
  })
  .then((res) => {
    console.log('then: ', res)
  })
  .catch((err) => {
    console.log('catch: ', err)
  })
// then:  Error: error!!!
//    at <anonymous>
```

`.then` 或者 `.catch` 中 `return` 一个 `error` 对象并不会抛出错误，所以不会被后续的 `.catch` 捕获，需要改成其中一种：

`return Promise.reject(new Error('error!!!'))`

`throw new Error('error!!!')`

因为返回任意一个非 `promise` 的值都会被包裹成 `promise` 对象，即 `return new Error('error!!!')` 等价于 `return Promise.resolve(new Error('error!!!'))`。

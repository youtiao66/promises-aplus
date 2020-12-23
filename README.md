# `Promise`

> `Promise` 是异步编程的一种解决方案。一个 `Promise` 对象代表一个在创建时不一定已知的值。

## 状态

- `pending`, `fulfilled`, `rejected`
- 状态只能由 `pending` 转为 `fulfilled` 或者 `rejected`, 且状态不可逆
- 因为 `Promise.prototype.then` 和  `Promise.prototype.catch` 方法返回的是 `promise`， 所以它们可以被链式调用。

## 示意图

![promises](https://media.prod.mdn.mozit.cloud/attachments/2014/09/18/8633/51a934a714e191f53e588bff719bc321/promises.png "promises")

## 注意事项

### `return resolve()`

> `resolve` 和 `reject` 函数并不会立即终止同步代码的执行，最佳实践是立即 `return` 或者置于末尾

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

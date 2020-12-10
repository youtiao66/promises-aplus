# Promise

> `Promise` 是异步编程的一种解决方案

## 状态

- `pending`, `fulfilled`, `rejected`
- 状态只能由 `pending` 转为 `fulfilled` 或者 `rejected`, 且状态不可逆
- 因为 `Promise.prototype.then` 和  `Promise.prototype.catch` 方法返回的是 `promise`， 所以它们可以被链式调用。

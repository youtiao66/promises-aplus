# `Promise`

> `Promise` 是异步编程的一种解决方案。一个 `Promise` 对象代表一个在创建时不一定已知的值。

## 状态

- `pending`, `fulfilled`, `rejected`
- 状态只能由 `pending` 转为 `fulfilled` 或者 `rejected`, 且状态不可逆
- 因为 `Promise.prototype.then` 和  `Promise.prototype.catch` 方法返回的是 `promise`， 所以它们可以被链式调用。

## 示意图

![promises](https://media.prod.mdn.mozit.cloud/attachments/2014/09/18/8633/51a934a714e191f53e588bff719bc321/promises.png "promises")

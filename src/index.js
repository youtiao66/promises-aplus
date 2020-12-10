const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

function PromiseZ(fn) {
  this.status = PENDING
  this.value = undefined
  this.reason = undefined

  this.onFulfilledCallback
  this.onRejectedCallback

  const me = this

  function resolve(value) {
    if (me.status === PENDING) {
      me.status = FULFILLED
      me.value = value
      me.onFulfilledCallback && me.onFulfilledCallback(value)
    }
  }

  function reject(reason) {
    if (me.status === PENDING) {
      me.status = REJECTED
      me.reason = reason
      me.onRejectedCallback && me.onRejectedCallback(reason)
    }
  }

  try {
    fn(resolve, reject)
  } catch(err) {
    reject(err)
  }
}

PromiseZ.prototype.then = function(onFulfilled, onRejected) {
  const onFulfilledCallback = typeof onFulfilled === 'function' ? onFulfilled : value => value
  const onRejectedCallback = typeof onRejected === 'function' ? onRejected : reason => { throw reason }
  if (this.status === FULFILLED) {
    onFulfilledCallback(this.value)
  } else if (this.status === REJECTED) {
    onRejectedCallback(this.reason)
  } else {
    this.onFulfilledCallback = onFulfilledCallback
    this.onRejectedCallback = onRejectedCallback
  }
}

PromiseZ.deferred = function() {
  let defer = {}
  defer.promise = new PromiseZ((resolve, reject) => {
    defer.resolve = resolve
    defer.reject = reject
  })
  return defer
}

module.exports = PromiseZ

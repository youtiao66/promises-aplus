const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

function PromiseZ(fn) {
  this.status = PENDING
  this.value = undefined
  this.reason = undefined

  this.onFulfilledCallbacks = []
  this.onRejectedCallbacks = []

  const me = this

  function resolve(value) {
    if (me.status === PENDING) {
      me.status = FULFILLED
      me.value = value
      setTimeout(() => {
        me.onFulfilledCallbacks.forEach(cb => cb(value))
      }, 0)
    }
  }

  function reject(reason) {
    if (me.status === PENDING) {
      me.status = REJECTED
      me.reason = reason
      setTimeout(() => {
        me.onRejectedCallbacks.forEach(cb => cb(reason))
      }, 0)
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
    setTimeout(() => {
      onFulfilledCallback(this.value)
    }, 0)
  } else if (this.status === REJECTED) {
    setTimeout(() => {
      onRejectedCallback(this.reason)
    }, 0)
  } else {
    this.onFulfilledCallbacks.push(onFulfilledCallback)
    this.onRejectedCallbacks.push(onRejectedCallback)
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

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
  let promise2 = new PromiseZ((resolve, reject) => {
    if (this.status === FULFILLED) {
      setTimeout(() => {
        try {
          let x = onFulfilledCallback(this.value)
          resolve(x)
        } catch(err) {
          reject(err)
        }
      }, 0)
    } else if (this.status === REJECTED) {
      setTimeout(() => {
        try {
          let x = onRejectedCallback(this.reason)
          resolve(x)
        } catch(err) {
          reject(err)
        }
      }, 0)
    } else {
      this.onFulfilledCallbacks.push((value) => {
        try {
          let x = onFulfilledCallback(value)
          resolve(x)
        } catch(err) {
          reject(err)
        }
      })
      this.onRejectedCallbacks.push((reason) => {
        try {
          let x = onRejectedCallback(reason)
          resolve(x)
        } catch(err) {
          reject(err)
        }
      })
    }
  })

  return promise2
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

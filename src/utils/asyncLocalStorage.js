// using istanbul ignore on portions of code that are not currently used internally

export const AsyncLocalStorage = {
  // must use wrapper functions when passing localStorage functions (https://github.com/agilgur5/mst-persist/issues/18)
  // clear /* istanbul ignore next */ () {
  //   return callWithPromise(() => window.localStorage.clear())
  // }
  getItem(key) {
    return callWithPromise(() => window.localStorage.getItem(key))
  },
  removeItem /* istanbul ignore next */(key) {
    return callWithPromise(() => window.localStorage.removeItem(key))
  },
  setItem(key, value) {
    return callWithPromise(() => window.localStorage.setItem(key, value))
  },
}

function callWithPromise(func, ...args) {
  try {
    return Promise.resolve(func(...args))
  } catch (err) {
    /* istanbul ignore next */
    return Promise.reject(err)
  }
}

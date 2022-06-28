/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import { onSnapshot, applySnapshot } from 'mobx-state-tree'
import { AsyncLocalStorage } from './asyncLocalStorage.js'

import { encrypt, decrypt } from '../utils/encryption'

export const persist = (name, store, options = {}) => {
  let { storage, jsonify = true, whitelist, blacklist } = options
  // use AsyncLocalStorage by default (or if localStorage was passed in)
  if (typeof window !== 'undefined' && typeof window.localStorage !== 'undefined' && (!storage || storage === window.localStorage)) {
    storage = AsyncLocalStorage
  }
  if (!storage) {
    return Promise.reject(
      'localStorage (the default storage engine) is not ' +
        'supported in this environment. Please configure a different storage ' +
        'engine via the `storage:` option.',
    )
  }
  const whitelistDict = arrToDict(whitelist)
  const blacklistDict = arrToDict(blacklist)

  onSnapshot(store, _snapshot => {
    // need to shallow clone as otherwise properties are non-configurable (https://github.com/agilgur5/mst-persist/pull/21#discussion_r348105595)
    const snapshot = { ..._snapshot }
    Object.keys(snapshot).forEach(key => {
      if (whitelist && !whitelistDict[key]?.state) {
        delete snapshot[key]
      }
      if (blacklist && blacklistDict[key]?.state) {
        delete snapshot[key]
      }
    })

    const encryptedData = Object.entries(snapshot).reduce((acc, val) => {
      const [key, data] = val
      if (whitelistDict[[key]].crypt) {
        acc[[key]] = JSON.parse(encrypt(JSON.stringify(data)))
      } else {
        acc[[key]] = data
      }
      return acc
    }, {})

    const data = !jsonify ? encryptedData : JSON.stringify(encryptedData)
    storage.setItem(name, data)
  })

  return storage.getItem(name).then(data => {
    const decryptedData =
      data &&
      JSON.stringify(
        Object.entries(JSON.parse(data)).reduce((acc, val) => {
          const [key, data] = val
          if (whitelistDict[[key]].crypt) {
            acc[[key]] = JSON.parse(decrypt(data))
          } else {
            acc[[key]] = data
          }
          return acc
        }, {}),
      )
    const snapshot = !isString(decryptedData) ? decryptedData : JSON.parse(decryptedData)
    // don't apply falsey (which will error), leave store in initial state
    if (!snapshot) return
    applySnapshot(store, snapshot)
  })
}

function arrToDict(arr) {
  if (!arr) return {}
  return arr.reduce((dict, elem) => {
    dict[elem.key] = { crypt: elem?.crypt, state: true }
    return dict
  }, {})
}

function isString(value) {
  return typeof value === 'string'
}

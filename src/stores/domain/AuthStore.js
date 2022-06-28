import { applySnapshot, getSnapshot, types } from 'mobx-state-tree'
import { LoginCommand, UserInfoModel } from 'stores/models'
import { apiV1 } from '../../utils'
import { fromPromise, FULFILLED } from 'mobx-utils'
import { when } from 'mobx'

const AuthStore = types
  .model('AuthStore')
  .props({
    _user: types.optional(UserInfoModel, {}),
    _isLoading: types.optional(types.boolean, false),
    _isAuth: types.optional(types.boolean, false),
    _isRememberMe: types.optional(types.boolean, false),
    _isStupid: types.optional(types.boolean, false),
    _loginTries: types.optional(types.number, 0),
    _userName: types.optional(types.string, ''),
    _isPending: types.optional(types.boolean, false),
  })
  .actions(self => {
    const ACCOUNT_API = '/Token'

    const setUser = userData => {
      applySnapshot(self._user, userData)
    }

    const setIsAuth = isAuth => {
      self._isAuth = isAuth
    }

    const setIsRememberMe = isRememberMe => {
      self._isRememberMe = isRememberMe
    }

    const signOut = () => {
      setIsAuth(false)
      setUser(UserInfoModel.create())
      setUserName('')
    }

    const setIsLoading = isLoading => {
      self._isLoading = isLoading
    }

    const setLoginTries = number => {
      self._loginTries = number
    }

    const setUserName = name => {
      self._userName = name
    }

    const setIsPending = isPending => {
      self._isPending = isPending
    }

    const signIn = userData => {
      const loginRequest = fromPromise(apiV1.post(`${ACCOUNT_API}/Access`, LoginCommand.create(userData)))
      when(() =>
        loginRequest.case({
          fulfilled: response => {
            setUser({
              ...response.data,
            })
            return true
          },
        }),
      )
      return loginRequest
    }

    const refreshToken = (_data = {}) => {
      setUser(UserInfoModel.create())

      const prom = fromPromise(apiV1.post(`${ACCOUNT_API}/Refresh`, _data))

      when(
        () => prom.state === FULFILLED,
        () => {
          prom.case({
            fulfilled: response => {
              setUser({
                ...response.data,
              })
            },
          })
        },
      )

      return prom
    }

    const getTundukAuthUri = () => {
      return fromPromise(apiV1.get(`${ACCOUNT_API}/login/tunduk`))
    }

    const sendRequestForSupport = async data => apiV1.post(`${ACCOUNT_API}/support`, data)

    const sendCaptcha = async data => {
      return apiV1.post(`${ACCOUNT_API}/sendcaptcha`, data)
    }

    const sendTundukAuth = async data => {
      const loginRequest = fromPromise(apiV1.post(`${ACCOUNT_API}/tunduk/login`, data))

      when(() =>
        loginRequest.case({
          fulfilled: response => {
            setUser({
              ...response.data,
            })
            return true
          },
        }),
      )
      return loginRequest
    }

    return {
      signIn,
      signOut,
      setIsLoading,
      setIsAuth,
      setUser,
      setIsRememberMe,
      sendRequestForSupport,
      refreshToken,
      setLoginTries,
      sendCaptcha,
      setUserName,
      getTundukAuthUri,
      sendTundukAuth,
      setIsPending,
    }
  })
  .views(self => ({
    get user() {
      return getSnapshot(self._user)
    },
    get isAuth() {
      return self._isAuth
    },
    get isLoading() {
      return self._isLoading
    },
    get isRememberMe() {
      return self._isRememberMe
    },
    get tundukAuthUri() {
      return self._tundukAuthUri
    },
    get isPending() {
      return self._isPending
    },
  }))

export default AuthStore

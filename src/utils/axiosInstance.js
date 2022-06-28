import axios from 'axios'
import qs from 'qs'

const apiV1 = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}api/`,
})

const setupAxiosInterceptors = (appStore, authStore) => {
  apiV1.interceptors.request.use(
    async req => {
      if (req.url === '/api/Token/Refresh') {
        authStore.setIsPending(true)
      }
      return {
        ...req,
        headers: {
          ...req.headers,
          'Accept-Language': appStore.currentLanguage === 'ru' ? 'ru-RU' : 'en-US',
          Authorization: `Bearer ${authStore.user.accessToken}`,
        },
        paramsSerializer: params => qs.stringify(params, { allowDots: true, skipNulls: true }),
      }
    },
    error => Promise.reject(error),
  )

  apiV1.interceptors.response.use(
    response => response,
    async error => {
      const originalRequest = error.config

      if (error.response?.status === 401 && originalRequest.url === '/api/Token/Refresh' && !authStore.isPending) {
        authStore.signOut()
        // Promise.reject(error)
      }

      if (error.response?.status === 401 && !originalRequest._retry && !authStore.isPending) {
        try {
          originalRequest._retry = true
          const refreshToken = authStore.user.refreshToken

          const response = await authStore.refreshToken({
            refreshToken,
          })

          apiV1.defaults.headers.common['Authorization'] = `Bearer ${response.data.accessToken}`

          await apiV1(originalRequest)
          authStore.setIsPending(false)
        } catch (e) {
          authStore.setIsPending(false)
          authStore.signOut()
        }
      }

      return Promise.reject(error)
    },
  )
}

export { setupAxiosInterceptors, apiV1 }

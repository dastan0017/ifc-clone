import React from 'react'
import ReactDOM from 'react-dom'
import reportWebVitals from './reportWebVitals'
import loadable from '@loadable/component'
import { Provider } from 'mobx-react'
import { setupAxiosInterceptors } from './utils'
import { persist } from './utils/persist.js'
import { stores } from './stores/domain'
import { ToastContainer } from 'react-toastify'
import './index.scss'
import IntlProviderWrapper from './IntlProviderWrapper'
const App = loadable(() => import('./App'))
import { BrowserRouter } from 'react-router-dom'

persist('authStore', stores.authStore, {
  storage: localStorage,
  whitelist: [{ key: '_user', crypt: true }, { key: '_isAuth' }, { key: '_loginTries' }, { key: '_userName' }],
})

persist('appStore', stores.appStore, {
  storage: localStorage,
  whitelist: [{ key: '_currentLanguage' }],
})

setupAxiosInterceptors(stores.appStore, stores.authStore)

ReactDOM.render(
  <Provider {...stores}>
    <BrowserRouter>
      <IntlProviderWrapper>
        <App />
      </IntlProviderWrapper>
    </BrowserRouter>
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
  </Provider>,
  document.getElementById('root'),
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()

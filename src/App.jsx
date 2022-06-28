import React, { Suspense, useState, useCallback, useEffect } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { useStore } from './hooks'

import { SignIn } from 'pages'
import { SIGNIN_ROUTE } from 'routes'
import routes from './routes'
import { Layout } from './views/Layout'
import { getLocalStorage } from './utils/utils'
import { observer } from 'mobx-react'
import { ErrorBoundary } from './components'

const App = observer(() => {
  const authStore = useStore('authStore')
  const [allowedRoutes, setAllowedRoutes] = useState([])

  const filterRoutes = useCallback(
    arr => {
      return arr.reduce((acc, val) => {
        if (val.access.includes(authStore.user?.roleNames?.[0])) {
          if (val?.children && Array.isArray(val.children)) {
            acc = [
              ...acc,
              Object.assign({}, val, {
                children: filterRoutes(val.children),
              }),
            ]
          } else {
            acc.push(val)
          }
        }
        return acc
      }, [])
    },
    [authStore.user.roleNames],
  )

  useEffect(() => {
    setAllowedRoutes(filterRoutes(routes))
  }, [authStore.user, filterRoutes])

  if (!authStore.isAuth && !getLocalStorage('authStore')?._isAuth)
    return (
      <Suspense fallback={<div>...loading</div>}>
        <Switch>
          <Route path={SIGNIN_ROUTE} name="Sign In" render={props => <SignIn {...props} />} />
          <Redirect to={SIGNIN_ROUTE} />
        </Switch>
      </Suspense>
    )

  if (!allowedRoutes.length) return null

  return (
    <Layout routes={allowedRoutes}>
      <Suspense fallback={<div>...loading</div>}>
        <Switch>
          {allowedRoutes.map(({ component: Component, path, name, children }) => (
            <Route
              exact={!children}
              path={path}
              key={name.id}
              render={props => (
                <ErrorBoundary key={name.id}>
                  <Component {...props} />
                </ErrorBoundary>
              )}
            />
          ))}
          <Redirect to="/banks" />
        </Switch>
      </Suspense>
    </Layout>
  )
})

export default App

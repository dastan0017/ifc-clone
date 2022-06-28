import React from 'react'
import loadable from '@loadable/component'

export const SignIn = loadable(() => import('./SignIn'), {
  fallback: <div>...loading</div>,
})

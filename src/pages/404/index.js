import React from 'react'
import loadable from '@loadable/component'

export const Page404 = loadable(() => import('./Page404'), { fallback: <div>...loaging</div> })

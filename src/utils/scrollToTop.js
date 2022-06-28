import React, { useEffect, Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'

function ScrollToTop({ history, children }) {
  useEffect(() => {
    const unlisten = history.listen(() => {
      window.scrollTo(0, 0)
    })
    return () => {
      unlisten()
    }
  }, [history])

  return <Fragment>{children}</Fragment>
}

ScrollToTop.propTypes = {
  history: PropTypes.object,
  children: PropTypes.node,
}

export default withRouter(ScrollToTop)

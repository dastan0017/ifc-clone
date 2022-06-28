import React from 'react'
import { FormattedMessage } from 'react-intl'
import PropTypes from 'prop-types'

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { error: null, errorInfo: null }
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { error: error }
  }

  componentDidCatch(error, errorInfo) {
    // Catch error in any component below and render error message
    this.setState({
      error: error,
      errorInfo: errorInfo,
    })
  }

  render() {
    if (this.state.errorInfo) {
      // Error path

      return (
        <div>
          <h2>{<FormattedMessage id="global.smth_went_wrong" />}</h2>
          <details style={{ whiteSpace: 'pre-wrap' }}>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo.componentStack}
          </details>
        </div>
      )
    }
    // Normally, just render children
    return this.props.children
  }
}
ErrorBoundary.propTypes = {
  children: PropTypes.any,
}
export default ErrorBoundary

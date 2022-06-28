import React from 'react'
import PropTypes from 'prop-types'
import { Container, Row } from 'react-bootstrap'
import Navbar from './Navbar'
import './Layout.scss'

export const Layout = ({ children, routes }) => {
  return (
    <Container style={{ minHeight: '100vh' }}>
      <Row>
        <Navbar routes={routes} />
      </Row>
      <main className="h-100 w-100">
        <div className="page_container">{children}</div>
      </main>
    </Container>
  )
}

Layout.propTypes = {
  routes: PropTypes.array,
  children: PropTypes.node,
}

export default Layout

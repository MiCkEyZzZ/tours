import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'

import { useRoutes } from '../../routes'
import { Header, Footer } from '../../compoentns'
import { useSelector } from 'react-redux'

const Layout = () => {
  const { isAuthenticated } = useSelector(state => state.auth)
  const routes = useRoutes(isAuthenticated)

  return (
    <Router>
      <Header />
        <>
          { routes }
        </>
        <Footer />
    </Router>
)
}

export default Layout

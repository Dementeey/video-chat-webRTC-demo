import React from 'react'
import { Redirect, Route } from 'react-router-dom'

const PrivateRoute = ({ component: Component, path, ...rest }) => {
  const roomToken = localStorage.getItem('roomToken')
  const render = props => (roomToken ? <Component path={path} {...props} /> : <Redirect to="/" />)

  if (path === '/') {
    return <Route component={Component} />
  }

  return <Route {...rest} render={render} />
}

export default PrivateRoute

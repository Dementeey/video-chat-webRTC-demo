import React from 'react'
import { BrowserRouter, Switch, NavLink } from 'react-router-dom'

import routerConfig from './routsConfig'
import './App.css'
import PrivateRoute from './components/PrivateRoute'

const nav = routerConfig.map(({ label, path, to, exact }) => (
  <NavLink to={to} key={path} exact={exact} className="link" activeClassName="link-active">
    {label}
  </NavLink>
))

const main = routerConfig.map(({ path, exact, component }) => (
  <PrivateRoute key={path} path={path} exact={exact} component={component} />
))

const App = () => (
  <BrowserRouter>
    <div className="App">
      <aside>
        <nav>{nav}</nav>
      </aside>

      <main>
        <Switch>{main}</Switch>
      </main>
    </div>
  </BrowserRouter>
)

export default App

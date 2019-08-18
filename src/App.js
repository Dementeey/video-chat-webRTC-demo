import React, { useState } from 'react'
import { BrowserRouter, Route, Switch, NavLink } from 'react-router-dom'

import routerConfig from './routsConfig'
import './App.css'
import Button from "./components/Button";


const nav = routerConfig.map(({ label, path, exact }) => (
  <NavLink
    to={path}
    key={path}
    exact={exact}
    className='link'
    activeClassName='link-active'
  >
    {label}
  </NavLink>
))

const main = routerConfig.map(({ path, exact, component }) => (
  <Route
    key={path}
    path={path}
    exact={exact}
    component={component}
  />
))

const App = () => {
  const [isConnect, setConnect] = useState(false)
  const onConnect = () => setConnect(!isConnect)


  return (
    <BrowserRouter>
      <div className="App">
        <aside>
          <nav>
            {nav}
          </nav>

          <Button onClick={onConnect}>
            {isConnect ? 'Disconnect' : 'Connect'}
          </Button>
        </aside>

        <main>
          <Switch>
            {main}
          </Switch>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App

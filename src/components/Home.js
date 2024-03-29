import React, { useEffect, useState } from 'react'
import isEqual from 'lodash/isEqual'
import isEmpty from 'lodash/isEmpty'

import './style.css'
import addDefaultLine from '../helpers/addDefaultLine'
import useOnlineConnections from '../hooks/onlineConnections'

import Button from './Button'

const Home = ({ history, location }) => {
  const [username, setUsername] = useState('')
  const onControlInput = ({ target }) => setUsername(target.value)
  const isReconnect = location.state && location.state.reconnect
  const {
    isConnect,
    setConnect,
    onConnect,
    onlineConnections,
    setOnlineConnections
  } = useOnlineConnections()

  const onlineItems = addDefaultLine(onlineConnections).map(({ id, name }) => (
    <li key={id} className="online-item">
      {name}
    </li>
  ))

  useEffect(() => {
    const user = localStorage.getItem('user')
    const online = localStorage.getItem('online')
    const parse = JSON.parse(online)
    const parseUser = JSON.parse(user)

    if (!isEmpty(parse) && !isEqual(parse, onlineConnections)) {
      setOnlineConnections(parse)
    }

    if (!isEmpty(parseUser) && onlineConnections.some(item => item.id === parseUser.id)) {
      setConnect(true)
    }

    if (isReconnect) {
      setConnect(false)
      localStorage.clear()
    }
  })

  console.log('=========location=========')
  console.log(location.state)
  console.log('=========END=========')

  return (
    <>
      <h1>Video chat with WebRTC</h1>

      {isReconnect && <h3>Reconnect please</h3>}

      {onlineItems && (
        <>
          <h4>Who online?</h4>
          <div className="online-box">
            <ul className="online-list">{onlineItems}</ul>
          </div>
        </>
      )}

      {!isConnect && (
        <input className="username" name="username" onChange={onControlInput} value={username} />
      )}

      <Button onClick={() => onConnect(username)}>{isConnect ? 'Disconnect' : 'Connect'}</Button>
    </>
  )
}

export default Home

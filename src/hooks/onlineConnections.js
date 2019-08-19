import { useState, useCallback } from 'react'
import uuid from 'uuid/v4'

export default () => {
  const [isConnect, setConnect] = useState(false)
  const [onlineConnections, setConnections] = useState([])

  const setOnlineConnections = useCallback(
    value => {
      setConnections(value)
      localStorage.setItem('online', JSON.stringify(value))
    },
    [setConnections]
  )

  const onConnect = username => {
    const user = {
      id: uuid(),
      name: username || 'anonymous'
    }

    if (!isConnect) {
      setOnlineConnections([...onlineConnections, user])

      localStorage.setItem('user', JSON.stringify(user))

      if (!localStorage.getItem('roomToken')) {
        localStorage.setItem('roomToken', uuid())
      }
    }

    if (isConnect) {
      const { id } = JSON.parse(localStorage.getItem('user'))

      setOnlineConnections(onlineConnections.filter(item => item.id !== id))
      localStorage.removeItem('user')
    }

    setConnect(!isConnect)
  }

  return {
    isConnect,
    setConnect,
    onConnect,
    onlineConnections,
    setOnlineConnections
  }
}

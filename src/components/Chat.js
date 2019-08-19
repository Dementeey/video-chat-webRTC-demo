import React, { useEffect } from 'react'
import './style.css'
import isEmpty from 'lodash/isEmpty'
import isEqual from 'lodash/isEqual'
import useOnlineConnections from '../hooks/onlineConnections'

const Chat = () => {
  const { onlineConnections, setOnlineConnections } = useOnlineConnections()
  const userRaw = localStorage.getItem('user')
  const selfId = JSON.parse(userRaw).id || ''

  const previewUsers = onlineConnections
    .filter(item => item.id !== selfId)
    .map(({ id, name }) => {
      return (
        <li key={id} className="preview-user">
          <span className="name">{name}</span>
        </li>
      )
    })

  useEffect(() => {
    const online = localStorage.getItem('online')
    const parse = JSON.parse(online)

    // const user = localStorage.getItem('user')
    // const parseUser = JSON.parse(user)

    if (!isEmpty(parse) && !isEqual(parse, onlineConnections)) {
      console.log('=========parse=========')
      console.log(parse)
      console.log('=========END=========')

      setOnlineConnections(parse)
    }
  })

  console.log('=========onlineConnections=========')
  console.log(onlineConnections)
  console.log('=========END=========')

  return (
    <>
      <h1>Chat</h1>

      <div className="view">
        <div className="preview-self">
          <span className="self">Your selfie</span>
        </div>
      </div>

      <div className="preview-users-wrap">
        <ul className="preview-users">{previewUsers}</ul>
      </div>
    </>
  )
}

export default Chat

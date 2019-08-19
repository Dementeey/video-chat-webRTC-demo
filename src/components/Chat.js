import React, { useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import './style.css'
import isEmpty from 'lodash/isEmpty'
import isEqual from 'lodash/isEqual'
import VideoContainer from './VideoContainer'

import useOnlineConnections from '../hooks/onlineConnections'

const Chat = ({ match, history }) => {
  const { onlineConnections, setOnlineConnections } = useOnlineConnections()
  const userRaw = localStorage.getItem('user')
  const userParse = JSON.parse(userRaw)
  const selfId = userParse ? userParse.id : ''

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

    const { roomToken } = match.params
    const roomTokenLocal = localStorage.getItem('roomToken')

    // const user = localStorage.getItem('user')
    // const parseUser = JSON.parse(user)

    if (!isEmpty(parse) && !isEqual(parse, onlineConnections)) {
      setOnlineConnections(parse)
    }

    if (!roomToken || !roomTokenLocal) {
      history.push({
        path: '/',
        state: { reconnect: true }
      })
    }

    if (roomToken !== roomTokenLocal) {
      history.push(`/chat/${roomTokenLocal}`)
    }
  })

  return (
    <>
      <h1>Chat</h1>

      <div className="view">
        <div className="preview-self">
          <span className="self">Your selfie</span>
          <VideoContainer />
        </div>
        <VideoContainer />
      </div>

      {previewUsers.length > 0 && (
        <div className="preview-users-wrap">
          <ul className="preview-users">{previewUsers}</ul>
        </div>
      )}
    </>
  )
}

export default Chat

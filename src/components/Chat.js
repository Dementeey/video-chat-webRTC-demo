import React, { useEffect, useState } from 'react'

import './style.css'
import isEmpty from 'lodash/isEmpty'
import isEqual from 'lodash/isEqual'
import VideoContainer from './VideoContainer'

import useOnlineConnections from '../hooks/onlineConnections'

function handleSuccess(stream) {
  const video = document.querySelector('video')

  video.srcObject = stream
}

const handleError = (error, setErrorMsg) => {
  const constraints = (window.constraints = {
    audio: false,
    video: true
  })

  if (error.name === 'ConstraintNotSatisfiedError') {
    let v = constraints.video

    return setErrorMsg(
      `The resolution ${v.width.exact}x${v.height.exact} px is not supported by your device.`
    )
  }
  if (error.name === 'PermissionDeniedError') {
    return setErrorMsg(
      'Permissions have not been granted to use your camera and ' +
        'microphone, you need to allow the page access to your devices in ' +
        'order for the demo to work.'
    )
  }
  return setErrorMsg(`getUserMedia error: ${error.name}`, error)
}

const Chat = ({ match, history }) => {
  const { onlineConnections, setOnlineConnections } = useOnlineConnections()
  const [errorMessage, setErrorMsg] = useState('')
  const [stream, setStream] = useState()
  const [isOnAudio, setSettingAudio] = useState(false)
  const userRaw = localStorage.getItem('user')
  const userParse = JSON.parse(userRaw)
  const selfId = userParse ? userParse.id : ''

  const init = async options => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia(options)

      setStream(mediaStream)
      handleSuccess(mediaStream)
    } catch (error) {
      handleError(error, setErrorMsg)
    }
  }

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
    const { roomToken } = match.params
    const roomTokenLocal = localStorage.getItem('roomToken')
    const options = {
      audio: isOnAudio,
      video: true
    }

    if (roomToken && roomToken === roomTokenLocal) {
      init(options)
    }
  }, [isOnAudio, match])

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

      <p>
        <input
          id="TOGGLE_AUDIO"
          type="checkbox"
          onChange={({ target }) => setSettingAudio(target.checked)}
        />

        <label htmlFor="TOGGLE_AUDIO">Turn {isOnAudio ? 'off' : 'on'} audio</label>
      </p>

      {errorMessage ? (
        <div className="view view-error">
          <p>{errorMessage}</p>
        </div>
      ) : (
        <div className="view">
          <div className="preview-self">
            <span className="self">Your selfie</span>
            <VideoContainer />
          </div>

          {stream && <VideoContainer stream={stream} />}
        </div>
      )}

      {previewUsers.length > 0 && (
        <div className="preview-users-wrap">
          <ul className="preview-users">{previewUsers}</ul>
        </div>
      )}
    </>
  )
}

export default Chat

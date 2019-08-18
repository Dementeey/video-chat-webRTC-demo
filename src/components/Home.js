import React from 'react'

import './style.css'

const onlineConnections = [
  {
    id: Math.random(),
    name: 'Name 1',
  },
]

const addDefaultLine = arr => {
  const minLines = 11

  if (arr.length > minLines) {
    return arr
  }

  const defaultLines = Array.from({ length: minLines - arr.length }).map(() => ({
    id: Math.random(),
    name: ''
  }))

  return [...arr, ...defaultLines]
}

const Home = () => {
  const onlineItems = addDefaultLine(onlineConnections).map(({ name, id }) => (
    <li key={id} className="online-item">
      {name}
    </li>
  ))

  return (
    <>
      <h1>Video chat with WebRTC</h1>

      <h4>Who online?</h4>

      <div className="online-box">
        <ul className="online-list">
          {onlineItems}
        </ul>
      </div>
    </>
  );
}

export default Home

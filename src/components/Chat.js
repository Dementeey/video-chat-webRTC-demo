import React from 'react'
import './style.css'

const users = [
  {
    id: 1,
    name: 'Name 1'
  },
]

const Chat = () => {
  const previewUsers = users.map(({ id, name }) => (
    <li key={id} className='preview-user'>
      <span className='name'>{name}</span>
    </li>
  ))

  return (
    <>
      <h1>Chat</h1>

      <div className='view'>
        <div className="preview-self">
          <span className='self'>Your selfie</span>
        </div>
      </div>

      <div className='preview-users-wrap'>
        <ul className='preview-users'>{previewUsers}</ul>
      </div>
    </>
  );
}

export default Chat

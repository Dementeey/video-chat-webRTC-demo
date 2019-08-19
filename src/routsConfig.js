import Home from './components/Home'
import Chat from './components/Chat'

export default [
  {
    path: '/',
    to: '/',
    label: 'Home',
    exact: true,
    component: Home
  },
  {
    path: '/chat/:roomToken?',
    to: `/chat/${localStorage.getItem('roomToken') || ''}`,
    label: 'Chat',
    exact: true,
    component: Chat
  }
]

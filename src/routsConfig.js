import Home from './components/Home'
import Chat from './components/Chat'


export default [
  {
    path: '/',
    label: 'Home',
    exact: true,
    component: Home
  },
  {
    path: '/chat',
    label: 'Chat',
    exact: true,
    component: Chat
  },
]

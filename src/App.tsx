import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import TaskInputForm from './components/task/TaskInputForm'
import ChatApp from './components/ChatApp'

function App() {

  return (
    <>
      <div>
        <ChatApp></ChatApp>
        {/* <TaskInputForm></TaskInputForm> */}
      </div>
    </>
  )
}

export default App

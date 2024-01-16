import React from 'react'
import Login from './pages/login/login'
// Styles e Css
import './App.css'
import { Outlet } from 'react-router-dom'

function App() {

  return (
    <>
      <Outlet />
    </>
  )
}

export default App

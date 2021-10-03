import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'

const setViewHeight = () => {
  const vh = window.innerHeight * 0.01
  document.documentElement.style.setProperty('--vh', `${vh}px`)
}

setViewHeight()

window.addEventListener('resize', setViewHeight)
window.addEventListener('touchend', setViewHeight)

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)

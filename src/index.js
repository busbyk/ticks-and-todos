import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'

const setViewHeight = () => {
  console.log('setting vh')
  const vh = window.innerHeight * 0.01
  document.documentElement.style.setProperty('--vh', `${vh}px`)
}

setViewHeight()

window.addEventListener('resize touchmove', () => {
  setViewHeight()
})

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)

import './App.scss'
import React from 'react'

export const App = () => (
  <div className="app">
    <h1>{process.env.REACT_APP_APP_TITLE}</h1>
    <img alt="Alba" src="/alba.jpg" className="app__image" />
  </div>
)

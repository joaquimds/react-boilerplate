import './App.scss'
import React from 'react'
import { Header } from '../Header/Header'

export const App = () => (
  <div className="app">
    <Header />
    <img alt="Alba" src="/alba.jpg" className="app__image" />
  </div>
)

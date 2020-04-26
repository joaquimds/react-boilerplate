import './global.scss'

import React from 'react'
import ReactDOM from 'react-dom'
import { App } from './components/App'

// Get the <div id="root"></div> element from index.html
const root = document.getElementById('root')

// Render the top-level App component inside the root element
ReactDOM.render(<App />, root)

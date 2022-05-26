/**
 * The starting point of the application.
 *
 * @author Andreas Lillje
 * @version 2.3.1
 */

import './index.css'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import store from './redux/store'
import { Provider } from 'react-redux'

ReactDOM.render(
  <Provider store={store}>
    <div className="wrapper">
      <App />
    </div>
  </Provider>,

  document.getElementById('root')
)

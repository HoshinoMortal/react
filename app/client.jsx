import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import '@config'
import Routes from '@configs/router.config.jsx'
import configure from '@middleware/configureStore'

const store = configure({ })
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <Provider store={store}>
    <Routes />
  </Provider>,
)

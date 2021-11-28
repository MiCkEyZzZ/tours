import React, { Suspense } from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import App from './App'
import './i18n'

import store from './store/store'

import './index.css'

const app = (
    <React.StrictMode>
      <Provider store={ store }>
        <Suspense fallback={<div>Loading...</div>}>
          <App />
        </Suspense>
      </Provider>
    </React.StrictMode>
)

ReactDOM.render(app, document.getElementById('root'))

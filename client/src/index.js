import './index.css'
import React            from 'react'
import ReactDOM         from 'react-dom'
import configureStore   from './app/state/configure-store'
import App              from './app/views/app/App'

const state = window.__INITIAL_STATE__ || {}
const store = configureStore(state)

const render = Component => {
  ReactDOM.render(
    <Component store={store} />,
    document.getElementById('root')
  )
}

render(App)

console.info(
  ' Launching...\n %cRICs FRUIT STORE%c',
  'font-size: 18px; font-weight: 400; font-family: HelveticaNeue, Arial, sans-serif;',
  ''
)

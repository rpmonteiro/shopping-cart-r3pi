import React          from 'react'
import { withRouter } from 'react-router-dom'
import Flash          from '../../../ui/flash/Flash'
import Menu           from './Menu'
import Shop           from '../../shop/Shop'


export function AppBody() {
  return (
    <div className="app">
      <Menu />
      <Flash />
      <div className="app-view">
        <Shop />
      </div>
    </div>
  )
}

export default withRouter(AppBody)

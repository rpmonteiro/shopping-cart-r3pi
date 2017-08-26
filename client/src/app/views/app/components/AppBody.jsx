import React from 'react'
import Flash from '../../../ui/flash/Flash'
import Menu  from './Menu'
import Shop  from '../../shop/Shop'
import Cart  from '../../cart/Cart'

import {
  withRouter,
  Redirect,
  Route
} from 'react-router-dom'


export function AppBody() {
  return (
    <div className="app">
      <Flash />
      <div className="app-body">
        <Menu />
        <Route exact path="/" render={() => <Redirect to="/shop"/>}/>
        <Route exact path="/shop" component={Shop} />
        <Route exact path="/cart" component={Cart} />
        {/* <Route exact path="/orders/edit/:id" component={Checkout} /> */}
      </div>
    </div>
  )
}

export default withRouter(AppBody)

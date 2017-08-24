import { combineReducers } from 'redux'
import cartReducer         from '../views/cart/state/reducer'
import shopReducer         from '../views/shop/state/reducer'

export default combineReducers({
  cart: cartReducer,
  shop: shopReducer
})

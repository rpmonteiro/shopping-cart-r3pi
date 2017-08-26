import { fromJS } from 'immutable'
import {
  UPDATE_CART
} from './actions'

const initialState = fromJS({
  items:  {},
  totals: {}
})


export default function reducer(state = initialState, action = {}) {
  switch (action.type) {

    case UPDATE_CART: {
      const { id, value } = action.data
      return state.setIn(['items', id], value)
    }

    default:
      return state

  }
}

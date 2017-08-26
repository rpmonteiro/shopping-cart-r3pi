import { fromJS } from 'immutable'
import {
  UPDATE_CART
} from './actions'

const initialState = fromJS({
  items: {}
})


export default function reducer(state = initialState, action = {}) {
  switch (action.type) {

    case UPDATE_CART: {
      const { id, add } = action.data
      let newItems = state.get('items')
      const count = parseInt(newItems.get(id) || '0')

      if (add) {
        newItems = newItems.set(id, count + 1)
      } else {
        const newCount = count <= 1 ? 0 : count - 1
        newItems = newItems.set(id, newCount)
      }

      return state.set('items', newItems)
    }

    default:
      return state

  }
}

import { fromJS } from 'immutable'

const initialState = fromJS({
  items: []
})


export default function reducer(state = initialState, action = {}) {
  switch (action.type) {

    default:
      return state

  }
}

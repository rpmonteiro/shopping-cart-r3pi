'use strict'

import { fromJS } from 'immutable'
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE
} from './actions'


const initialState = fromJS({
  token:     '',
  profile:   {},
  pending:   false,
  loggedIn:  false,
  error:     '',
  updatedAt: 0
})


export default function reducer(state = initialState, action = {}) {
  switch (action.type) {

    case LOGIN_REQUEST:
      return state.merge({
        pending:  true,
        loggedIn: false,
        profile:  {},
        error:    '',
        editing:  false
      })

    case LOGIN_SUCCESS:
      return state.merge({
        pending:   false,
        loggedIn:  true,
        profile:   action.data.get('profile'),
        token:     action.data.get('token'),
        error:     '',
        editing:   false,
        updatedAt: Date.now()
      })

    case LOGIN_FAILURE:
      return state.merge({
        pending:  false,
        loggedIn: false,
        profile:  {},
        error:    action.data,
        editing:  false
      })


    default:
      return state

  }
}

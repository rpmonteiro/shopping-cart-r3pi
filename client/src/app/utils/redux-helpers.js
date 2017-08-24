'use strict'

import fetch                          from 'isomorphic-fetch'
import settings                       from 'config/settings'
import { checkHttpStatus, parseJSON } from 'utils/helpers'
import { flashMessage }               from 'ui/popups/popups-redux'

export function action(type, data) {
  return { type, data }
}

export function thunk({endpoint, method, body, onReq, onErr, onSuccess}) {
  return (dispatch, getState) => {
    const url     = `${settings.apiServer}/${endpoint}`
    const token   = getState().user.get('token')
    const options = {
      method,
      headers: {
        Authorization:  `Bearer ${token}`,
        Accept:         'application/json',
        'Content-Type': 'application/json'
      }
    }

    if (body) {
      options.body = JSON.stringify(body)
    }

    dispatch(onReq())

    return fetch(url, options)
      .then(checkHttpStatus)
      .then(parseJSON)
      .catch(err => {
        dispatch(flashMessage(err.response.statusText, 'error'))
        dispatch(onErr(err))
      })
      .then(res => {
        res.message ? dispatch(flashMessage(res.message, 'success')) : ''
        dispatch(onSuccess(res.data))
      })
  }
}

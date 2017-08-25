import settings          from '../../../config/settings'
import { getCookie }     from '../../../utils/cookies'
import { thunk, action } from '../../../utils/redux-helpers'


export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'


export const loginRequest = ()   => action(LOGIN_REQUEST)
export const loginSuccess = data => action(LOGIN_SUCCESS, data)
export const loginFailure = err  => action(LOGIN_FAILURE, err.statusText)


export const login = data => thunk({
  endpoint:  'login',
  method:    'post',
  body:      data,
  onReq:     loginRequest,
  onErr:     loginFailure,
  onSuccess: loginSuccess
})


export function autoLoginUser() {
  return dispatch => {
    const token = getCookie(settings.jwtKey)

    if (!token) {
      return false
    }

    dispatch(login)
  }
}

import { action } from '../../../utils/redux-helpers'

export const UPDATE_CART = 'UPDATE_CART'

export const updateCart = (id, add) => action(UPDATE_CART, {id, add})

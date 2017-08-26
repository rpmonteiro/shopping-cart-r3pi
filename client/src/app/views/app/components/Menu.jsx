import React    from 'react'
import CartIcon from '../../cart/components/CartIcon'
import { Link } from 'react-router-dom'

export default function Menu() {
  return (
    <div className="menu">
      <Link to="/shop">Shop</Link>
      <CartIcon />
    </div>
  )
}

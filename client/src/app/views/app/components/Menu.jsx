import React    from 'react'
import { Link } from 'react-router-dom'

export default function Menu() {
  return (
    <div className="menu">
      <Link to="/orders">Orders</Link>
      <Link to="/products">Products</Link>
    </div>
  )
}

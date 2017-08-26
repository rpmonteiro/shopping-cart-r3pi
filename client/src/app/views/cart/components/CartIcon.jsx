import React       from 'react'
import { connect } from 'react-redux'
import PropTypes   from 'prop-types'
import { Link }    from 'react-router-dom'

CartIcon.propTypes = {
  count: PropTypes.number.isRequired
}

export function CartIcon({count}) {
  console.log('CartIcon', count)
  return (
    <Link to="/cart">
      <div className="cart-icon">
        <i className="icon">shopping_cart</i>
        <span className="cart-count">{count}</span>
      </div>
    </Link>
  )
}


const mapStateToProps = (state) => {
  const items = state.cart.get('items')
  const count = items.reduce((acc, val) => acc + val, 0)
  return { count }
}

export default connect(mapStateToProps)(CartIcon)

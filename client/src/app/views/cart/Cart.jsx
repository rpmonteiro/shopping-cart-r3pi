import React, { PureComponent } from 'react'
import { connect }              from 'react-redux'
import PropTypes                from 'prop-types'
import settings                 from '../../config/settings'
import { Map }                  from 'immutable'
import TableList                from '../../ui/table/TableList'
import {
  deleteCartItem,
  updateCart,
  getTotals
} from './state/actions'

const COLUMNS = [
  { value: '',              class: 'image' },
  { value: 'Product title', class: 'normal' },
  { value: 'Price',         class: 'small' },
  { value: 'Quantity',      class: 'small' },
  { value: 'Savings',       class: 'small' },
  { value: 'Total',         class: 'small' }
]

const ROW_DATA = [
  { key: 'image', component: 'image' },
  { key: 'title' },
  { key: 'price' },
  { key: 'qty',   component: 'input', data: { type: 'number', min: '0' } },
  { key: 'savings' },
  { key: 'total' }
]


export class Cart extends PureComponent {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    totals:   PropTypes.object.isRequired,
    products: PropTypes.object.isRequired,
    cart:     PropTypes.object.isRequired
  }


  componentWillMount() {
    const { dispatch, cart } = this.props
    if (cart.size) {
      dispatch(getTotals(cart))
    }
  }


  componentWillReceiveProps(nextProps) {
    const { dispatch, cart } = this.props
    const newCart = cart !== nextProps.cart

    if (newCart) {
      dispatch(getTotals(nextProps.cart))
    }
  }


  cellHandler = ({id, k, v}) => {
    const { dispatch } = this.props

    if (k === 'qty') {
      dispatch(updateCart(id, parseInt(v)))
    }
  }


  deleteHandler = e => {
    const { id } = e.target.dataset
    this.props.dispatch(deleteCartItem(id))
  }


  render() {
    const { products, cart, totals } = this.props

    let view
    if (!cart.size) {
      view = <div className="empty-cart">Your cart is empty</div>
    } else {
      const cartItems = products
        .filter(p => cart.get(p.get('id')) !== undefined)
        .map(p => {
          const id = p.get('id')
          return Map({
            id,
            image:   p.getIn(['images', 0]),
            title:   p.get('title'),
            price:   p.get('price'),
            qty:     cart.get(id),
            savings: totals.getIn(['items', id.toString(), 'savings']) || 0,
            total:   totals.getIn(['items', id.toString(), 'total'])
          })
        })

      view = (
        <div className="cart-view">
          <TableList
            items={cartItems}
            className="cart-items-list"
            deleteHandler={this.deleteHandler}
            cellHandler={this.cellHandler}
            columns={COLUMNS}
            rowData={ROW_DATA}
          />
          <div className="cart-total-price">
            Total price:
            <span>{settings.currency} {totals.get('order')}</span>
          </div>
          <button className="btn btn-primary">Pay</button>
        </div>
      )
    }

    return view
  }

}


const mapStateToProps = (state) => {
  return {
    products: state.shop.get('products'),
    totals:   state.cart.get('totals'),
    cart:     state.cart.get('items')
  }
}

export default connect(mapStateToProps)(Cart)

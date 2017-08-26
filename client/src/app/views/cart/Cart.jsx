import React, { PureComponent } from 'react'
import { connect }              from 'react-redux'
import PropTypes                from 'prop-types'
import { Map }                  from 'immutable'
import TableList                from '../../ui/table/TableList'
import {
  deleteCartItem,
  updateCart,
  getTotals
} from './state/actions'

const COLUMNS = [
  { value: 'Image',   class: 'image' },
  { value: 'Title',   class: 'normal' },
  { value: 'Price',   class: 'small' },
  { value: 'Qty',     class: 'small' },
  { value: 'Savings', class: 'small' },
  { value: 'Total',   class: 'small' }
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


  cellHandler = ({id, k, v}) => {
    const { dispatch, cart } = this.props

    if (k === 'qty') {
      const value = v
      dispatch(updateCart(id, value))

      if (parseInt(value) > 0) {
        dispatch(getTotals(cart))
      }
    }
  }


  deleteHandler = e => {
    const { id } = e.target.dataset
    this.props.dispatch(deleteCartItem(id))
  }


  render() {
    const { products, cart, totals } = this.props

    // if (!totals) {
    //   return null
    // }
    console.log('cart', cart.toJS())
    const cartItems = products.filter(p => cart.get(p.get('id')) !== undefined)
      .map(p => {
        const id = p.get('id')
        return Map({
          id,
          image:   p.getIn(['images', 0]),
          title:   p.get('title'),
          price:   p.get('price'),
          qty:     cart.get(id),
          savings: totals.getIn([id, 'savings']) || 0,
          total:   totals.getIn([id, 'total'])
        })
      })
      console.log('cartItems', cartItems.toJS())
    return (
      <div>
        <TableList
          items={cartItems}
          className="cart-items-list"
          deleteHandler={this.deleteHandler}
          cellHandler={this.cellHandler}
          columns={COLUMNS}
          rowData={ROW_DATA}
        />
      </div>
    )
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

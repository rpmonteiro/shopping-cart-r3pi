import React, { PureComponent } from 'react'
import PropTypes                from 'prop-types'
import { connect }              from 'react-redux'
import { updateCart }           from '../state/actions'


export default function AddToCartHOC(Product) {
  class CartWidget extends PureComponent {

    static propTypes = {
      id:       PropTypes.number.isRequired,
      items:    PropTypes.object.isRequired,
      dispatch: PropTypes.func.isRequired
    }


    state = {
      active: false,
      count:  0
    }


    componentWillMount() {
      this.populateState()
    }


    componentWillReceiveProps(nextProps) {
      if (this.props.items !== nextProps.items) {
        this.populateState(nextProps)
      }
    }


    populateState = (props = this.props) => {
      const { id, items } = props
      const count = items.get(id)

      this.setState({
        active: count > 0 ? true : false,
        count:  count || 0
      })
    }


    updateCart = e => {
      const { id, dispatch } = this.props
      const { add } = e.target.dataset

      dispatch(updateCart(id, add))
    }


    cartBtn = (text, add) => {
      return (
        <button
          data-add={add}
          onClick={this.updateCart}
          className="btn btn-qty">
          {text}
        </button>
      )
    }

    render() {
      const { active, count } = this.state

      console.log({id: this.props.id, active, count})

      let widget
      if (active) {
        const btnRow = (
          <div className="cart-qty-row">
            {this.cartBtn('-')}
            {count}
            {this.cartBtn('+', true)}
          </div>
        )

        const basketInfo = (
          <div className="cart-info">
            <i className="material-icons md-18">shopping_cart</i>
            <span>{count} in basket</span>
          </div>
        )

        widget = (
          <div className="cart-widget">
            {btnRow}
            {basketInfo}
          </div>
        )

      } else {
        widget = this.cartBtn('Add', true)
      }

      return (
        <div>
          <Product {...this.props} />
          {widget}
        </div>
      )
    }

  }


  const mapStateToProps = (state) => {
    return {
      items: state.cart.get('items')
    }
  }

  return connect(mapStateToProps)(CartWidget)
}

import React, { Component } from 'react'
import { connect }          from 'react-redux'
import PropTypes            from 'prop-types'
import ProductsList         from './components/ProductsList'
import { getProducts }      from './state/shop-redux'


export class Shop extends Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    products: PropTypes.object.isRequired
  }


  componentWillMount() {
    this.props.dispatch(getProducts())
  }

  state = {

  }

  render() {
    const { products } = this.props

    if (!products.size) {
      return null
    }

    return (
      <section className="shop">
        <h4>{'Ric\'s fruit shop'}</h4>
        <ProductsList products={products} />
      </section>
    )
  }

}


const mapStateToProps = state => {
  return {
    products: state.shop.get('products')
  }
}

export default connect(mapStateToProps)(Shop)

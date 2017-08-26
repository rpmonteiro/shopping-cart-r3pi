import React, { PureComponent } from 'react'
import PropTypes                from 'prop-types'
import ProductRow               from './ProductRow'


export default class ProductsList extends PureComponent {

  static propTypes = {
    products: PropTypes.object.isRequired
  }

  render() {
    const { products } = this.props

    const productRows = products.map((p, idx) => <ProductRow key={`p-${idx}`} product={p} />)

    return (
      <div className="products-list">
        {productRows}
      </div>
    )
  }

}

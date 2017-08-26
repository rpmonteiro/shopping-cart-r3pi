import React     from 'react'
import PropTypes from 'prop-types'

const bananaImg = 'https://i5.walmartimages.ca/images/Enlarge/580/6_r/875806_R.jpg'

ProductRow.propTypes = {
  product: PropTypes.object.isRequired
}


export default function ProductRow({product}) {

  return (
    <div className="product-row">
      <img src={bananaImg} />
      <div className="product-name">{product.get('name')}</div>
      <div className="product-body">{product.get('body')}</div>
      <div className="product-price">{product.get('price')}</div>
    </div>
  )
}

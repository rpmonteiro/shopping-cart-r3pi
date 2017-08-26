import React        from 'react'
import PropTypes    from 'prop-types'
import settings     from '../../../config/settings'

const bananaImg = 'https://i5.walmartimages.ca/images/Enlarge/580/6_r/875806_R.jpg'

ProductRow.propTypes = {
  product: PropTypes.object.isRequired
}


export default function ProductRow({product}) {

  let promotion
  if (product.get('promotion')) {
    promotion = <div className="product-promotion">{product.get('promotion')}</div>
  }

  return (
    <div className="product-row">
      <div className="slider">
        <img src={bananaImg} />
      </div>
      <div className="details">
        <div className="product-title">{product.get('title')}</div>
        <div className="product-description">{product.get('description')}</div>
        <div className="product-price">{settings.currency} {product.get('price')}</div>
        {promotion}
      </div>
    </div>
  )
}

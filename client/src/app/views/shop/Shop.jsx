import React, { Component } from 'react'
import { connect }          from 'react-redux'
import PropTypes            from 'prop-types'
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
    console.log('products', this.props.products)
    return (
      <div>

      </div>
    )
  }

}


const mapStateToProps = state => {
  return {
    products: state.shop.get('products')
  }
}

export default connect(mapStateToProps)(Shop)

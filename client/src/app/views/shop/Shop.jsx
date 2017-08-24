import React, { Component } from 'react'
import { connect }          from 'react-redux'
import PropTypes            from 'prop-types'


export class Shop extends Component {

  static propTypes = {
    items: PropTypes.object.isRequired
  }

  state = {

  }

  render() {
    return (
      <div>

      </div>
    )
  }

}


const mapStateToProps = state => {
  return {
    items: state.shop.get('items')
  }
}

export default connect(mapStateToProps)(Shop)

import React, { Component }            from 'react'
import PropTypes                       from 'prop-types'
import { Provider }                    from 'react-redux'
import { HashRouter as Router, Route } from 'react-router-dom'
import AuthRoute                       from './components/AuthRoute'
import AppBody                         from './components/AppBody'
import { autoLoginUser }               from '../user/state/actions'
import LoginView                       from '../user/LoginView'
import CSSTransition                   from 'react-transition-group/CSSTransition'

const Fade = ({ children, ...props }) => (
  <CSSTransition
    {...props}
    timeout={500}
    classNames="fade"
  >
    {children}
  </CSSTransition>
)

export default class App extends Component {

  static propTypes = {
    store: PropTypes.object
  }


  componentWillMount() {
    this.props.store.dispatch(autoLoginUser())
  }


  authHandler = () => {
    const { store } = this.props
    const state = store.getState()

    let redirectTo = ''
    if (!state.user.get('loggedIn') && state.user.get('status') !== 'success') {
      redirectTo = window.location.hash
        ? `${window.location.hash}`.replace(/#/, '')
        : window.location.pathname
    }

    return redirectTo
  }


  render() {
    const { store } = this.props

    return (
      <Fade>
        <Provider store={store}>
          <Router>
            <div className="app-container">
              <Route path="/login" component={LoginView} />
              <AuthRoute authPath="/login" authHandler={this.authHandler} component={AppBody} />
            </div>
          </Router>
        </Provider>
      </Fade>
    )
  }

}

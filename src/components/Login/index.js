import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import NxtWatchContext from '../../context/NxtWatchContext'

import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    showSubmitError: false,
    errorMsg: '',
    showPass: false,
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onToggleShowPass = () => {
    this.setState(prevState => ({
      showPass: !prevState.showPass,
    }))
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
      path: '/',
    })
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  renderPasswordField = () => {
    const {password, showPass} = this.state
    return (
      <>
        <label className="input-label" htmlFor="password">
          PASSWORD <span>(rahul@2021)</span>
        </label>
        <input
          type={showPass ? 'text' : 'password'}
          id="password"
          className="login-input-field"
          value={password}
          placeholder="Password"
          onChange={this.onChangePassword}
        />
        <div className="row-container">
          <input
            type="checkbox"
            id="showPassword"
            onChange={this.onToggleShowPass}
          />
          <label htmlFor="showPassword" className="input-label">
            Show Password
          </label>
        </div>
      </>
    )
  }

  renderUsernameField = () => {
    const {username} = this.state
    return (
      <>
        <label className="input-label" htmlFor="username">
          USERNAME <span>(rahul)</span>
        </label>
        <input
          type="text"
          id="username"
          className="login-input-field"
          value={username}
          placeholder="Username"
          onChange={this.onChangeUsername}
        />
      </>
    )
  }

  render() {
    const {showSubmitError, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <NxtWatchContext.Consumer>
        {value => {
          const {darkTheme} = value
          const darkLogin = darkTheme
            ? 'dark-login-form-container'
            : 'login-form-container'
          const darkForm = darkTheme ? 'dark-form-container' : 'form-container'
          const websiteLogo = darkTheme
            ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
            : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'

          return (
            <div className={darkLogin}>
              <form className={darkForm} onSubmit={this.submitForm}>
                <img
                  src={websiteLogo}
                  className="login-website-logo"
                  alt="website logo"
                />
                <div className="input-container">
                  {this.renderUsernameField()}
                </div>
                <div className="input-container">
                  {this.renderPasswordField()}
                </div>
                <button type="submit" className="login-button">
                  Login
                </button>
                {showSubmitError && (
                  <p className="error-message">*{errorMsg}</p>
                )}
              </form>
            </div>
          )
        }}
      </NxtWatchContext.Consumer>
    )
  }
}

export default Login

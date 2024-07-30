import './index.css'

import {Component} from 'react'

import Cookies from 'js-cookie'

import {Redirect} from 'react-router-dom'

class Login extends Component {
  state = {username: '', password: '', errorMsg: '', showErrorMsg: false}

  changeUsername = event => {
    this.setState({username: event.target.value})
  }

  changePassword = event => {
    this.setState({password: event.target.value})
  }

  submitLoginForm = async event => {
    event.preventDefault()
    const loginApiUrl = 'https://apis.ccbp.in/login'
    const {username, password} = this.state
    const userDetails = {username, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(loginApiUrl, options)
    const jsonResponse = await response.json()
    if (response.ok) {
      const {history} = this.props
      Cookies.set('jwt_token', jsonResponse.jwt_token, {expires: 2})
      history.replace('/')
      this.setState({showErrorMsg: false})
    } else {
      this.setState({showErrorMsg: true, errorMsg: jsonResponse.error_msg})
    }
  }

  render() {
    const {username, password, errorMsg, showErrorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-page-bg">
        <form className="login-box" onSubmit={this.submitLoginForm}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="login-logo"
          />
          <br />
          <label htmlFor="username" className="login-label">
            USERNAME
          </label>

          <input
            id="username"
            className="login-input"
            onChange={this.changeUsername}
            value={username}
          />

          <br />

          <label htmlFor="password" className="login-label">
            PASSWORD
          </label>

          <input
            id="password"
            className="login-input"
            type="password"
            onChange={this.changePassword}
            value={password}
          />

          <br />
          <button type="submit" className="login-button">
            Login
          </button>
          {showErrorMsg && <p className="login-error-msg">*{errorMsg}</p>}
        </form>
      </div>
    )
  }
}

export default Login

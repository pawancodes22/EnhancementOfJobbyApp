import {Link, withRouter} from 'react-router-dom'

import {IoMdHome} from 'react-icons/io'

import {FaBriefcase} from 'react-icons/fa'

import {FiLogOut} from 'react-icons/fi'

import Cookies from 'js-cookie'

import './index.css'

const Header = props => {
  const logOut = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }
  return (
    <>
      <div className="home-lg-nav-bg">
        <Link to="/" className="link-style">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="home-website-logo"
          />
        </Link>
        <ul className="nav-buttons">
          <li>
            <Link to="/" className="link-style">
              Home
            </Link>
          </li>
          <li>
            <Link to="/jobs" className="link-style">
              Jobs
            </Link>
          </li>
        </ul>
        <button type="button" className="logout-button" onClick={logOut}>
          Logout
        </button>
      </div>
      <div className="home-sm-nav-bg">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
          className="home-sm-website-logo"
        />
        <ul className="nav-buttons sm-nav-buttons">
          <li>
            <Link to="/" className="link-style">
              <IoMdHome className="sm-icon-size" />
            </Link>
          </li>
          <li>
            <Link to="/jobs" className="link-style">
              <FaBriefcase className="sm-icon-size" />
            </Link>
          </li>
          <li>
            {/* eslint-disable-next-line */}
            <button
              type="button"
              className="remove-signs-of-button"
              onClick={logOut}
            >
              <FiLogOut className="sm-icon-size" />
            </button>
          </li>
        </ul>
      </div>
    </>
  )
}

export default withRouter(Header)

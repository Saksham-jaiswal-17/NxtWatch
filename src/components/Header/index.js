import {withRouter, Link} from 'react-router-dom'
import {FaMoon, FaFire} from 'react-icons/fa'
import {IoSunnyOutline, IoHomeSharp, IoMenuOutline} from 'react-icons/io5'

import {IoIosSave} from 'react-icons/io'
import {SiYoutubegaming} from 'react-icons/si'
import Cookies from 'js-cookie'
import Popup from 'reactjs-popup'
import NxtWatchContext from '../../context/NxtWatchContext'

import 'reactjs-popup/dist/index.css'

import './index.css'

const Header = props => {
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }
  return (
    <NxtWatchContext.Consumer>
      {value => {
        const {darkTheme, onChangeTheme, currentPath, onchangePath} = value
        const sun = darkTheme ? 'sun-icon' : 'hide'
        const moon = darkTheme ? 'hide' : 'moon-icon'
        const navContainer = darkTheme ? 'dark-nav-container' : 'nav-content'
        const navContainerMobile = darkTheme
          ? 'dark-nav-menu-mobile'
          : 'nav-menu-mobile'
        const sidebarListItem = darkTheme ? 'white-list' : 'dark-list'
        const popupContainer = darkTheme ? 'dark-logout-popup' : 'logout-popup'
        const ulTheme = darkTheme ? 'dark-bg' : 'light-bg'
        const websiteLogo = darkTheme
          ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
          : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
        const changeTheme = () => {
          onChangeTheme(!darkTheme)
        }
        const closeBtn = darkTheme ? 'blackClose' : 'whiteClose'

        const HomeCurrent = currentPath === 'Home' ? 'hightLight' : ''
        const TrendingCurrent = currentPath === 'Trending' ? 'hightLight' : ''
        const GamingCurrent = currentPath === 'Gaming' ? 'hightLight' : ''
        const SavedCurrent = currentPath === 'Saved' ? 'hightLight' : ''
        const onClickTrending = () => {
          onchangePath('Trending')
        }
        const onClickHome = () => {
          onchangePath('Home')
        }
        const onClickGaming = () => {
          onchangePath('Gaming')
        }
        const onClickSaved = () => {
          onchangePath('Saved')
        }

        return (
          <nav className="nav-header">
            <div className={navContainer}>
              <Link to="/">
                <img
                  className="website-logo"
                  src={websiteLogo}
                  alt="website logo"
                />
              </Link>
              <div className="center-container">
                <FaMoon onClick={changeTheme} className={moon} />

                <IoSunnyOutline className={sun} onClick={changeTheme} />

                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
                  alt="profile"
                  className="profile-logo"
                />

                <Popup
                  modal
                  trigger={
                    <button
                      type="button"
                      className="trigger-button logout-desktop-btn"
                    >
                      Logout
                    </button>
                  }
                  className="popup-content"
                >
                  {close => (
                    <>
                      <div className={popupContainer}>
                        <p>Are you sure, you want to logout</p>
                        <div className="row-container-popup-btn">
                          <button
                            type="button"
                            className="trigger-button logout-cancel "
                            onClick={() => close()}
                          >
                            Cancel
                          </button>
                          <button
                            type="button"
                            className="trigger-button logout-confirm"
                            onClick={onClickLogout}
                          >
                            Confirm
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </Popup>
              </div>
            </div>
            <div className={navContainerMobile}>
              <Link to="/">
                <img
                  className="website-logo"
                  src={websiteLogo}
                  alt="website logo"
                />
              </Link>
              <div className="center-container">
                <FaMoon onClick={changeTheme} className={moon} />

                <IoSunnyOutline className={sun} onClick={changeTheme} />

                <Popup
                  modal
                  trigger={
                    <button type="button" className="trigger-button logo-btn">
                      <IoMenuOutline className="header-menu-icon" />.
                    </button>
                  }
                  className="popup-content"
                >
                  {close => (
                    <div className={ulTheme}>
                      <button
                        type="button"
                        className={closeBtn}
                        onClick={() => close()}
                      >
                        X
                      </button>
                      <ul>
                        <Link to="/" className="link">
                          <li
                            onClick={onClickHome}
                            className={(sidebarListItem, HomeCurrent)}
                          >
                            {' '}
                            <IoHomeSharp /> &nbsp; Home
                          </li>
                        </Link>
                        <Link to="/trending" className="link">
                          <li
                            onClick={onClickTrending}
                            className={(sidebarListItem, TrendingCurrent)}
                          >
                            <FaFire />
                            &nbsp; Trending
                          </li>
                        </Link>
                        <Link to="/gaming" className="link">
                          <li
                            onClick={onClickGaming}
                            className={(sidebarListItem, GamingCurrent)}
                          >
                            {' '}
                            <SiYoutubegaming /> &nbsp; Gaming
                          </li>
                        </Link>
                        <Link to="/saved-videos" className="link">
                          <li
                            onClick={onClickSaved}
                            className={(sidebarListItem, SavedCurrent)}
                          >
                            {' '}
                            <IoIosSave /> &nbsp; Saved videos
                          </li>
                        </Link>
                      </ul>
                    </div>
                  )}
                </Popup>

                <Popup
                  modal
                  trigger={
                    <button
                      type="button"
                      className="trigger-button logout-mobile-btn"
                    >
                      <img
                        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-log-out-img.png"
                        alt="logout icon"
                        className="logout-icon"
                      />
                    </button>
                  }
                >
                  {close => (
                    <>
                      <div className={popupContainer}>
                        <p>Are you sure, you want to logout</p>
                        <div className="row-container-popup-btn">
                          <button
                            type="button"
                            className="trigger-button logout-cancel "
                            onClick={() => close()}
                          >
                            Cancel
                          </button>
                          <button
                            type="button"
                            className="trigger-button logout-confirm"
                            onClick={onClickLogout}
                          >
                            Confirm
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </Popup>
              </div>
            </div>
          </nav>
        )
      }}
    </NxtWatchContext.Consumer>
  )
}
export default withRouter(Header)

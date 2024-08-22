import {Link} from 'react-router-dom'
import {IoIosSave} from 'react-icons/io'
import {SiYoutubegaming} from 'react-icons/si'
import {IoHomeSharp} from 'react-icons/io5'
import {FaFire} from 'react-icons/fa'
import NxtWatchContext from '../../context/NxtWatchContext'

import './index.css'

const SideBar = () => (
  <NxtWatchContext.Consumer>
    {value => {
      const {darkTheme, currentPath, onchangePath} = value
      const sidebarListItem = darkTheme ? 'white-list' : 'dark-list'
      const sidebarContainer = darkTheme
        ? 'dark-SideBar-container'
        : 'SideBar-container'
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
        <div className={sidebarContainer}>
          <ul className="sidebar-options">
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
            <Link onClick={onClickGaming} to="/gaming" className="link">
              <li className={(sidebarListItem, GamingCurrent)}>
                {' '}
                <SiYoutubegaming /> &nbsp; Gaming
              </li>
            </Link>
            <Link onClick={onClickSaved} to="/saved-videos" className="link">
              <li className={(sidebarListItem, SavedCurrent)}>
                {' '}
                <IoIosSave /> &nbsp; Saved videos
              </li>
            </Link>
          </ul>
          <div>
            <p className="contact-us">CONTACT US</p>
            <div>
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
                alt="facebook logo"
                className="social-logo"
              />
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
                alt="twitter logo"
                className="social-logo"
              />
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
                alt="linked in logo"
                className="social-logo"
              />
            </div>
            <p>Enjoy! Now to see your channels and recommendations!</p>
          </div>
        </div>
      )
    }}
  </NxtWatchContext.Consumer>
)
export default SideBar

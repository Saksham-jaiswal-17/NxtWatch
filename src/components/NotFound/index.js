import NxtWatchContext from '../../context/NxtWatchContext'

import './index.css'

const NotFound = () => (
  <NxtWatchContext.Consumer>
    {value => {
      const {darkTheme} = value
      const notFoundImg = darkTheme
        ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-dark-theme-img.png'
        : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png'
      const notFoundBg = darkTheme
        ? 'dark-not-found-container'
        : 'not-found-container'
      return (
        <div className={notFoundBg}>
          <img src={notFoundImg} alt="not found" className="not-found-img" />
          <h1>Page Not Found</h1>
          <p>we are sorry, the page you requested could not be found.</p>
        </div>
      )
    }}
  </NxtWatchContext.Consumer>
)

export default NotFound

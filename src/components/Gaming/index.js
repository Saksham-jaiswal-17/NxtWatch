import Loader from 'react-loader-spinner'
import {Component} from 'react'
import {SiYoutubegaming} from 'react-icons/si'
import Cookies from 'js-cookie'
import GamingVideoCard from '../GamingVideoCard/index'
import SideBar from '../SideBar/index'
import Header from '../Header/index'
import NxtWatchContext from '../../context/NxtWatchContext'

import './index.css'

class Gaming extends Component {
  state = {
    videoListStatus: 'INITIAL',
    videoList: [],
  }

  componentDidMount() {
    this.gamingVideosApiUrl()
  }

  gamingVideosApiUrl = async () => {
    this.setState({videoListStatus: 'INITIAL'})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/videos/gaming'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const formatData = data.videos.map(each => ({
        id: each.id,
        title: each.title,
        thumbnailUrl: each.thumbnail_url,
        viewCount: each.view_count,
      }))
      this.setState({videoList: formatData, videoListStatus: 'SUCCESS'})
    } else {
      this.setState({videoListStatus: 'FAILURE'})
    }
  }

  onClickRetry = () => {
    this.gamingVideosApiUrl()
  }

  renderLoading = () => (
    <div
      data-testid="loader"
      className="products-loader-container center-container"
    >
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <NxtWatchContext.Consumer>
      {value => {
        const {darkTheme} = value
        const failureContainer = darkTheme
          ? 'dark-column-center-container'
          : 'column-center-container'
        return (
          <div className={failureContainer}>
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
              alt="failure view"
              className="failure-img"
            />
            <h1 className="failure-heading">Oops! Something Went Wrong</h1>
            <p className="failure-description">
              We are having some trouble to complete your request .
              <br />
              Please try again.
            </p>
            <button
              onClick={this.onClickRetry}
              className="retry-btn"
              type="button"
            >
              Retry
            </button>
          </div>
        )
      }}
    </NxtWatchContext.Consumer>
  )

  renderSuccessView = () => {
    const {videoList} = this.state

    return (
      <NxtWatchContext.Consumer>
        {value => {
          const {darkTheme} = value
          const trendingBannerSection = darkTheme
            ? 'dark-trending-banner-section'
            : 'trending-banner-section'
          const trendingIconBox = darkTheme
            ? 'dark-trending-icon-box'
            : 'trending-icon-box'
          const trendingVideoList = darkTheme
            ? 'dark-gaming-video-list-container'
            : 'gaming-video-list-container'
          return (
            <>
              <div className={trendingBannerSection}>
                <div className={trendingIconBox}>
                  <SiYoutubegaming className="trending-icon" />
                </div>
                <h1>Gaming</h1>
              </div>
              <ul className={trendingVideoList}>
                {videoList.map(each => (
                  <GamingVideoCard details={each} key={each.id} />
                ))}
              </ul>
            </>
          )
        }}
      </NxtWatchContext.Consumer>
    )
  }

  renderVideos = () => {
    const {videoListStatus} = this.state
    switch (videoListStatus) {
      case 'INITIAL':
        return this.renderLoading()
      case 'SUCCESS':
        return this.renderSuccessView()
      case 'FAILURE':
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <NxtWatchContext.Consumer>
        {value => {
          const {darkTheme} = value
          const darkThemeBg = darkTheme
            ? 'dark-trending-container'
            : 'trending-container'
          return (
            <>
              <Header />
              <div className="row-container">
                <SideBar />
                <div className={darkThemeBg}>{this.renderVideos()}</div>
              </div>
            </>
          )
        }}
      </NxtWatchContext.Consumer>
    )
  }
}
export default Gaming

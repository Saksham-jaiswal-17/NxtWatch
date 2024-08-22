import Loader from 'react-loader-spinner'
import {Component} from 'react'
import {IoIosSearch} from 'react-icons/io'
import Cookies from 'js-cookie'
import VideoCard from '../VideoCard/index'
import SideBar from '../SideBar/index'
import Header from '../Header/index'
import NxtWatchContext from '../../context/NxtWatchContext'
import './index.css'

class Home extends Component {
  state = {
    showBanner: true,
    serach: '',
    videoListStatus: 'INITIAL',
    videoList: [],
  }

  componentDidMount() {
    this.homeVideosApiUrl()
  }

  homeVideosApiUrl = async () => {
    this.setState({videoListStatus: 'INITIAL'})
    const {serach} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/videos/all?search=${serach}`
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
        channel: {
          name: each.channel.name,
          profileImageUrl: each.channel.profile_image_url,
        },
        viewCount: each.view_count,
        publishedAt: each.published_at,
      }))
      this.setState({
        videoList: formatData,
        videoListStatus: 'SUCCESS',
        serach: '',
      })
    } else {
      this.setState({videoListStatus: 'FAILURE', serach: ''})
    }
  }

  onClickBannerClose = () => {
    this.setState({showBanner: false})
  }

  onChangeSearch = event => {
    this.setState({serach: event.target.value})
  }

  onClickSearch = () => {
    this.homeVideosApiUrl()
  }

  onClickRetry = () => {
    this.homeVideosApiUrl()
  }

  bannerSection = () => {
    const {showBanner} = this.state
    const showBannerCss = showBanner ? 'banner-background' : 'hide'
    return (
      <div className={showBannerCss} data-testid="banner">
        <div className="column-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
            alt="nxt watch logo"
            className="website-logo2"
          />
          <p>Buy Nxt Watch Premium prepaid plans with UPI</p>
          <button className="get-it-btn" type="button">
            GET IT NOW
          </button>
        </div>
        <div>
          <button
            className="close-btn"
            type="button"
            onClick={this.onClickBannerClose}
            data-testid="close"
          >
            X
          </button>
        </div>
      </div>
    )
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
    <div className="column-center-container">
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
      <button onClick={this.onClickRetry} className="retry-btn" type="button">
        Retry
      </button>
    </div>
  )

  renderSuccessView = () => {
    const {videoList} = this.state
    if (videoList.length < 1) {
      return (
        <div className="column-center-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
            alt="no videos"
            className="failure-img"
          />
          <h1 className="failure-heading">No Search results found</h1>
          <p className="failure-description">
            Try different key words or remove search filter
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
    }
    return (
      <ul className="video-list-container">
        {videoList.map(each => (
          <VideoCard details={each} key={each.id} />
        ))}
      </ul>
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
    const {serach} = this.state
    return (
      <NxtWatchContext.Consumer>
        {value => {
          const {darkTheme} = value
          const homeVideoContainer = darkTheme
            ? 'dark-home-video-container'
            : 'home-video-container'
          const searchContainer = darkTheme
            ? 'dark-search-container'
            : 'light-search-container'
          const search = darkTheme ? 'dark-search' : 'light-search'
          return (
            <>
              <Header />
              <div className="row-container">
                <SideBar />
                <div className="home-container">
                  {this.bannerSection()}
                  <div className={homeVideoContainer}>
                    <div className={searchContainer}>
                      <input
                        value={serach}
                        type="search"
                        placeholder="search"
                        className={search}
                        onChange={this.onChangeSearch}
                      />

                      <IoIosSearch
                        onClick={this.onClickSearch}
                        className="search-logo"
                      />
                    </div>
                    {this.renderVideos()}
                  </div>
                </div>
              </div>
            </>
          )
        }}
      </NxtWatchContext.Consumer>
    )
  }
}
export default Home

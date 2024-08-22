import Loader from 'react-loader-spinner'
import {Component} from 'react'
import {BiLike, BiDislike} from 'react-icons/bi'

import {IoIosSave} from 'react-icons/io'
import {BsDot} from 'react-icons/bs'

import Cookies from 'js-cookie'
import {formatDistanceToNow} from 'date-fns'
import ReactPlayer from 'react-player'
import SideBar from '../SideBar/index'
import Header from '../Header/index'
import NxtWatchContext from '../../context/NxtWatchContext'

import './index.css'

class VideoItemDetails extends Component {
  state = {
    videoListStatus: 'INITIAL',
    videoDetail: [],
    isLike: false,
    isDisLike: false,
    isSave: false,
  }

  componentDidMount() {
    this.videoListApi()
  }

  videoListApi = async () => {
    this.setState({videoListStatus: 'INITIAL'})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/videos/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const each = data.video_details
      const formatData = {
        id: each.id,
        title: each.title,
        thumbnailUrl: each.thumbnail_url,
        videoUrl: each.video_url,
        channel: {
          name: each.channel.name,
          profileImageUrl: each.channel.profile_image_url,
          subscriberCount: each.channel.subscriber_count,
        },
        viewCount: each.view_count,
        publishedAt: each.published_at,
        description: each.description,
      }
      this.setState({videoDetail: formatData, videoListStatus: 'SUCCESS'})
    } else {
      this.setState({videoListStatus: 'FAILURE'})
    }
  }

  renderLoading = () => (
    <div className="products-loader-container center-container">
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
              We are having some trouble to complete your request. Please try
              again.
            </p>
            <button className="retry-btn" type="button">
              Retry
            </button>
          </div>
        )
      }}
    </NxtWatchContext.Consumer>
  )

  onClickLike = () => {
    this.setState(prevState => ({
      isLike: !prevState.isLike,
      isDisLike: false,
    }))
  }

  onClickDislike = () => {
    this.setState(prevState => ({
      isDisLike: !prevState.isDisLike,
      isLike: false,
    }))
  }

  renderSuccessView = () => {
    const {videoDetail, isDisLike, isLike, isSave} = this.state
    const {title, videoUrl, viewCount, publishedAt, description} = videoDetail
    const {channel, id} = videoDetail
    const {profileImageUrl, name, subscriberCount} = channel
    const isLikeCss = isLike ? 'blue-btn' : 'normal-btn'
    const isDisLikeCss = isDisLike ? 'blue-btn' : 'normal-btn'
    const isSaveCss = isSave ? 'blue-btn' : 'normal-btn'

    const timeAgo = formatDistanceToNow(new Date(publishedAt))
    return (
      <NxtWatchContext.Consumer>
        {value => {
          const {onchangeSavedList, upDatedSavedList, darkTheme} = value
          const onClickSave = () => {
            if (isSave === false) {
              onchangeSavedList(videoDetail)
              this.setState(prevState => ({
                isSave: !prevState.isSave,
              }))
            } else {
              upDatedSavedList(id)
              this.setState(prevState => ({
                isSave: !prevState.isSave,
              }))
            }
          }
          const saveText = isSave ? 'Saved' : 'save'
          const videoDetailBg = darkTheme
            ? 'dark-video-detail-bg'
            : 'video-detail-bg'
          const titleTheme = darkTheme ? 'dark-detail-title' : 'detail-title'
          return (
            <div className={videoDetailBg}>
              <ReactPlayer height="40vh" width="cover" url={videoUrl} />
              <p className={titleTheme}>{title}</p>
              <div className="view-like-card">
                <p className="center-container">
                  {viewCount} views <BsDot className="dot-icon" /> {timeAgo}
                </p>
                <div className="row-container">
                  <button
                    type="button"
                    className={isLikeCss}
                    onClick={this.onClickLike}
                  >
                    <BiLike /> &nbsp; Like
                  </button>
                  <button
                    type="button"
                    className={isDisLikeCss}
                    onClick={this.onClickDislike}
                  >
                    <BiDislike /> &nbsp; Dislike
                  </button>

                  <button
                    type="button"
                    className={isSaveCss}
                    onClick={onClickSave}
                  >
                    <IoIosSave /> &nbsp; {saveText}
                  </button>
                </div>
              </div>
              <hr />
              <div className="row-container">
                <img
                  src={profileImageUrl}
                  alt="channel logo"
                  className="profile-img"
                />
                <div>
                  <p>{name}</p>
                  <p>{subscriberCount} Subscribers</p>
                  <br />
                  <p>{description}</p>
                </div>
              </div>
            </div>
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
export default VideoItemDetails

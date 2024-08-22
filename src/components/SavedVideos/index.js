import {IoIosSave} from 'react-icons/io'
import TrendingVideoCard from '../TrendingVideoCard/index'
import SideBar from '../SideBar/index'
import Header from '../Header/index'
import NxtWatchContext from '../../context/NxtWatchContext'

import './index.css'

const SavedVideos = () => (
  <NxtWatchContext.Consumer>
    {value => {
      const {savedList, darkTheme} = value
      const noSavedContainer = darkTheme
        ? 'dark-no-saved-container'
        : 'no-saved-container'
      const trendingBannerSection = darkTheme
        ? 'dark-trending-banner-section'
        : 'trending-banner-section'
      const trendingIconBox = darkTheme
        ? 'dark-trending-icon-box'
        : 'trending-icon-box'
      const trendingVideoList = darkTheme
        ? 'dark-trending-video-list-container'
        : 'trending-video-list-container'
      const wholeContainer = darkTheme
        ? 'dark-trending-container'
        : 'trending-container'
      if (savedList.length < 1) {
        return (
          <>
            <Header />
            <div className="row-container">
              <SideBar />
              <div className={noSavedContainer}>
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
                  alt="no saved videos"
                  className="no-saved-videos"
                />
                <h1 className="failure-heading">No saved videos found</h1>
                <p className="failure-description">
                  Save your videos by clicking a button
                </p>
                <p className="failure-description">
                  You can save your video while watching them
                </p>
              </div>
            </div>
          </>
        )
      }
      return (
        <>
          <Header />
          <div className="row-container">
            <SideBar />
            <div className={wholeContainer}>
              <div className={trendingBannerSection}>
                <div className={trendingIconBox}>
                  <IoIosSave className="trending-icon" />
                </div>
                <h1>Saved Videos</h1>
              </div>
              <ul className={trendingVideoList}>
                {savedList.map(each => (
                  <TrendingVideoCard details={each} key={each.id} />
                ))}
              </ul>
            </div>
          </div>
        </>
      )
    }}
  </NxtWatchContext.Consumer>
)
export default SavedVideos

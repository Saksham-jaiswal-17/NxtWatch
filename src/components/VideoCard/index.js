import {Link} from 'react-router-dom'
import {formatDistanceToNow} from 'date-fns'
import NxtWatchContext from '../../context/NxtWatchContext'

import './index.css'

const VideoCard = props => {
  const {details} = props
  const {id, title, thumbnailUrl, channel, viewCount, publishedAt} = details
  const {name, profileImageUrl} = channel
  const timeAgo = formatDistanceToNow(new Date(publishedAt))
  return (
    <NxtWatchContext.Consumer>
      {value => {
        const {darkTheme} = value
        const titleCss = darkTheme
          ? 'dark-video-card-title'
          : 'video-card-title'
        return (
          <li>
            <Link className="link" to={`/videos/${id}`}>
              <div className="video-card-container">
                <img
                  src={thumbnailUrl}
                  alt="video thumbnail"
                  className="thumbnail"
                />
                <div className="row-container">
                  <img
                    alt="channel logo"
                    src={profileImageUrl}
                    className="profile-img"
                  />
                  <div>
                    <p className={titleCss}>{title}</p>
                    <p className="video-card-details">{name}</p>
                    <p className="video-card-details">
                      {viewCount} views &nbsp; . &nbsp;
                      {timeAgo}{' '}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          </li>
        )
      }}
    </NxtWatchContext.Consumer>
  )
}
export default VideoCard

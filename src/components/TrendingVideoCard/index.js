import {Link} from 'react-router-dom'
import {formatDistanceToNow} from 'date-fns'
import NxtWatchContext from '../../context/NxtWatchContext'

import './index.css'

const TrendingVideoCard = props => {
  const {details} = props
  const {id, title, thumbnailUrl, channel, viewCount, publishedAt} = details
  const {name} = channel
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
              <div className="row-container">
                <img
                  src={thumbnailUrl}
                  alt="video thumbnail"
                  className="trending-video-thumbnail"
                />
                <div>
                  <p className={titleCss}>{title}</p>
                  <p className="video-card-details">{name}</p>
                  <p className="video-card-details ">
                    {viewCount} views &nbsp; . &nbsp;
                    {timeAgo}{' '}
                  </p>
                </div>
              </div>
            </Link>
          </li>
        )
      }}
    </NxtWatchContext.Consumer>
  )
}
export default TrendingVideoCard

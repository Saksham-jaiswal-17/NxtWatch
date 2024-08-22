import {Link} from 'react-router-dom'
import NxtWatchContext from '../../context/NxtWatchContext'

import './index.css'

const GamingVideoCard = props => {
  const {details} = props
  const {id, title, thumbnailUrl, viewCount} = details

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
              <div className="column-container">
                <img
                  src={thumbnailUrl}
                  alt="video thumbnail"
                  className="gamming-video-thumbnail"
                />

                <p className={titleCss}>{title}</p>
                <p className="video-card-details">
                  {viewCount} Watching Worldwide
                </p>
              </div>
            </Link>
          </li>
        )
      }}
    </NxtWatchContext.Consumer>
  )
}
export default GamingVideoCard

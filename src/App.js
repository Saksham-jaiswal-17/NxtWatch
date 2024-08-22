import {Route, Switch, Redirect} from 'react-router-dom'
import {Component} from 'react'
import NxtWatchContext from './context/NxtWatchContext'
import Login from './components/Login'
import Home from './components/Home'
import Trending from './components/Trending'
import Gaming from './components/Gaming'
import VideoItemDetails from './components/VideoItemDetails'
import SavedVideos from './components/SavedVideos'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'

import './App.css'

class App extends Component {
  state = {savedList: [], darkTheme: false, currentPath: 'Home'}

  onChangeTheme = () => {
    this.setState(prevState => ({
      darkTheme: !prevState.darkTheme,
    }))
  }

  upDatedSavedList = id => {
    const {savedList} = this.state
    const newList = savedList.filter(each => each.id !== id)
    this.setState({savedList: newList})
  }

  onchangePath = value => {
    this.setState({currentPath: value})
  }

  onchangeSavedList = newItem => {
    this.setState(prevState => ({
      savedList: [...prevState.savedList, newItem],
    }))
  }

  render() {
    const {savedList, darkTheme, currentPath} = this.state
    return (
      <NxtWatchContext.Provider
        value={{
          darkTheme,
          savedList,
          onChangeTheme: this.onChangeTheme,
          onchangeSavedList: this.onchangeSavedList,
          currentPath,
          onchangePath: this.onchangePath,
          upDatedSavedList: this.upDatedSavedList,
        }}
      >
        <Switch>
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/trending" component={Trending} />
          <ProtectedRoute exact path="/gaming" component={Gaming} />
          <ProtectedRoute exact path="/saved-videos" component={SavedVideos} />
          <ProtectedRoute
            exact
            path="/videos/:id"
            component={VideoItemDetails}
          />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </NxtWatchContext.Provider>
    )
  }
}

export default App

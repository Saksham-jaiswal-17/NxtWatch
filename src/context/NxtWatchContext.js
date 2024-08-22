import React from 'react'

const NxtWatchContext = React.createContext({
  darkTheme: false,
  savedList: [],
  currentPath: 'Home',
  onChangeTheme: () => {},
  onchangeSavedList: () => {},
  onchangePath: () => {},
  upDatedSavedList: () => {},
})

export default NxtWatchContext

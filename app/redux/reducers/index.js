import { combineReducers } from 'redux'

import * as tabList from './tabList'
import * as common from './common'

const rootReducer = combineReducers({
  config: (state = {}) => state,
  ...tabList,
  ...common,
})

export default rootReducer

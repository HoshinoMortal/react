import { configureStore } from '@reduxjs/toolkit'
import * as tabList from '@reducers/tabList'
import * as common from '@reducers/common'

const rootReducer = {
  config: (state = {}) => state,
  tabListResult: tabList.default,
  loginResponse: common.loginResponse,
  gFormCache2: common.gFormCache2,
  allRetrievalResult: common.allRetrievalResult,
}

export default function configure(initialState) {
  const store = configureStore({
    reducer: rootReducer,
    preloadedState: initialState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  })

  if (import.meta.hot) {
    import.meta.hot.accept('@reducers', async () => {
      const nextReducer = await import('@reducers')
      store.replaceReducer(nextReducer)
    })
  }

  return store
}

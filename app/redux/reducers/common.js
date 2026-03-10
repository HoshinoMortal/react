import { createSlice } from '@reduxjs/toolkit'

const loginState = () => ({})

const loginSlice = createSlice({
  name: 'login',
  initialState: loginState(),
  reducers: {
    requestLogin(state) {
      state.loading = true
    },
    receiveLogin(state, action) {
      const { res } = action.payload
      state.data = res
      state.loading = false
    },
  },
})

export const { requestLogin, receiveLogin } = loginSlice.actions
export const loginResponse = loginSlice.reducer

const cache2 = () => ({})

const gFormCache2Slice = createSlice({
  name: 'gFormCache2',
  initialState: cache2(),
  reducers: {
    setGformCache2(state, action) {
      const { cacheKey, cacheContent } = action.payload
      if (cacheKey === undefined) {
        throw new Error('cacheKey不能是undefined')
      }
      if (cacheContent === undefined) {
        throw new Error('cacheContent不能是undefined')
      }
      state[cacheKey] = { ...state[cacheKey], ...cacheContent }
    },
    clearGformCache2(state) {
      Object.assign(state, cache2())
    },
  },
})

export const { setGformCache2, clearGformCache2 } = gFormCache2Slice.actions
export const gFormCache2 = gFormCache2Slice.reducer

const allRetrievalState = {
  list: [],
}

const allRetrievalSlice = createSlice({
  name: 'allRetrieval',
  initialState: allRetrievalState,
  reducers: {
    requestAllRetrieval(state) {
      state.loading = true
    },
    receiveAllRetrieval(state, action) {
      const { res } = action.payload
      Object.assign(state, res.data)
      state.loading = false
    },
  },
})

export const { requestAllRetrieval, receiveAllRetrieval } = allRetrievalSlice.actions
export const allRetrievalResult = allRetrievalSlice.reducer

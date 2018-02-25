import { createStore, applyMiddleware } from 'redux'
import reducer from './../reducers'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import { routerMiddleware } from 'react-router-redux'

import history from './../history'

const middlewares = [thunk]
if (process.env.NODE_ENV === 'development') middlewares.push(logger)

const middleware = routerMiddleware(history)

export default function configureStore() {
  const store = createStore(
    reducer,
    applyMiddleware(...middlewares, middleware)
  )
  return store
}
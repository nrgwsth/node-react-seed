import {createStore, applyMiddleware} from "redux"
import logger from "redux-logger"
import thunk from "redux-thunk"

import reducers from "./../reducers"

const NODE_ENV = process.env.NODE_ENV === 'production' ? 'production' : 'development'
let middlewares = [thunk]

if(NODE_ENV){
	middlewares.push(logger)
}

export default function configureStore(){
	return createStore(reducers, applyMiddleware(...middlewares))
}
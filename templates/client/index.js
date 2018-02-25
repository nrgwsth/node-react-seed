import React, { Component } from 'react'
import { render } from 'react-dom'
import { Router, Route, Switch, Link } from 'react-router-dom'
import { ConnectedRouter } from 'react-router-redux'
import { Provider } from 'react-redux'

import configureStore from './store'

import history from './history'

import App from './containers/App'

const store = configureStore()

render(
	<Provider store={store}>
		<div>
			<ConnectedRouter history={history}>
				<App />
			</ConnectedRouter>
		</div>
	</Provider>,
	document.getElementById('app')
)
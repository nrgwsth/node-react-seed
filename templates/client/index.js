import React, {Component} from "react"
import {render} from "react-dom"
import {Provider} from "react-redux"
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import App from "./containers/App"

import configureStore from "./store/"

const store = configureStore()

render(
  <MuiThemeProvider>
    <Provider store = {store}>
      <App />
    </Provider>
  </MuiThemeProvider>,
	document.getElementById("app")
)
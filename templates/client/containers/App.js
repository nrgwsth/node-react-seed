import React, {Component} from "react"
import {connect} from "react-redux"
import {Route, Router} from 'react-router'

import history from "./../history"

import Home from "./Home/"
import Login from "./Login/Login"

import {checkAuth} from "./../actions/"

@connect()
class App extends Component{
  componentDidMount(){
    this.props.dispatch(checkAuth())
  }

  render(){
    return (
      <Router history = {history}>
        <div>
          <Route exact path = "/" component = {Home} />
          <Route path = "/login" component = {Login} />
        </div>
      </Router>
    )
  }
}

export default App
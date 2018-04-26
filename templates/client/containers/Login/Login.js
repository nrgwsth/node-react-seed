import React, {Component} from "react"
import { GoogleLogin } from 'react-google-login-component';
import axios from 'axios'
import {connect} from "react-redux"

import {handleGoogleAuthResponse} from "./../../actions/"

@connect()
class Login extends Component{
	constructor(props){
		super(props)
		this.state = {}
		this.responseGoogle = this.responseGoogle.bind(this)
	}

	responseGoogle(googleUser) {
		this.props.dispatch(handleGoogleAuthResponse(googleUser))
	  }
	  
	render(){
		return (
			<GoogleLogin
	           socialId="502486639644-s82nfmv2apubbeuavjoo52q7u5q8b8dq.apps.googleusercontent.com"
	           className="google-login"
	           scope="profile email openid"
	           prompt="select_account"
	           fetchBasicProfile={false}
	           responseHandler={this.responseGoogle}
	           buttonText="Login With Google"
	        />
		)
	}
}

export default Login
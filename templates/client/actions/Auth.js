import axios from "axios"

import history from "./../history"

export function checkAuth(){
	return (dispatch)=>{
		const token = localStorage.getItem("token")
	    if(token){
	    	axios.defaults.headers.common['Authorization'] = token;
	      	return axios.get("/ping").then(d=>{
	      		if(d.data.auth){
	      			dispatch(saveUserData(d.data.user))
	      			history.push("/")
	      		} else{
	      			localStorage.removeItem("token")
	      			history.push("/login")
	      		}
	      	})
	      	.catch(e=>{
	        	history.push("/login")
	      	})
	    } else{
	      	localStorage.removeItem("token")
	      	history.push("/login")
	    }
	}
}

export function handleGoogleAuthResponse(googleUser){
	return (dispatch)=>{
		var profile = googleUser.getBasicProfile();
	    return axios.post('/google/login', {
	      id: profile.getId(),
	      name: profile.getName(),
	      profImage: profile.getImageUrl(),
	      email: profile.getEmail()
	    }).then((response)=>{
	      const data = response.data
	      if(data.auth){
	        localStorage.setItem("token", data.token)
	        history.push("/")
	      }
	    })
	}
}

function saveUserData(user){
	return {
		type: "SET_USER",
		payload: user
	}
}
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const User = require("./../models/User")

function VerifyToken(req, res, next){
	const token = req.headers['authorization']
	if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
	jwt.verify(token, process.env.secret, function(err, decoded) {
    	if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    	User.findById(decoded.id).then((user)=>{
    		if(err) throw err
    		req.user = user
    		req.token = token
    		next()
    	})
    	.catch(e=>{
    		res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    	})
  	})
}

module.exports = function(app){

	app.get("/ping", VerifyToken, (req,res)=>{
		res.json({
			auth: true,
			token: req.token,
			user: req.user
		})
	})

	app.post("/google/login", (req, res)=>{
		console.log("********* oi *******************", req.body)
		User.findById(req.body.id).then((user)=>{
			if(user){
				const token = jwt.sign({ id: user.id }, process.env.secret, {
			      expiresIn: 86400 * 30
			    })
				res.status(200).json({
					auth: true,
					token: token
				})
			} else{
				User.createUser(req.body).then(function(user){
					const token = jwt.sign({ id: user.id }, process.env.secret, {
				      expiresIn: 86400 * 30
				    })
					res.status(200).json({
						auth: true,
						token: token
					})
				})
			}
		})
		.catch(e=>{
			console.log(e)
		})
	})
}
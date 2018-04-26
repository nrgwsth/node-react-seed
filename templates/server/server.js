const express = require("express")
const cookieParser = require("cookie-parser")
const bodyParser = require("body-parser")
const path = require("path")
const mongoose = require("mongoose")
require("dotenv").config()

const CLIENTROUTING = require("./api/CLIENTROUTING")
const APIROUTING = require("./api/APIROUTING")

const PORT = process.env.PORT || 3000
const app = express()
require("./setupwebpack")(app)
app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded())
app.use(express.static(path.resolve(__dirname, "./../static/")))
mongoose.connect("mongodb://localhost/quizzer")

CLIENTROUTING(app)

APIROUTING(app)

app.listen(PORT, function(){
	console.log(`Server is running on port ${PORT}`)
})
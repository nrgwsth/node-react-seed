const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')
require('dotenv').config()
const webpack = require('webpack')
const chalk = require('chalk')

const API = require('./api')
const SocketController = require('./socket')
const PORT = process.env.PORT || 3000

app.use(require('cors')())
app.use(bodyParser.json())
app.use(require('cookie-parser')())
app.use(bodyParser.urlencoded({ extended: false }))

if (process.env.NODE_ENV === 'development') {
	const config = require('./../webpack.config.dev'),
		  compiler = webpack(config)
	app.use(
		require('webpack-dev-middleware')(compiler, {
			noInfo: false,
			publicPath: config.output.publicPath
		})
	)
	app.use(require('webpack-hot-middleware')(compiler))
}

app.use(express.static(path.resolve(__dirname, '../static')))
const Server = require('http').createServer(app)
const io = require('socket.io')(Server)
Server.listen(PORT, () => {
	console.log(
		chalk.bold(
			`Server is running on port ${PORT} in ${process.env.NODE_ENV} mode`
		)
	)
	console.log(
		chalk.bold(`Open ${chalk.green('http://localhost:' + PORT)} for dashboard`)
	)
})

SocketController(io, app, DB)
API(app, client)
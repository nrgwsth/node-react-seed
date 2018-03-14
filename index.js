#!/usr/bin/env node

const fs = require("fs")
const chalk = require("chalk")
const path = require("path")
const readline = require("readline")
const {exec} = require("child_process")
const rimraf = require("rimraf")

const cmdvar = process.argv.slice(2)

if(cmdvar.length === 0){
	console.log(chalk.red("Please provide folder name."))
	process.exit(1)
}

main()

function main(){
	const foldername = cmdvar[0]

	// App name
	const appName = createAppName(path.resolve(foldername)) || 'hello-world'

	emptyDirectory(foldername, function (empty) {
		if (empty) {
		  createApplication(appName, foldername)
		} else {
		  confirm('destination is not empty, continue? [y/N] ', function (ok) {
		    if (ok) {
		      process.stdin.destroy()
		      rimraf(foldername, (err)=>{
		      	if(err) throw err;
		      	createApplication(appName, foldername)
		      })
		      
		    } else {
		      console.error('aborting')
		      process.exit(1)
		    }
		  })
		}
	})
}


function createApplication(appName, foldername){
	const destinationPath = foldername || '.'
	let wait = 10
	function complete(){
		if(--wait) return

		console.log(chalk.green("Setup Complete"))
		console.log()
		console.log("cd " + appName)
		console.log()
		console.log("npm install")
	}
	fs.mkdir(destinationPath, (err)=>{
		if(err){
			console.log(chalk.red(err))
			process.exit(1)
		}

		console.log(chalk.blue("Making folders and subfolders"))

		fs.mkdir(destinationPath + "/client", (err)=>{
			copyFile("client/index.js", destinationPath + '/client/index.js')
			copyFile("client/history.js", destinationPath + '/client/history.js')
			fs.mkdir(destinationPath + '/client/actions', (err)=>{
				copyFile("client/actions/index.js", destinationPath + '/client/actions/index.js')
				complete()
			})
			fs.mkdir(destinationPath + '/client/reducers', (err)=>{
				copyFile("client/reducers/index.js", destinationPath + '/client/reducers/index.js')
				complete()
			})
			fs.mkdir(destinationPath + '/client/store', (err)=>{
				copyFile("client/store/index.js", destinationPath + '/client/store/index.js')
				complete()
			})
			fs.mkdir(destinationPath + '/client/containers', (err)=>{
				copyFile("client/containers/App.js", destinationPath + '/client/containers/App.js')
				complete()
			})
			complete()
		})

		fs.mkdir(destinationPath + "/server", (err)=>{
			copyFile("server/server.js", destinationPath + '/server/server.js')
			fs.mkdir(destinationPath + "/server/api", (err)=>{
				copyFile("server/api.js", destinationPath + '/server/api/index.js')
				complete()
			})
			fs.mkdir(destinationPath + "/server/socket", (err)=>{
				copyFile("server/socket.js", destinationPath + '/server/socket/index.js')
				complete()
			})
		})

		copyFile("config/webpack.config.dev.js", destinationPath + '/webpack.config.dev.js')
		copyFile("config/webpack.config.prod.js", destinationPath + '/webpack.config.prod.js')
		write(destinationPath + '/package.json', getPackagejsoncontent(appName))
		copyFile("config/.babelrc", destinationPath + '/.babelrc')
		copyFile("config/.env", destinationPath + '/.env')
		copyFile("config/.gitignore", destinationPath + '/.gitignore')
		copyFile("template.html", destinationPath + '/template.html')

		fs.mkdir(destinationPath + "/static", (err)=>{
			complete()
		})

		fs.mkdir(destinationPath + "/tools", (err)=>{
			copyFile("tools/build.js", destinationPath + '/tools/build.js')
			complete()
		})
		complete()
	})
}



/**
client
	containers
		App.js
	actions
		index.js
	store
		configreStore.js
	reducers
		index.js
	index.js
server
	server.js
webpack.config.dev.js
webpack.config.prod.js
.env
.babelrc
**/

/**
 * Check if the given directory `path` is empty.
 *
 * @param {String} path
 * @param {Function} fn
 */

function emptyDirectory (path, fn) {
  fs.readdir(path, function (err, files) {
    if (err && err.code !== 'ENOENT') throw err
    fn(!files || !files.length)
  })
}

/**
 * Prompt for confirmation on STDOUT/STDIN
 */

function confirm (msg, callback) {
  var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })

  rl.question(msg, function (input) {
    rl.close()
    callback(/^y|yes|ok|true$/i.test(input))
  })
}

/**
 * Create an app name from a directory path, fitting npm naming requirements.
 *
 * @param {String} pathName
 */

function createAppName (pathName) {
  return path.basename(pathName)
    .replace(/[^A-Za-z0-9.()!~*'-]+/g, '-')
    .replace(/^[-_.]+|-+$/g, '')
    .toLowerCase()
}

function copyFile(filePath, destination){
	const path = __dirname + '/templates/' + filePath
	const content = fs.readFileSync(path, {encoding: "utf-8"})
	write(destination, content)
}

function write(filePath, content){
	fs.writeFileSync(filePath, content)
}


function getPackagejsoncontent(appName){
	return `
	{
		"name": ${JSON.stringify(appName)},
		"scripts": {
			"precommit": "lint-staged",
			"build": "babel-node tools/build",
			"start": "node server/server.js"
		},
		"lint-staged": {
		    "**/*.js": [
		      "prettier --write --no-semi --single-quote",
		      "git add"
		    ]
		},
		"dependencies": {
			"babel-polyfill": "^6.26.0",
    		"body-parser": "^1.18.2",
   			"chalk": "^2.3.0",
			"express": "^4.16.2",
			"cookie-parser": "^1.4.3",
			"cors": "^2.8.4",
			"dotenv": "^4.0.0",
			"react": "^15.6.2",
		    "react-dom": "^15.6.2",
		    "react-redux": "^5.0.6",
		    "react-router": "^4.2.0",
		    "react-router-dom": "^4.2.2",
		    "react-router-redux": "^5.0.0-alpha.8",
		    "redux-thunk": "^2.2.0",
		    "socket.io": "^2.0.4",
		    "redux-logger": "*",
		    "react-router-redux": "*",
		    "history": "*"
		},
		"devDependencies": {
		    "babel-core": "^6.26.0",
		    "babel-loader": "^7.1.2",
		    "babel-plugin-transform-decorators-legacy": "^1.3.4",
		    "babel-polyfill": "^6.26.0",
		    "babel-preset-es2015": "^6.24.1",
		    "babel-preset-react": "^6.24.1",
		    "babel-preset-stage-2": "^6.24.1",
		    "compression-webpack-plugin": "^0.4.0",
		    "css-loader": "^0.28.7",
		    "html-webpack-plugin": "^2.30.1",
		    "husky": "^0.14.3",
		    "jest": "^20.0.4",
		    "lint-staged": "^4.3.0",
		    "prettier": "^1.8.2",
		    "redux-logger": "^3.0.6",
		    "regenerator-runtime": "^0.10.5",
		    "sass-loader": "^6.0.6",
		    "style-loader": "^0.18.2",
		    "webpack": "^2.6.1",
		    "webpack-dev-middleware": "^1.12.1",
			"webpack-hot-middleware": "^2.20.0"
		}
	}
	`
}
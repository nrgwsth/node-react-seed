// More info on Webpack's Node API here: https://webpack.github.io/docs/node.js-api.html
// Allowing console calls below since this is a build file.
/* eslint-disable no-console */
const webpack = require('webpack') 
const dotenv = require('dotenv')
const chalk = require('chalk')

let config = require('./../webpack.config.prod')

dotenv.config()

console.log(
	chalk.blue(
		'Generating minified bundle for production via Webpack. This will take a moment...'
	)
)

webpack(config).run((error, stats) => {
	if (error) {
		// so a fatal error occurred. Stop here.
		console.log(chalk.red(error))
		return 1
	}

	const jsonStats = stats.toJson()

	if (jsonStats.hasErrors) {
		return jsonStats.errors.map(error => console.log(chalk.red(error)))
	}

	if (jsonStats.hasWarnings) {
		console.log(chalkWarning('Webpack generated the following warnings: '))
		jsonStats.warnings.map(warning => console.log(chalk.yellow(warning)))
	}

	console.log(`Webpack stats: ${stats}`)

	// if we got this far, the build succeeded.
	console.log(
		chalk.green(
			"Your app is compiled in production mode in /dist. It's ready to roll!"
		)
	)

	return 0
})
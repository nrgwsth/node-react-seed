const webpack = require('webpack')
const path = require('path')

module.exports = {
	devtool: 'cheap-module-source-map',
	entry: {
		bundle: [
			'babel-polyfill',
			'webpack-hot-middleware/client?reload=true',
			path.resolve(__dirname, './client/index.js')
		]
	},
	output: {
		path: path.resolve(__dirname, './build/'),
		filename: '[name].js',
		publicPath: '/js/'
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.EnvironmentPlugin({
			NODE_ENV: JSON.stringify('development')
		}),
		new webpack.DefinePlugin({
			__dev__: true
		})
	],
	module: {
		loaders: [
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: /node_modules/
			},
			{
				test: /\.css$/,
				loader: 'style-loader!css-loader'
			},
			{
				test: /\.scss$/,
				loader: 'style-loader!css-loader!sass-loader',
				exclude: /node_modules/
			}
		]
	}
}
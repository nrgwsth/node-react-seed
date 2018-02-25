const webpack = require('webpack')
const path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
	devtool: 'cheap-module-source-map',
	entry: {
		bundle: [
			'babel-polyfill',
			path.resolve(__dirname, './client/index.js')
		]
	},
	output: {
		path: path.resolve(__dirname, './build/'),
		filename: '[name].[chunkhash].js',
		publicPath: '/js/'
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.resolve(
				__dirname,
				'./template.html'
			),
			filename: path.resolve(__dirname, './build/dashboard.html'),
			chunks: ['manifest', 'vendor', 'bundle']
		})
		new webpack.HashedModuleIdsPlugin(),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor',
			minChunks(module, count) {
				var context = module.context
				return context && context.indexOf('node_modules') >= 0
			}
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'manifest'
		}),
		new webpack.EnvironmentPlugin({
			NODE_ENV: JSON.stringify('production')
		}),
		new webpack.DefinePlugin({
			__dev__: false
		}),
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false,
				screw_ie8: true,
				conditionals: true,
				unused: true,
				comparisons: true,
				sequences: true,
				dead_code: true,
				evaluate: true,
				if_return: true,
				join_vars: true,
				drop_debugger: true,
				drop_console: true
			},
			output: {
				comments: false
			}
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
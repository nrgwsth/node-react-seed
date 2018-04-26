const webpack = require("webpack")
var webpackConfig = require('./../webpack.config');
var compiler = webpack(webpackConfig);

module.exports = function(app){
	app.use(require("webpack-dev-middleware")(compiler, {
	    publicPath: webpackConfig.output.publicPath
	}));
	app.use(require("webpack-hot-middleware")(compiler));
}
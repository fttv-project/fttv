process.env.NODE_ENV = "development";
const base = require("./webpack.base");
const common = require("./common");
const webpack = require("webpack");
const {CheckerPlugin} = require("awesome-typescript-loader");
const FriendlyErrorsPlugin = require("friendly-errors-webpack-plugin");

module.exports = Object.assign(base, {
	entry: {
		"index": [
			"react-hot-loader/patch",
			"webpack/hot/only-dev-server",
			common.paths.tsIndex
		]
	},
	devServer: {
		hot: true,
		quiet: true,
		historyApiFallback: true,
		contentBase: common.paths.dist
	},
	module: {
		rules: base.module.rules.concat([
			{
				test: /\.tsx?$/,
				exclude: /node_modules/,
				loaders: [
					"react-hot-loader/webpack",
					"awesome-typescript-loader"
				]
			},

			{
				enforce: "pre",
				test: /\.scss$/,
				loaders: ["style-loader"].concat(common.loaders.css)
			}
		])
	},
	plugins: base.plugins.concat([
		new webpack.WatchIgnorePlugin([
			/.*\.scss\.d\.ts/
		]),
		new webpack.DefinePlugin({
			"process.env.NODE_ENV": `"development"`
		}),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoEmitOnErrorsPlugin(),
		new webpack.NamedModulesPlugin(),
		new FriendlyErrorsPlugin({
			compilationSuccessInfo: {
				messages: ['Dev server running at http://localhost:3000']
			}
		}),
		new CheckerPlugin()
	]),
	devtool: "eval-source-map"
});

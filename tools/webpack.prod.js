process.env.NODE_ENV = "production";
const base = require("./webpack.base");
const common = require("./common");
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const SriPlugin = require("webpack-subresource-integrity");

module.exports = Object.assign(base, {
	output: Object.assign(base.output, {
		filename: "[chunkhash].js",
		chunkFilename: "[chunkhash].chunk.js",
	}),
	entry: {
		"index": [
			common.paths.tsIndex
		]
	},
	module: {
		rules: base.module.rules.concat([
			{
				test: /\.tsx?$/,
				exclude: /node_modules/,
				loader: "awesome-typescript-loader"
			},

			{
				enforce: "pre",
				test: /\.scss$/,
				loaders: ExtractTextPlugin.extract({
					fallback: "style-loader",
					use: common.loaders.css
				})
			}
		])
	},
	plugins: base.plugins.concat([
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				dead_code: true,
				drop_console: true,
				unused: true,
				warnings: false
			}
		}),
		new webpack.DefinePlugin({
			"process.env.NODE_ENV": `"production"`
		}),
		new ExtractTextPlugin("[contenthash].css"),
		new SriPlugin({
			enabled: true,
			hashFuncNames: ["sha256", "sha512"]
		})
	])
});

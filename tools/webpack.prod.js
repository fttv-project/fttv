process.env.NODE_ENV = "production";
const base = require("./webpack.base");
const common = require("./common");
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const BabiliWebpackPlugin = require("babili-webpack-plugin");
const SriPlugin = require("webpack-subresource-integrity");

module.exports = Object.assign(base, {
	output: Object.assign(base.output, {
		filename: "[chunkhash].js",
		chunkFilename: "[chunkhash].js"
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
				loader: "ts-loader"
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
		new webpack.DefinePlugin({
			"process.env.NODE_ENV": `"production"`
		}),
		new BabiliWebpackPlugin({
			removeConsole: true,
			removeDebugger: true
		}, {
			comments: false
		}),
		new ExtractTextPlugin("[contenthash].css"),
		new SriPlugin({
			enabled: true,
			hashFuncNames: ["sha256", "sha512"]
		})
	])
});

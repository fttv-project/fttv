process.env.NODE_ENV = "production";
const base = require("./webpack.base");
const common = require("./common");
const webpack = require("webpack");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const SriPlugin = require("webpack-subresource-integrity");

module.exports = Object.assign(base, {
	output: Object.assign(base.output, {
		filename: process.env.PRODUCTION_DEBUG ? "[name].js" : "[chunkhash:8].js",
		chunkFilename: process.env.PRODUCTION_DEBUG ? "[name].chunk.js" : "[chunkhash:8].js",
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
				use: "ts-loader"
			},

			{
				enforce: "pre",
				test: /\.scss$/,
				use: ExtractTextPlugin.extract({
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
		new UglifyJsPlugin({
			extractComments: true,
			sourceMap: process.env.PRODUCTION_DEBUG
		}),
		new ExtractTextPlugin(process.env.PRODUCTION_DEBUG ? "[name].css" : "[contenthash:8].css"),
		new SriPlugin({
			enabled: true,
			hashFuncNames: ["sha256", "sha512"]
		})
	].concat(process.env.PRODUCTION_DEBUG ? [
		new BundleAnalyzerPlugin({
			analyzerMode: "static",
			openAnalyzer: false,
			generateStatsFile: true
		})
	] : []))
});

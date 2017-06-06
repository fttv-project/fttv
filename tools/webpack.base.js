const common = require("./common");
const config = require("./config");
const {resolve, join} = require("path");
const webpack = require("webpack");
const CleanPlugin = require("clean-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const HtmlPlugin = require("html-webpack-plugin");
const OfflinePlugin = require("offline-plugin");

module.exports = {
	output: {
		path: common.paths.dist,
		filename: "[name].js",
		chunkFilename: "[name].chunk.js",
		crossOriginLoading: "anonymous",
		publicPath: config.publicPath
	},
	resolve: {
		extensions: [".ts", ".tsx", ".js"],
		modules: [
			"node_modules",
			resolve(__dirname, join("..", common.paths.src))
		]
	},
	module: {
		rules: [
			{
				test: /\.(woff|woff2|eot|ttf)$/i,
				loader: "file-loader"
			},

			{
				test: /\.(gif|png|jpe?g|svg)$/i,
				loaders: common.loaders.images
			}
		]
	},
	plugins: [
		new webpack.optimize.CommonsChunkPlugin({
			name: "vendor",
			minChunks: ({resource}) => /node_modules/.test(resource)
		}),
		new webpack.optimize.CommonsChunkPlugin("manifest"),
		new CleanPlugin(
			[common.paths.dist], {
				root: process.cwd(),
				verbose: false
			}
		),
		new CopyPlugin([
			{from: common.paths.static}
		]),
		new HtmlPlugin(
			Object.assign(
				{
					inject: false,
					minify: (process.env.NODE_ENV === "production") ? {
						collapseBooleanAttributes: true,
						collapseWhitespace: true,
						removeAttributeQuotes: true,
						removeComments: true,
						removeEmptyAttributes: true,
						removeOptionalTags: true
					} : null,
					template: common.paths.htmlIndex,
					publicPath: config.publicPath
				},
				config.html
			)
		),
		new OfflinePlugin({
			safeToUseOptionalCaches: true,
			autoUpdate: true,
			version: "[hash]",
			excludes: ["*.hot-update.*"],
			responseStrategy: (process.env.NODE_ENV === "development") ? "network-first" : "cache-first",
			caches: {
				optional: [":rest:"]
			},
			AppCache: false
		})
	]
};

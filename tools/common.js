const { resolve, join } = require("path");
const createMinifier = require("css-loader-minify-class");

const ROOT = "./src";
const paths = {
	dist: resolve("dist"),
	htmlIndex: `${ROOT}/assets/index.ejs`,
	icon: `${ROOT}/assets/icon.png`,
	src: ROOT,
	stylesName: "styles",
	static: `${ROOT}/assets/static`,
	tsIndex: `${ROOT}/index.tsx`
};

module.exports = {
	loaders: {
		css: [
			{
				loader: "typings-for-css-modules-loader",
				options: {
					namedExport: true,
					modules: true,
					camelCase: true,
					sourceMap: (process.env.NODE_ENV === "development" || process.env.PRODUCTION_DEBUG),
					localIdentName: "[name]__[local]--[hash:2]",
					importLoaders: 1,
					minimize: process.env.NODE_ENV === "production",
					getLocalIdent: (process.env.NODE_ENV === "production" && !process.env.PRODUCTION_DEBUG)
						? createMinifier()
						: undefined
				}
			},

			{
				loader: "postcss-loader",
				options: require("./postcss.config")
			},

			"resolve-url-loader",

			{
				loader: "sass-loader",
				options: {
					sourceMap: true,
					includePaths: [resolve(__dirname, join("..", paths.src, paths.stylesName))]
				}
			}
		],
		images: [
			"file-loader",

			{
				loader: "image-webpack-loader",
				options: {
					// Only optimize in production.
					bypassOnDebug: true
				}
			}
		]
	},
	paths: paths
};

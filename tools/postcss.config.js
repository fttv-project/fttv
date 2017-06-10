module.exports = {
	plugins: [
		require("autoprefixer")(["> 1%", "last 2 versions", "Firefox ESR"])
	],
	sourceMap: (process.env.NODE_ENV === "development" || process.env.PRODUCTION_DEBUG) ? "inline" : false
};

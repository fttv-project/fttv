module.exports = {
	plugins: [
		require("autoprefixer")(["> 1%", "last 2 versions", "Firefox ESR"])
	],
	sourceMap: (process.env.NODE_ENV === "development") ? "inline" : false
};

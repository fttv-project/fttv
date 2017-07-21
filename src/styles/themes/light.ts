import { Theme } from "styles/themes";

export default {
	name: "light",
	properties: {
		"--app-background": "#fff",
		"--app-text": "#19171c",
		"--app-text-accent": "#6441a4",

		"--balloon-background": "#fff",
		"--balloon-border": "#dad8de",
		"--balloon-list-background-hover": "#6441a4",
		"--balloon-text": "#19171c",

		"--button-background": "#6441a4",
		"--button-background-lighter": "#7d5bbe",
		"--button-shadow": "#7d5bbe",

		"--game-viewer-text": "#6e6779",

		"--navigation-bar-background": "#4b367c",
		"--navigation-bar-text": "#fff",

		"--tab-text-active": "#0f0e11",
		"--tab-text-inactive": "#6441a4",
		"--tab-divider-active": "#6441a4",
		"--tab-divider-inactive": "#dad8de"
	}
} as Theme;

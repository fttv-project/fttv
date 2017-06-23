export interface ThemeProperties {
	[key: string]: string;

	"--app-background": string;
	"--app-text": string;
	"--app-text-accent": string;

	"--balloon-background": string;
	"--balloon-border": string;
	"--balloon-text": string;

	"--button-background": string;
	"--button-background-lighter": string;
	"--button-shadow": string;

	"--game-viewer-text": string;

	"--navigation-bar-background": string;
	"--navigation-bar-text": string;

	"--tab-text-active": string;
	"--tab-text-inactive": string;
	"--tab-divider-active": string;
	"--tab-divider-inactive": string;
}

export interface Theme {
	name: string;
	properties: ThemeProperties;
}

export const themes = [
	"dark",
	"light"
];

export interface ThemeProperties {
	[key: string]: string;
	"--app-background": string;
	"--app-text": string;

	"--balloon-background": string;
	"--balloon-border": string;

	"--button-background": string;
	"--button-background-lighter": string;
	"--button-shadow": string;

	"--navigation-bar-background": string;
	"--navigation-bar-text": string;
}

export interface Theme {
	name: string;
	properties: ThemeProperties;
}

export const themes = [
	"dark",
	"light"
];

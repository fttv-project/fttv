export interface ThemeProperties {
	[key: string]: string;
	"--text-primary": string;
	"--text-primary-inverse": string;
	"--background-primary": string;
	"--accent-primary": string;
	"--accent-secondary": string;
}

export interface Theme {
	name: string;
	properties: ThemeProperties;
}

export const themes = [
	"dark",
	"light"
];

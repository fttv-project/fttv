export interface ThemeProperties {
	[key: string]: string;
	"--text-primary": string;
	"--text-primary-inverse": string;
	"--background-primary": string;
	"--accent": string;
}

export interface Theme {
	name: string;
	properties: ThemeProperties;
}

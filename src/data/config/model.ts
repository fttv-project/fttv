import { ThemeExport, ThemeProperties } from "styles/themes";

export type ThemeName =
	| "light"
	| "dark";

export { ThemeExport, ThemeProperties };

export interface Theme {
	name: ThemeName;
	properties: ThemeProperties;
}

export interface State {
	theme: Theme;
}

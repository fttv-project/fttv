import {TypedAction} from "data";
import {RehydrateAction} from "data/common";

import {ThemeName, ThemeProperties} from "./model";

export const enum ActionTypes {
	SET_THEME = "config/SET_THEME",
	LOAD_THEME = "config/LOAD_THEME"
}

export interface SetThemeAction extends TypedAction<ActionTypes.SET_THEME> {
	payload: {
		name: ThemeName,
		properties: ThemeProperties
	};
}

export interface LoadThemeAction extends TypedAction<ActionTypes.LOAD_THEME> {
	payload: {
		name: ThemeName;
	};
}

export type Action =
	| SetThemeAction
	| LoadThemeAction
	| RehydrateAction;

export const setTheme = (name: ThemeName, properties: ThemeProperties): Action => ({
	type: ActionTypes.SET_THEME,
	payload: {name, properties}
});

export const loadTheme = (name: ThemeName): Action => ({
	type: ActionTypes.LOAD_THEME,
	payload: {name}
});

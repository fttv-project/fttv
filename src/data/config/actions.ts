import { TypedAction } from "data";
import { RehydrateAction } from "data/common";

import { Theme } from "./model";

export const enum ActionTypes {
	SET_THEME = "config/SET_THEME",
	LOAD_THEME = "config/LOAD_THEME"
}

export interface SetThemeAction extends TypedAction<ActionTypes.SET_THEME> {
	payload: {
		theme: Theme;
	};
}

export interface LoadThemeAction extends TypedAction<ActionTypes.LOAD_THEME> {
	payload: {
		name: string;
	};
}

export type Action =
	| SetThemeAction
	| LoadThemeAction
	| RehydrateAction;

export const setTheme = (theme: Theme): Action => ({
	type: ActionTypes.SET_THEME,
	payload: { theme }
});

export const loadTheme = (name: string): Action => ({
	type: ActionTypes.LOAD_THEME,
	payload: { name }
});

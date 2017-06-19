import { ActionsObservable } from "redux-observable";

import { Observable } from "common/rxjs";

import { Reducer } from "data";
import { CommonActionTypes } from "data/common/actions";
import lightTheme from "styles/themes/light";

import { Action, ActionTypes, loadTheme, setTheme } from "./actions";
import { State, Theme } from "./model";

export const initialState: State = {
	theme: lightTheme
};

export const reducer: Reducer<State> = (state = initialState, action: Action): State => {
	switch (action.type) {
		case ActionTypes.SET_THEME: {
			return { ...state, theme: action.payload.theme };
		}

		default: return state;
	}
};

export const epic = (actions$: ActionsObservable<Action>) => actions$
	.ofType(ActionTypes.LOAD_THEME, CommonActionTypes.REHYDRATE)
	.switchMap(action => {
		switch (action.type) {
			case ActionTypes.LOAD_THEME: {
				const { name } = action.payload;
				return Observable
					.fromPromise(System.import<{ default: Theme }>(`styles/themes/${name}`))
					.map(theme => setTheme(theme.default));
			}

			case CommonActionTypes.REHYDRATE: {
				// Use the persisted version if there is one
				if (action.payload.settings && action.payload.settings.theme) {
					return [
						setTheme(action.payload.settings.theme),
						loadTheme(action.payload.settings.theme.name)
					];
				}

				return [];
			}

			default: return [];
		}
	});

export * from "./actions";
export * from "./model";

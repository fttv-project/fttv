import { ActionsObservable } from "redux-observable";

import { Observable } from "common/rxjs";
import { CommonActionTypes } from "data/common/actions";
import lightTheme from "styles/themes/light";

import { Action, ActionTypes, setTheme } from "./actions";
import { State, Theme } from "./model";

const initialState: State = {
	theme: lightTheme
};

export const reducer = (state = initialState, action: Action): State => {
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
					.map(newTheme => setTheme(newTheme.default));
			}

			case CommonActionTypes.REHYDRATE: {
				// Use the persisted version if there is one
				if (action.payload.config && action.payload.config.theme) {
					return [setTheme(action.payload.config.theme)];
				}

				return [setTheme(initialState.theme)];
			}

			default: return [];
		}
	});

export * from "./actions";
export * from "./model";

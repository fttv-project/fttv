import {ActionsObservable} from "redux-observable";

import {Observable} from "common/rxjs";
import {CommonActionTypes} from "data/common/actions";
import {properties} from "styles/themes/light";

import {Action, ActionTypes, setTheme} from "./actions";
import {State, ThemeExport} from "./model";

const initialState: State = {
	theme: {
		name: "light",
		properties
	}
};

export const reducer = (state = initialState, action: Action): State => {
	switch (action.type) {
		case ActionTypes.SET_THEME: {
			return {...state, theme: { ...action.payload }};
		}

		default: return state;
	}
};

export const epic = (actions$: ActionsObservable<Action>) => actions$
	.ofType(ActionTypes.LOAD_THEME, CommonActionTypes.REHYDRATE)
	.map(action => {
		switch (action.type) {
			case ActionTypes.LOAD_THEME: {
				return action.payload.name;
			}

			case CommonActionTypes.REHYDRATE: {
				// Use the persisted version if there is one
				if (action.payload.config && action.payload.config.theme) {
					return action.payload.config.theme.name;
				}

				return initialState.theme.name;
			}

			default: return;
		}
	})
	.switchMap(themeName => {
		if (!themeName) {
			return Observable.empty<Action>();
		}

		return Observable
			.fromPromise(System.import<ThemeExport>(`styles/themes/${themeName}`))
			.map(theme => setTheme(themeName, theme.properties));
	});

export * from "./actions";
export * from "./model";

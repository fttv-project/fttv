import { combineReducers } from "redux";
import { combineEpics } from "redux-observable";
import { RouterState } from "connected-react-router";

import * as errors from "./errors";
import * as settings from "./settings";
import * as user from "./user";

export interface State {
	errors: errors.State;
	router: RouterState;
	settings: settings.State;
	user: user.State;
}

export interface TypedAction<T extends string> {
	readonly type: T;
	payload?: {};
}

export const rootEpic = combineEpics<TypedAction<any>, State>(
	errors.epic,
	settings.epic,
	user.epic
);

export default combineReducers<State>({
	errors: errors.reducer,
	settings: settings.reducer,
	user: user.reducer
});

import { combineReducers } from "redux";
import { combineEpics } from "redux-observable";
import { RouterState } from "connected-react-router";

import * as config from "./config";

export interface State {
	config: config.State;
	router: RouterState;
}

export interface TypedAction<T extends string> {
	readonly type: T;
	payload?: {};
}

export const rootEpic = combineEpics<TypedAction<any>, State>(
	config.epic
);

export default combineReducers<State>({
	config: config.reducer
});

import {combineReducers} from "redux";
import {combineEpics} from "redux-observable";
import {RouterState} from "connected-react-router";

import * as config from "./config";
import * as counter from "./counter";

export interface State {
	config: config.State;
	counter: counter.State;
	router: RouterState;
}

export interface TypedAction<T extends string> {
	readonly type: T;
	payload?: {};
}

export const rootEpic = combineEpics<TypedAction<any>, State>(
	config.epic,
	counter.epic
);

export default combineReducers<State>({
	config: config.reducer,
	counter: counter.reducer
});

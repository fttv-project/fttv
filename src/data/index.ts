import {combineReducers} from "redux";
import {combineEpics} from "redux-observable";
import {RouterState} from "connected-react-router";

import * as counter from "./counter";

export interface State {
	counter: counter.State;
	router: RouterState;
}

export interface TypedAction<T extends string> {
	readonly type: T;
	payload: {};
}

export const rootEpic = combineEpics(
	counter.epic
);

export default combineReducers<State>({
	counter: counter.reducer
});

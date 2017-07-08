import { combineReducers } from "redux";
import { combineEpics } from "redux-observable";
import { RouterState } from "connected-react-router";

import * as errors from "./errors";
import * as categories from "./categories";
import * as settings from "./settings";
import * as streams from "./streams";
import * as user from "./user";

export interface State {
	errors: errors.State;
	categories: categories.State;
	router: RouterState;
	settings: settings.State;
	streams: streams.State;
	user: user.State;
}

export interface TypedAction<T extends string> {
	readonly type: T;
	payload?: {};
}

export type Reducer<S> = (state: S | undefined, action: TypedAction<any>) => S;

export const rootEpic = combineEpics<TypedAction<any>, State>(
	errors.epic,
	categories.epic,
	settings.epic,
	streams.epic,
	user.epic
);

export default combineReducers<State>({
	errors: errors.reducer,
	categories: categories.reducer,
	settings: settings.reducer,
	streams: streams.reducer,
	user: user.reducer
});

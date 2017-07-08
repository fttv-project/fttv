import { RouterState } from "connected-react-router";
import { combineReducers } from "redux";
import { combineEpics } from "redux-observable";

import * as categories from "./categories";
import * as errors from "./errors";
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
	categories.epic,
	errors.epic,
	settings.epic,
	streams.epic,
	user.epic
);

export default combineReducers<State>({
	categories: categories.reducer,
	errors: errors.reducer,
	settings: settings.reducer,
	streams: streams.reducer,
	user: user.reducer
});

import { ActionsObservable } from "redux-observable";

import { Action, ActionTypes, remove } from "./actions";

export type State = string[];

const REMOVE_DELAY = 5000;
const initialState: State = [];

export const reducer = (state = initialState, action: Action): State => {
	switch (action.type) {
		case ActionTypes.ADD: {
			return state.concat(action.payload.message);
		}

		case ActionTypes.REMOVE: {
			return state.filter(msg => msg !== action.payload.message);
		}

		default: return state;
	}
};

export const epic = (actions$: ActionsObservable<Action>) => actions$
	.ofType(ActionTypes.ADD)
	.delay(REMOVE_DELAY)
	.map(action => {
		return remove(action.payload.message);
	});

export * from "./actions";

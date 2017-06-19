import { ActionsObservable } from "redux-observable";
import "common/rxjs";

import { Reducer } from "data";
import { Action, ActionTypes, remove } from "./actions";
import { State } from "./model";

export const REMOVE_DELAY = 5000;
export const initialState: State = {
	messages: []
};

export const reducer: Reducer<State> = (state = initialState, action: Action): State => {
	switch (action.type) {
		case ActionTypes.ADD: {
			return {...state, messages: state.messages.concat(action.payload.message)};
		}

		case ActionTypes.REMOVE: {
			return {...state, messages: state.messages.filter(msg => msg !== action.payload.message)};
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
export * from "./model";

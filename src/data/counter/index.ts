import {ActionsObservable} from "redux-observable";
import "common/rxjs";

import {Action, ActionTypes, decrease, increase} from "./actions";
import {State} from "./model";

const initialState: State = {
	value: 0
};

export const reducer = (state = initialState, action: Action): State => {
	switch (action.type) {
		case ActionTypes.INCREASE: {
			return {value: state.value + action.payload.value};
		}

		case ActionTypes.DECREASE: {
			return {value: state.value - action.payload.value};
		}

		case ActionTypes.SET: {
			return {value: action.payload.value};
		}

		default: return state;
	}
};

export const epic = (actions$: ActionsObservable<Action>) => actions$
	.ofType(ActionTypes.INCREASE_ASYNC, ActionTypes.DECREASE_ASYNC)
	.delay(1000)
	.map(action => {
		switch (action.type) {
			case ActionTypes.INCREASE_ASYNC: {
				return increase(action.payload.value);
			}

			case ActionTypes.DECREASE_ASYNC: {
				return decrease(action.payload.value);
			}

			default: return;
		}
	});

export * from "./actions";
export * from "./model";

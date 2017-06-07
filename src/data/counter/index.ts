import { ActionsObservable } from "redux-observable";

import { Observable } from "common/rxjs";

import { Action, ActionTypes, decrease, increase } from "./actions";
import { State } from "./model";

const initialState: State = {
	value: 0
};

export const reducer = (state = initialState, action: Action): State => {
	switch (action.type) {
		case ActionTypes.DECREASE: {
			return { value: state.value - action.payload.value };
		}

		case ActionTypes.INCREASE: {
			return { value: state.value + action.payload.value };
		}

		case ActionTypes.SET: {
			return { value: action.payload.value };
		}

		default: return state;
	}
};

export const epic = (actions$: ActionsObservable<Action>) => actions$
	.ofType(ActionTypes.DECREASE_ASYNC, ActionTypes.INCREASE_ASYNC)
	.delay(1000)
	.switchMap(action => {
		switch (action.type) {
			case ActionTypes.DECREASE_ASYNC: {
				return Observable.of(decrease(action.payload.value));
			}

			case ActionTypes.INCREASE_ASYNC: {
				return Observable.of(increase(action.payload.value));
			}

			default: return Observable.empty<Action>();
		}
	});

export * from "./actions";
export * from "./model";

import { MiddlewareAPI } from "redux";
import { ActionsObservable } from "redux-observable";

import "common/rxjs";
import { getTopGames } from "common/twitch-api/games";

import { Reducer, State as GlobalState } from "data";
import { add as addError } from "data/errors";
import { concatDedupe } from "data/common";

import { Action, ActionTypes, LoadNextAction, setTop } from "./actions";
import { State } from "./model";

export const initialState: State = {
	isLoading: false,
	offset: 0,
	topGames: { _total: 0, top: [] }
};

export const reducer: Reducer<State> = (state = initialState, action: Action): State => {
	switch (action.type) {
		case ActionTypes.LOAD_NEXT: {
			return { ...state, isLoading: true };
		}

		case ActionTypes.SET_TOP: {
			const newGames = concatDedupe(state.topGames.top, action.payload.topGames.top, value => value.game._id);
			return {
				...state,
				isLoading: false,
				offset: newGames.length,
				topGames: { ...action.payload.topGames, top: newGames }
			};
		}

		case ActionTypes.UNLOAD: {
			return initialState;
		}

		default: return state;
	}
};

export const epic = (actions$: ActionsObservable<LoadNextAction>, store: MiddlewareAPI<GlobalState>) => actions$
	.ofType(ActionTypes.LOAD_NEXT)
	.switchMap(action => {
		const offset = store.getState().games.offset;
		const limit = action.payload.limit;
		return getTopGames({ limit, offset })
			.takeUntil(actions$.ofType(ActionTypes.UNLOAD))
			.map(topGames => setTop(topGames))
			.catch(err => [addError(err.message || err)]);
	});

export * from "./actions";
export * from "./model";

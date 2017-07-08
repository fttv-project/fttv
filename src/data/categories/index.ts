import { MiddlewareAPI } from "redux";
import { ActionsObservable } from "redux-observable";

import "common/rxjs";
import { getTopGames } from "common/twitch-api/games";

import { Reducer, State as GlobalState } from "data";
import { add as addError } from "data/errors";
import { concatDedupe, makeDefaultPaginatedContent } from "data/common";

import { Action, ActionTypes, LoadNextAction, setTopGames } from "./actions";
import { State, TopGames } from "./model";

export const initialState: State = {
	topGames: makeDefaultPaginatedContent<TopGames>({ _total: 0, top: [] })
};

export const reducer: Reducer<State> = (state = initialState, action: Action): State => {
	switch (action.type) {
		case ActionTypes.LOAD_TOP_GAMES: {
			return { ...state, topGames: { ...state.topGames, isLoading: true }};
		}

		case ActionTypes.SET_TOP_GAMES: {
			const newGames = concatDedupe(state.topGames.value.top, action.payload.topGames.top, value => value.game._id);
			return {
				...state,
				topGames: {
					isLoading: false,
					offset: newGames.length,
					value: { ...action.payload.topGames, top: newGames }
				}
			};
		}

		case ActionTypes.UNLOAD_TOP_GAMES: {
			return { ...state, topGames: initialState.topGames };
		}

		default: return state;
	}
};

export const epic = (actions$: ActionsObservable<LoadNextAction>, store: MiddlewareAPI<GlobalState>) => actions$
	.ofType(ActionTypes.LOAD_TOP_GAMES)
	.switchMap(action => {
		const offset = store.getState().categories.topGames.offset;
		const limit = action.payload.limit;
		return getTopGames({ limit, offset })
			.takeUntil(actions$.ofType(ActionTypes.UNLOAD_TOP_GAMES))
			.map(topGames => setTopGames(topGames))
			.catch(err => [addError(err.message || err)]);
	});

export * from "./actions";
export * from "./model";

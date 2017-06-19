import { MiddlewareAPI } from "redux";
import { ActionsObservable } from "redux-observable";
import { Observable } from "common/rxjs";

import { getTopGames } from "common/twitch-api/games";

import { Reducer, State as GlobalState } from "data";
import { concatDedupe } from "data/common";
import { Action, ActionTypes, FetchTopAction, loadError, setTop } from "./actions";
import { State } from "./model";

export const initialState: State = {
	isLoading: false,
	offset: 0,
	topGames: { _total: 0, top: [] }
};

export const reducer: Reducer<State> = (state = initialState, action: Action): State => {
	console.log("reducer", action.type);
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

		case ActionTypes.LOAD_ERROR: {
			return { ...state, isLoading: false, ...action.payload };
		}

		case ActionTypes.UNLOAD: {
			return { ...initialState, isLoading: false };
		}

		default: return state;
	}
};

export const epic = (actions$: ActionsObservable<FetchTopAction>, store: MiddlewareAPI<GlobalState>) => actions$
	.ofType(ActionTypes.LOAD_NEXT)
	.switchMap(action => {
		const offset = store.getState().games.offset;
		const limit = action.payload.limit;
		return getTopGames({ limit, offset })
			.takeUntil(actions$.ofType(ActionTypes.UNLOAD))
			.map(topGames => setTop(topGames))
			.catch(() => Observable.of(loadError()));
	});

export * from "./actions";
export * from "./model";

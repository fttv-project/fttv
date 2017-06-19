import { ActionsObservable } from "redux-observable";
import { Observable } from "common/rxjs";

import { getTopGames } from "common/twitch-api/games";

import { LightStore, Reducer } from "data";
import { concatDedupe } from "data/common";
import { Action, ActionTypes, FetchTopAction, loadError, setTop } from "./actions";
import { State } from "./model";

export const initialState: State = {
	isLoading: false,
	offset: 0,
	topGames: { _total: 0, top: [] }
};

let isLoading = false;

export const reducer: Reducer<State> = (state = initialState, action: Action): State => {
	switch (action.type) {
		case ActionTypes.LOAD_NEXT:
			return { ...state, isLoading: true };
		case ActionTypes.SET_TOP:
			isLoading = false;
			const newGames = concatDedupe(state.topGames.top, action.payload.topGames.top, value => value.game._id);
			return {
				...state,
				isLoading,
				offset: newGames.length,
				topGames: { ...action.payload.topGames, top: newGames }
			};
		case ActionTypes.LOAD_ERROR:
			isLoading = false;
			return { ...state, isLoading, ...action.payload };
		case ActionTypes.UNLOAD:
			isLoading = false;
			return initialState;
		default: return state;
	}
};

export const epic = (actions$: ActionsObservable<FetchTopAction>, store: LightStore) => actions$
	.ofType(ActionTypes.LOAD_NEXT)
	.filter(() => !isLoading)
	.switchMap(action => {
		isLoading = true;
		const offset = store.getState().games.offset;
		const limit = action.payload.limit;
		return getTopGames({ limit, offset })
			.takeUntil(actions$.ofType(ActionTypes.UNLOAD))
			.map(topGames => setTop(topGames))
			.catch(() => Observable.of(loadError()));
	});

export * from "./actions";
export * from "./model";

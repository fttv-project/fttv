import { MiddlewareAPI } from "redux";
import { ActionsObservable } from "redux-observable";

import "common/rxjs";
import { getLiveStreams } from "common/twitch-api/streams";

import { Reducer, State as GlobalState } from "data";
import { add as addError } from "data/errors";
import { PaginatedContent, changeInMap, concatDedupe } from "data/common";

import { Action, ActionTypes, LoadGameAction, setGame } from "./actions";
import { MultipleStreams, State } from "./model";

export const initialState: State = {
	games: new Map()
};

const defaultGame: PaginatedContent<MultipleStreams> = {
	offset: 0,
	isLoading: false,
	value: { _total: 0, streams: [] }
};

export const reducer: Reducer<State> = (state = initialState, action: Action): State => {
	switch (action.type) {
		case ActionTypes.LOAD_GAME: {
			const { gameTitle } = action.payload;
			const games = changeInMap(state.games, gameTitle, defaultGame, () => ({
				isLoading: true
			}));
			return { ...state, games };
		}

		case ActionTypes.SET_GAME: {
			const { gameTitle, result } = action.payload;
			const games = changeInMap(state.games, gameTitle, defaultGame, currentGame => {
				const streams = concatDedupe(currentGame.value.streams, result.streams, a => a._id);
				return { isLoading: false, offset: streams.length, value: { _total: result._total, streams }};
			});
			return { ...state, games };
		}

		case ActionTypes.UNLOAD_GAME: {
			const games = new Map(state.games);
			games.delete(action.payload.gameTitle);
			return { ...state, games };
		}

		default: return state;
	}
};

export const epic = (actions$: ActionsObservable<LoadGameAction>, store: MiddlewareAPI<GlobalState>) => actions$
	.ofType(ActionTypes.LOAD_GAME)
	.switchMap(action => {
		const game = store.getState().streams.games.get(action.payload.gameTitle);
		const offset = game ? game.offset : 0;
		const limit = action.payload.limit;
		return getLiveStreams({ limit, offset })
			.map(result => setGame(action.payload.gameTitle, result))
			.catch(err => [addError(err.message || err)]);
	});

export * from "./actions";
export * from "./model";

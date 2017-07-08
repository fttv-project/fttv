import { TypedAction } from "data";

import { TopGames } from "./model";

export const enum ActionTypes {
	LOAD_TOP_GAMES   = "categories/LOAD_TOP_GAMES",
	SET_TOP_GAMES    = "categories/SET_TOP_GAMES",
	UNLOAD_TOP_GAMES = "categories/UNLOAD_TOP_GAMES"
}

export interface LoadNextAction extends TypedAction<ActionTypes.LOAD_TOP_GAMES> {
	payload: {
		limit: number;
	};
}

export interface SetTopAction extends TypedAction<ActionTypes.SET_TOP_GAMES> {
	payload: {
		topGames: TopGames;
	};
}

export interface UnloadAction extends TypedAction<ActionTypes.UNLOAD_TOP_GAMES> {
}

export type Action =
	| LoadNextAction
	| SetTopAction
	| UnloadAction;

export const loadTopGames = (limit: number): Action => ({
	type: ActionTypes.LOAD_TOP_GAMES,
	payload: { limit }
});

export const setTopGames = (topGames: TopGames): Action => ({
	type: ActionTypes.SET_TOP_GAMES,
	payload: { topGames }
});

export const unloadTopGames = (): Action => ({
	type: ActionTypes.UNLOAD_TOP_GAMES
});

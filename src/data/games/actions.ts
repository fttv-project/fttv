import { TypedAction } from "data";

import { TopGames } from "./model";

export const enum ActionTypes {
	LOAD_NEXT = "games/LOAD_NEXT",
	UNLOAD = "games/unload",
	SET_TOP = "games/SET_TOP",
	LOAD_ERROR = "games/LOAD_ERROR"
}

export interface FetchTopAction extends TypedAction<ActionTypes.LOAD_NEXT> {
	payload: {
		limit: number;
	};
}

export interface SetTopAction extends TypedAction<ActionTypes.SET_TOP> {
	payload: {
		topGames: TopGames;
	};
}

export interface LoadErrorAction extends TypedAction<ActionTypes.LOAD_ERROR> {
}

export interface UnloadAction extends TypedAction<ActionTypes.UNLOAD> {
}

export type Action =
	| FetchTopAction
	| SetTopAction
	| LoadErrorAction
	| UnloadAction;

export const loadNext = (limit: number): Action => ({
	type: ActionTypes.LOAD_NEXT,
	payload: { limit }
});

export const setTop = (topGames: TopGames): Action => ({
	type: ActionTypes.SET_TOP,
	payload: { topGames }
});

export const loadError = (): Action => ({
	type: ActionTypes.LOAD_ERROR
});

export const unload = (): Action => ({
	type: ActionTypes.UNLOAD
});

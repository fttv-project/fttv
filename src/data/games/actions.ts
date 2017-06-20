import { TypedAction } from "data";

import { TopGames } from "./model";

export const enum ActionTypes {
	LOAD_NEXT = "games/LOAD_NEXT",
	SET_TOP = "games/SET_TOP",
	UNLOAD = "games/UNLOAD"
}

export interface LoadNextAction extends TypedAction<ActionTypes.LOAD_NEXT> {
	payload: {
		limit: number;
	};
}

export interface SetTopAction extends TypedAction<ActionTypes.SET_TOP> {
	payload: {
		topGames: TopGames;
	};
}

export interface UnloadAction extends TypedAction<ActionTypes.UNLOAD> {
}

export type Action =
	| LoadNextAction
	| SetTopAction
	| UnloadAction;

export const loadNext = (limit: number): Action => ({
	type: ActionTypes.LOAD_NEXT,
	payload: { limit }
});

export const setTop = (topGames: TopGames): Action => ({
	type: ActionTypes.SET_TOP,
	payload: { topGames }
});

export const unload = (): Action => ({
	type: ActionTypes.UNLOAD
});

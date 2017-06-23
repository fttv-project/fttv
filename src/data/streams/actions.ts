import { TypedAction } from "data";

import { MultipleStreams } from "./model";

export const enum ActionTypes {
	LOAD_GAME = "streams/LOAD_GAME",
	SET_GAME = "streams/SET_GAME",
	UNLOAD_GAME = "streams/UNLOAD_GAME"
}

export interface LoadGameAction extends TypedAction<ActionTypes.LOAD_GAME> {
	payload: {
		limit: number;
		gameTitle: string;
	};
}

export interface SetGameAction extends TypedAction<ActionTypes.SET_GAME> {
	payload: {
		gameTitle: string;
		result: MultipleStreams;
	};
}

export interface UnloadGameAction extends TypedAction<ActionTypes.UNLOAD_GAME> {
	payload: {
		gameTitle: string;
	};
}

export type Action =
	| LoadGameAction
	| SetGameAction
	| UnloadGameAction;

export const loadGame = (gameTitle: string, limit: number): Action => ({
	type: ActionTypes.LOAD_GAME,
	payload: { gameTitle, limit }
});

export const setGame = (gameTitle: string, result: MultipleStreams): Action => ({
	type: ActionTypes.SET_GAME,
	payload: { gameTitle, result }
});

export const unload = (gameTitle: string): Action => ({
	type: ActionTypes.UNLOAD_GAME,
	payload: { gameTitle }
});

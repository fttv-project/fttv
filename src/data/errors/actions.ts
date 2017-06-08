import { TypedAction } from "data";

export const enum ActionTypes {
	ADD = "errors/ADD",
	REMOVE = "errors/REMOVE"
}

export interface ErrorAction extends TypedAction<ActionTypes> {
	payload: {
		message: string;
	};
}

export type Action =
	| ErrorAction;

export const add = (message: string): Action => ({
	type: ActionTypes.ADD,
	payload: { message }
});

export const remove = (message: string): Action => ({
	type: ActionTypes.REMOVE,
	payload: { message }
});

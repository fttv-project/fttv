import {TypedAction} from "data";

export enum ActionTypes {
	DECREASE = "counter/DECREASE",
	DECREASE_ASYNC = "counter/DECREASE_ASYNC",
	INCREASE = "counter/INCREASE",
	INCREASE_ASYNC = "counter/INCREASE_ASYNC",
	SET = "counter/SET"
}

interface CounterAction<T extends string> extends TypedAction<T> {
	payload: {
		value: number;
	};
}

export type Action =
	| CounterAction<ActionTypes>;

export const decrease = (value: number): Action => ({
	type: ActionTypes.DECREASE,
	payload: {value}
});

export const decreaseAsync = (value: number): Action => ({
	type: ActionTypes.DECREASE_ASYNC,
	payload: {value}
});

export const increase = (value: number): Action => ({
	type: ActionTypes.INCREASE,
	payload: {value}
});

export const increaseAsync = (value: number): Action => ({
	type: ActionTypes.INCREASE_ASYNC,
	payload: {value}
});

export const set = (value: number): Action => ({
	type: ActionTypes.SET,
	payload: {value}
});

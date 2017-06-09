import { UserDetails } from "common/twitch-api";
import { TypedAction } from "data";

export const enum ActionTypes {
	REQUEST_DETAILS = "user/REQUEST_DETAILS",
	SET_ACCESS_TOKEN = "user/SET_ACCESS_TOKEN",
	SET_DETAILS = "user/SET_DETAILS"
}

export interface RequestDetailsAction extends TypedAction<ActionTypes.REQUEST_DETAILS> {}

export interface SetAccessTokenAction extends TypedAction<ActionTypes.SET_ACCESS_TOKEN> {
	payload: {
		accessToken: string;
	};
}

export interface SetDetailsAction extends TypedAction<ActionTypes.SET_DETAILS> {
	payload: {
		details: UserDetails;
	};
}

export type Action =
	| RequestDetailsAction
	| SetAccessTokenAction
	| SetDetailsAction;

export const requestDetails = (): Action => ({
	type: ActionTypes.REQUEST_DETAILS
});

export const setAccessToken = (accessToken: string): Action => ({
	type: ActionTypes.SET_ACCESS_TOKEN,
	payload: { accessToken }
});

export const setDetails = (details: UserDetails): Action => ({
	type: ActionTypes.SET_DETAILS,
	payload: { details }
});

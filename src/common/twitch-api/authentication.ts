import { stringify } from "querystring";

import config from "common/config";
import { Observable } from "common/rxjs";
import { BASE_URL } from "./common";

export const getHeaders = (accessToken: string) => ({
	"Accept": "application/vnd.twitchtv.v5+json",
	"Authorization": `OAuth ${accessToken}`,
	"Client-ID": config.twitch.client_id
});

export const getAuthorizeUrl = (state: string) => {
	const options = {
		api_version: config.twitch.api_version,
		client_id: config.twitch.client_id,
		redirect_uri: config.twitch.redirect_uri,
		response_type: "token",
		scope: config.twitch.scope.join(" "),
		state
	};
	return `${BASE_URL}/oauth2/authorize/?${stringify(options)}`;
};

export const getUser = (accessToken: string) =>
	Observable.ajax.getJSON<UserDetails>(`${BASE_URL}/user`, getHeaders(accessToken));

export interface User {
	_id: number;
	bio: string;
	created_at: string;
	display_name: string;
	logo: string;
	name: string;
	type: string;
	updated_at: string;
}

export interface UserDetails extends User {
	email: string;
	email_verified: boolean;
	notifications: {
		email: boolean;
		push: boolean;
	};
	partnered: boolean;
	twitter_connected: boolean;
}

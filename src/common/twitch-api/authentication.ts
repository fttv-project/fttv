import { stringify } from "querystring";

import config from "common/config";
import { Observable } from "common/rxjs";

export const BASE_URL = "https://api.twitch.tv/kraken";

export const getHeaders = (accessToken: string) => ({
	"Accept": "application/vnd.twitchtv.v5+json",
	"Authorization": `OAuth ${accessToken}`,
	"Client-ID": config.twitch.client_id
});

export const getAuthorizeUrl = (state: string) => {
	const options = {
		client_id: config.twitch.client_id,
		redirect_uri: config.twitch.redirect_uri,
		response_type: "token",
		scope: config.twitch.scope.join(" "),
		state
	};
	return `${BASE_URL}/oauth2/authorize/?${stringify(options)}`;
};

export const getUser = (accessToken: string) =>
	Observable.ajax.getJSON<User>(`${BASE_URL}/user`, getHeaders(accessToken));

export interface User {
	_id: number;
	bio: string;
	created_at: string;
	display_name: string;
	email: string;
	email_verified: boolean;
	logo: string;
	name: string;
	notifications: {
		email: boolean;
		push: boolean;
	};
	partnered: boolean;
	twitter_connected: boolean;
	type: string;
	updated_at: string;
}

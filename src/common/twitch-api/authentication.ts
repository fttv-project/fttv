import { stringify } from "querystring";

import config from "common/config";
import { BASE_URL, twitchGetAuthorized } from "./common";

export const getHeaders = (accessToken: string) => ({
	"Accept": "application/vnd.twitchtv.v5+json",
	"Authorization": `OAuth ${accessToken}`,
	"Client-ID": config.twitch.client_id
});

export const getAuthorizeUrl = (state: string) => {
	const options = {
		client_id: config.twitch.client_id,
		force_verify: config.twitch.force_verify,
		redirect_uri: config.twitch.redirect_uri,
		response_type: "token",
		scope: config.twitch.scope.join(" "),
		state
	};
	return `${BASE_URL}/oauth2/authorize/?${stringify(options)}`;
};

export const getUser = (accessToken: string) => twitchGetAuthorized<UserDetails>("user", accessToken);

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

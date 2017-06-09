import { UserDetails } from "common/twitch-api";

export interface State {
	accessToken?: string;
	details?: UserDetails;
	scope: string[];
}

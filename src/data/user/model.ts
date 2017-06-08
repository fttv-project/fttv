import { User } from "common/twitch-api";

export interface State {
	accessToken?: string;
	details?: User;
	scope: string[];
}

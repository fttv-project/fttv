import { Channel } from "common/twitch-api/channels";
import { OffsetPaginated, twitchGet } from "common/twitch-api/common";

export interface Teams {
	teams: Team[];
}

export interface Team {
	_id: number;
	background: string | null;
	banner: string;
	created_at: string;
	display_name: string;
	info: string;
	logo: string;
	name: string;
	updated_at: string;
}

export interface TeamDetails extends Team {
	// Users are actually channels here, the Twitch API is just poorly named
	users: Channel[];
}

interface GetAllTeamsParams extends OffsetPaginated {
}

export const getAllTeam = (params?: Partial<GetAllTeamsParams>) => twitchGet<Teams>("teams", params);
export const getTeam = (teamName: string) => twitchGet<TeamDetails>(`teams/${teamName}`);

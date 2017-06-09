import { ImageSet, OffsetPaginated, twitchGet } from "./common";

export interface TopGames {
	_total: number;
	top: TopGame[];
}

export interface TopGame {
	channels: number;
	viewers: number;
	game: Game;
}

export interface Game {
	_id: number;
	name: string;
	popularity: number;
	giantbomb_id: number;
	box: ImageSet;
	logo: ImageSet;
}

interface GetTopGamesParams extends OffsetPaginated {
}

export const getTopGames = (params?: Partial<GetTopGamesParams>) => twitchGet<TopGames>("games/top", params);

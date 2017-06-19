import { TopGame, TopGames } from "common/twitch-api/games";

export { TopGame, TopGames };

export interface State {
	isLoading: boolean;
	offset: number;
	topGames: TopGames;
}

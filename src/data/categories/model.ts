import { TopGame, TopGames } from "common/twitch-api/games";
import { PaginatedContent } from "data/common";

export { TopGame, TopGames };

export interface State {
	topGames: PaginatedContent<TopGames>;
}

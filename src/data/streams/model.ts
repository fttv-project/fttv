import { MultipleStreams, Stream } from "common/twitch-api/streams";
import { PaginatedContent } from "data/common";

export { MultipleStreams, Stream };

export interface State {
	games: Map<string, PaginatedContent<MultipleStreams>>;
}

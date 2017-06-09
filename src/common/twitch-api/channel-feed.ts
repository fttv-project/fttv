import { User } from "./authentication";
import { CursorPaginated, twitchGet, twitchGetAuthorized } from "./common";

export interface Posts {
	_cursor: string;
	_topic: string;
	_disabled: boolean;
	posts: Post[];
}

export interface Post {
	id: string;
	body: string;
	created_at: string;
	deleted: boolean;
	emotes: EmoteIdentifier[];
	// TODO(gustorn): better embed types
	embeds: any[];
	permissions: Permissions;
	reactions: { [key: string]: Reaction };
	user: User;
	comments: {
		_cursor: string;
		_total: number;
		comments: Comment[];
	};
}

export interface Comment {
	id: string;
	body: string;
	created_at: string;
	deleted: boolean;
	emotes: EmoteIdentifier[];
	permissions: Permissions;

	/** The key is also the emote ID */
	reactions: { [key: string]: Reaction };
	user: User;
}

export interface Permissions {
	can_delete?: boolean;
	can_moderate?: boolean;
	can_reply?: boolean;
}

export interface EmoteIdentifier {
	start: number;
	end: number;
	id: number;
	set: number;
}

export interface Reaction {
	count: number;
	emote: string;
	user_ids: number[];
}

interface GetMultipleFeedPostsParams extends CursorPaginated {
	comments: number;
}

export const getMultipleFeedPosts = (channel: string, params?: Partial<GetMultipleFeedPostsParams>) =>
	twitchGet<Posts>(`feed/${channel}/posts`, params);

export const getMultipleFeedPostsForUser = (
	channel: string,
	accessToken: string,
	params?: Partial<GetMultipleFeedPostsParams>) =>
	twitchGetAuthorized<Posts>(`feed/${channel}/posts`, accessToken, params);

interface GetFeedPostParams {
	comments: number;
}

export const getFeedPost = (channel: string, postId: string, params?: Partial<GetFeedPostParams>) =>
	twitchGet<Post>(`feed/${channel}/posts/${postId}`, params);

export const getFeedPostForUser = (
	channel: string,
	postId: string,
	accessToken: string,
	params?: Partial<GetFeedPostParams>) =>
	twitchGetAuthorized<Post>(`feed/${channel}/posts/${postId}`, accessToken, params);

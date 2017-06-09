import { ImageSet, OffsetPaginated, twitchGet, twitchGetAuthorized } from "common/twitch-api/common";

import { Channel } from "./channels";

export interface SingleStream {
	/** The value is null if the stream is offline */
	stream: null | Stream;
}

export interface MultipleStreams {
	_total: number;
	streams: Stream[];
}

export interface FeaturedStreams {
	featured: FeaturedStream[];
}

export interface StreamsSummary {
	channels: number;
	viewers: number;
}

export interface FeaturedStream {
	image: string;
	priority: number;
	scheduled: boolean;
	sponsored: boolean;
	title: string;
	text: string;
	stream: Stream;
}

export interface Stream {
	_id: number;
	game: string;
	viewers: number;
	video_height: number;
	average_fps: number;
	delay: 0;
	created_at: string;
	is_playlist: boolean;
	preview: ImageSet;
	channel: Channel;
}

export type StreamType = "live" | "playlist" | "all";

export interface GetStreamByUserParams {
	stream_type: StreamType;
}

export const getStreamByUser = (channelId: string, params?: Partial<GetStreamByUserParams>) =>
	twitchGet<SingleStream>(`streams/${channelId}`, params);

export interface GetLiveStreamsParams extends OffsetPaginated {
	channel: string;
	game: string;
	language: string;
	stream_type: StreamType;
}

export const getLiveStreams = (params?: Partial<GetLiveStreamsParams>) =>
	twitchGet<MultipleStreams>("streams", params);

export interface GetStreamsSummaryParams {
	game: string;
}

export const getStreamsSummary = (params?: Partial<GetStreamsSummaryParams>) =>
	twitchGet<StreamsSummary>("streams/summary", params);

export interface GetFeaturedStreamsParams extends OffsetPaginated {
}

export const getFeaturedStreams = (params?: Partial<GetFeaturedStreamsParams>) =>
	twitchGet<FeaturedStreams>("streams/featured", params);

export interface GetFollowedStreamsParams extends OffsetPaginated {
	stream_type: StreamType;
}

/** Required scopes: user_read */
export const getFollowedStreams = (accessToken: string, params?: Partial<GetFollowedStreamsParams>) =>
	twitchGetAuthorized<MultipleStreams>("streams/followed", accessToken, params);

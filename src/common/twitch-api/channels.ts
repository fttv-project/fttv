export interface Channel {
	mature: boolean;
	status: string;
	broadcaster_language: string;
	display_name: string;
	game: string;
	language: string;
	_id: number;
	name: string;
	created_at: string;
	updated_at: string;
	partner: boolean;
	logo: string;
	video_banner: string;
	profile_banner: string;
	profile_banner_background_color: string | null;
	url: string;
	views: number;
	followers: number;
}

export interface ChannelDetails extends Channel {
	broadcaster_type: string;
	stream_key: string;
	email: string;
}

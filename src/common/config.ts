export default require<Config>(`assets/config.${process.env.NODE_ENV}.json`);

export interface Config {
	twitch: {
		api_version: string;
		api_version_header: string;
		client_id: string;
		redirect_uri: string;
		scope: string[];
	};
}

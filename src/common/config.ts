export default require<Config>(`assets/config.${process.env.NODE_ENV}.json`);

export interface Config {
	twitch: {
		api_version: string;
		client_id: string;
		force_verify: boolean;
		redirect_uri: string;
		scope: string[];
	};
}

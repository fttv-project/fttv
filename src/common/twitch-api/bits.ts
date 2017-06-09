import { twitchGet } from "./common";

export type CheermoteBackground = "light" | "dark";
export type CheermoteState = "static" | "animated";
export type CheermoteScale = "1" | "1.5" | "2" | "3" | "4";

export interface Cheermotes {
	actions: {
		prefix: string;
		backgrounds: CheermoteBackground[];
		scales: CheermoteScale[];
		states: CheermoteState[];
		tiers: CheermoteTier[];
	};
}

export interface CheermoteTier {
	id: string;
	color: string;
	min_bits: string;
	images: CheermoteBackgroundSet[];
}

export type CheermoteBackgroundSet = {
	[P in CheermoteBackground]: CheermoteStateSet;
};

export type CheermoteStateSet = {
	[P in CheermoteState]: CheermoteImageSet;
};

export type CheermoteImageSet = {
	[P in CheermoteScale]: string;
};

interface GetCheermotesParams {
	channel_id: string;
}

export const getCheermotes = (params?: Partial<GetCheermotesParams>) =>
	twitchGet<Cheermotes>("bits/actions", params);

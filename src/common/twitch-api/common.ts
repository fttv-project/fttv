import { stringify } from "querystring";

import config from "common/config";
import { Observable } from "common/rxjs";
import { isEmptyObject, removeUndefined } from "common/util";

export interface QueryParams {
	[key: string]: string | number | undefined;
}

export interface ImageSet {
	large: string;
	medium: string;
	small: string;
	template: string;
}

export interface Paginated {
	limit: number;
}

export interface OffsetPaginated extends Paginated {
	offset: number;
}

export interface CursorPaginated extends Paginated {
	cursor: string;
}

export const BASE_URL = "https://api.twitch.tv/kraken";

const makeQueryString = (queryParams?: QueryParams) => !queryParams || isEmptyObject(queryParams)
	? ""
	: `?${stringify(removeUndefined(queryParams))}`;

const commonHeaders = {
	"Client-ID": config.twitch.client_id,
	"Accept": config.twitch.api_version_header
};

export const twitchGet = <T>(endPoint: string, queryParams?: QueryParams) =>
	Observable.ajax.getJSON<T>(`${BASE_URL}/${endPoint}${makeQueryString(queryParams)}`, commonHeaders);

export const twitchGetAuthorized = <T>(endPoint: string, accessToken: string, queryParams?: QueryParams) =>
	Observable.ajax.getJSON<T>(`${BASE_URL}/${endPoint}${makeQueryString(queryParams)}}`, {
		...commonHeaders,
		Authorization: `OAuth ${accessToken}`
	});

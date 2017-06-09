export interface TwitchError {
	message: string;
	status: number;
	error: string;
}

export const isTwitchError = (value: any): value is TwitchError => {
	return value.error != null && value.status != null && value.error != null;
};

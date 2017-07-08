export interface PaginatedContent<T> {
	value: T;
	isLoading: boolean;
	offset: number;
}

export const makeDefaultPaginatedContent = <T> (value: T): PaginatedContent<T> => ({
	isLoading: false,
	offset: 0,
	value
});

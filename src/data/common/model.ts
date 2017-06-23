export interface PaginatedContent<T> {
	value: T;
	isLoading: boolean;
	offset: number;
}

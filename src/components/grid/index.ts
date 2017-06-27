export * from "./Grid";
export * from "./game-cell/GameCell";
export * from "./stream-cell/StreamCell";

export interface GridCellProps<T> {
	item: T;
	index: number;
}

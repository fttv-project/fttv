import React from "react";

import { Grid, GridCellProps } from "components/grid";
import { InfiniteScroll } from "components/infinite-scroll";
import { Loading } from "./loading/Loading";

export class InfiniteGrid extends React.PureComponent<InfiniteGridProps> {
	componentDidMount() {
		const { initialChunk, items, loadItems } = this.props;
		if (initialChunk && (!items || items.length <= 0)) {
			loadItems(this.calculateApiElements(initialChunk));
		}
	}

	render() {
		const { items, gridClass, columnWidth, cell, scrollElement, scrollThreshold, isLoading } = this.props;
		return items && items.length > 0 ? (
			<InfiniteScroll
				items={items}
				loadItems={this.loadItems}
				threshold={scrollThreshold}
				scrollElement={scrollElement}
				isLoading={isLoading}
			>
				{({ registerChild }) => (
					<Grid
						gridClass={gridClass}
						items={items}
						targetColumnWidth={columnWidth}
						registerLoader={registerChild}
						cell={cell}
					/>
				)}
			</InfiniteScroll>
		) : (
			<Loading />
		);
	}

	private loadItems = ({ elementsHint }: { elementsHint?: number }) => {
		const { isLoading, loadItems } = this.props;
		if (!isLoading) {
			loadItems(this.calculateApiElements(elementsHint));
		}
	}

	private calculateApiElements = (elementsHint?: number) => {
		const { apiLimit, apiLoadChunk } = this.props;
		return Math.min(apiLimit, elementsHint || apiLoadChunk);
	}
}

export interface InfiniteGridProps {
	items: any[] | null;
	gridClass: string;
	columnWidth: string;
	cell: React.ComponentType<GridCellProps<any>>;

	scrollElement: HTMLElement;
	scrollThreshold: number;

	isLoading: boolean;
	loadItems: (elements: number) => void;
	apiLoadChunk: number;
	initialChunk?: number;
	apiLimit: number;
}

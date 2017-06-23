import React from "react";

import InfiniteScroll from "components/infinite-scroll";
import Grid from "components/grid";
import { GridCellProps } from "components/grid/cell";

export default class InfiniteGrid extends React.PureComponent<Props, {}> {
	componentWillMount() {
		const { initialChunk, items, loadItems } = this.props;
		if (initialChunk && (!items || items.length <= 0)) {
			loadItems(this.calculateApiElements(initialChunk));
		}
	}

	render() {
		const { items, gridClass, columnWidth, cell, scrollElement, scrollThreshold, isLoading } = this.props;
		return items && (
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

interface Props {
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

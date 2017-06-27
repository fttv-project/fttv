import classnames from "classnames";
import React from "react";

import { GridCellProps } from ".";
import style from "./Grid.scss";

export class Grid extends React.PureComponent<GridProps, {}> {
	render() {
		const { cell: Cell, gridClass, items, targetColumnWidth, registerLoader } = this.props;
		return (
			<div
				ref={registerLoader}
				className={classnames(style.grid, gridClass)}
				style={{ gridTemplateColumns: `repeat(auto-fit, minmax(${targetColumnWidth}, 1fr))` }}
			>
				{items.map((item, index) => (
					<Cell key={index} item={item} index={index} />
				))}
			</div>
		);
	}
}

export interface GridProps {
	items: any[];
	gridClass?: string;
	targetColumnWidth: string;
	registerLoader: React.Ref<HTMLElement>;
	cell: React.ComponentType<GridCellProps<any>>;
}

import classnames from "classnames";
import React from "react";

import { GridCellProps } from "./cell";
import css from "./index.scss";

export default class Grid extends React.PureComponent<Props, {}> {
	render() {
		const { cell: Cell, gridClass, items, targetColumnWidth, registerLoader } = this.props;
		return (
			<div
				ref={registerLoader}
				className={classnames(css.grid, gridClass)}
				style={{ gridTemplateColumns: `repeat(auto-fit, minmax(${targetColumnWidth}, 1fr))` }}
			>
				{items.map((item, index) => (
					<Cell key={index} item={item} index={index} />
				))}
			</div>
		);
	}
}

interface Props {
	items: any[];
	gridClass?: string;
	targetColumnWidth: string;
	registerLoader: React.Ref<HTMLElement>;
	cell: React.ComponentType<GridCellProps<any>>;
}

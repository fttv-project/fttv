import classnames from "classnames";
import React from "react";

import style from "./TabTitle.scss";

export class TabTitle extends React.PureComponent<TabTitleProps, {}> {
	render() {
		const { header, label, activeIndex, index } = this.props;
		return (
			<li className={classnames(style.title, { [style.titleActive]: activeIndex === index })}>
				<a className={style.titleLink} href="#" onClick={this.handleTabSelected}>
					{(header && header({ label }) || label)}
				</a>
			</li>
		);
	}

	handleTabSelected = (event: React.MouseEvent<HTMLAnchorElement>) => {
		event.preventDefault();
		this.props.onSelect(this.props.index);
	}
}

export interface TabTitleProps {
	index: number;
	activeIndex: number;
	label: string;
	header?: ({ label }: { label: string }) => JSX.Element;
	onSelect: (index: number) => void;
}

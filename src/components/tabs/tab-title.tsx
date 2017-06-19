import classnames from "classnames";
import React from "react";

import css from "./tab-title.scss";

export default class TabTitle extends React.PureComponent<Props, {}> {
	render() {
		const { header, label, activeIndex, index } = this.props;
		return (
			<li className={classnames(css.title, { [css.titleActive]: activeIndex === index })}>
				<a className={css.titleLink} href="#" onClick={this.handleTabSelected}>
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

interface Props {
	index: number;
	activeIndex: number;
	label: string;
	header?: ({ label }: { label: string }) => JSX.Element;
	onSelect: (index: number) => void;
}

import React from "react";

import css from "./index.scss";
import Tab from "./tab";
import TabTitle from "./tab-title";

export default class Tabs extends React.PureComponent<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = { activeIndex: 0 };
	}

	render() {
		const { className, containerRef } = this.props;
		return (
			<div className={className} ref={containerRef}>
				{this.renderLabels()}
				{this.renderContent()}
			</div>
		);
	}

	renderLabels = () => {
		const { children } = this.props;
		const { activeIndex } = this.state;
		return (
			<ul className={css.labels}>
				{children.map((child, index) => (
					<TabTitle
						key={index}
						activeIndex={activeIndex}
						header={child.props.header}
						label={child.props.label}
						index={index}
						onSelect={this.handleTabSelected}
					/>
				))}
			</ul>
		);
	}

	renderContent = () => {
		return this.props.children[this.state.activeIndex];
	}

	handleTabSelected = (index: number) => {
		if (index === this.state.activeIndex) {
			return;
		}

		this.setState({ activeIndex: index });
		if (this.props.onSelect) {
			this.props.onSelect(index);
		}
	}
}

interface Props extends React.Props<Tabs> {
	children: JSX.Element[];
	className: string;
	containerRef: (element: HTMLElement) => void;
	onSelect?: (index: number) => void;
}

interface State {
	activeIndex: number;
}

export { Tab };

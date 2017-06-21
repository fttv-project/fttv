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
			<div ref={containerRef} className={className}>
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
				{React.Children.map(children, (child: React.ReactElement<any>, index) => (
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
		return React.Children.toArray(this.props.children)[this.state.activeIndex];
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
	className: string;
	containerRef: React.Ref<HTMLDivElement>;
	onSelect?: (index: number) => void;
}

interface State {
	activeIndex: number;
}

export { Tab };

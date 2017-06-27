import React from "react";

import { TabTitle } from "./tab-title/TabTitle";

import style from "./Tabs.scss";

export class Tabs extends React.PureComponent<TabsProps, TabsState> {
	constructor(props: TabsProps) {
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
			<ul className={style.labels}>
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

export interface TabsProps {
	className: string;
	containerRef: React.Ref<HTMLDivElement>;
	onSelect?: (index: number) => void;
}

interface TabsState {
	activeIndex: number;
}

import React from "react";
import Helmet from "react-helmet";

export class Tab extends React.PureComponent<TabProps, {}> {
	render() {
		return (
			<div>
				<Helmet title={this.props.title} />
				{this.props.children}
			</div>
		);
	}
}

export interface TabProps {
	children: React.ReactNode;
	label: string;
	header?: ({ label }: { label: string }) => JSX.Element;
	title?: string;
}

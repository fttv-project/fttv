import React from "react";
import Helmet from "react-helmet";

export default class Tab extends React.PureComponent<Props, {}> {
	render() {
		return (
			<div>
				<Helmet title={this.props.title} />
				{this.props.children}
			</div>
		);
	}
}

interface Props {
	children: React.ReactNode;
	label: string;
	header?: ({ label }: { label: string }) => JSX.Element;
	title?: string;
}

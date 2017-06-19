import React from "react";

export default class Tab extends React.PureComponent<Props, {}> {
	render() {
		return this.props.children;
	}
}

interface Props {
	children: React.ReactElement<any>;
	label: string;
	header?: ({ label }: { label: string }) => JSX.Element;
}

import React from "react";
import { Route, RouteComponentProps, Switch } from "react-router-dom";

import Directory from "./main";
import Streams from "./streams";

export default class DirectoryRouter extends React.PureComponent<RouteComponentProps<{}>, {}> {
	render() {
		const { match } = this.props;
		return (
			<Switch>
				<Route exact path={`${match.path}/game/:gameTitle`} component={Streams} />
				<Route component={Directory} />
			</Switch>
		);
	}
}

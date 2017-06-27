import React from "react";
import { Route, RouteComponentProps, Switch } from "react-router-dom";

import Main from "./main/Main";
import Streams from "./streams/Streams";

export class Directory extends React.PureComponent<RouteComponentProps<{}>, {}> {
	render() {
		const { match } = this.props;
		return (
			<Switch>
				<Route exact path={`${match.path}/game/:gameTitle`} component={Streams} />
				<Route component={Main} />
			</Switch>
		);
	}
}

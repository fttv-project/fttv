import React from "react";
import { History } from "history";
import { ConnectedRouter } from "connected-react-router";

import { Root } from "pages/root";

export default (props: RouterProps) => (
	<ConnectedRouter history={props.history}>
		<Root />
	</ConnectedRouter>
);

interface RouterProps {
	history: History;
}

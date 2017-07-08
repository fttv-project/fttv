import { ConnectedRouter } from "connected-react-router";
import { History } from "history";
import React from "react";

import { Root } from "pages/root";

export default (props: RouterProps) => (
	<ConnectedRouter history={props.history}>
		<Root />
	</ConnectedRouter>
);

interface RouterProps {
	history: History;
}

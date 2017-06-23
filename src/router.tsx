import React from "react";
import { History } from "history";
import { ConnectedRouter } from "connected-react-router";

import App from "pages/root";

export default (props: RouterProps) => (
	<ConnectedRouter history={props.history}>
		<App />
	</ConnectedRouter>
);

interface RouterProps {
	history: History;
}

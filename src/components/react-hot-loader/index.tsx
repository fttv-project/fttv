import React from "react";

export default process.env.NODE_ENV === "development"
	? require("react-hot-loader").AppContainer
	: ({ children }: React.Props<any>) => React.Children.only(children);

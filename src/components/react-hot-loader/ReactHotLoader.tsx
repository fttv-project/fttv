import React from "react";

export const ReactHotLoader = process.env.NODE_ENV === "development"
	? require("react-hot-loader").AppContainer
	: ({ children }: React.Props<any>) => React.Children.only(children);

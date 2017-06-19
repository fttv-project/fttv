import React from "react";

export default process.env.NODE_ENV === "development"
	? require("react-hot-loader").AppContainer
	: ({ children }: { children: React.ReactChildren }) => React.Children.only(children);

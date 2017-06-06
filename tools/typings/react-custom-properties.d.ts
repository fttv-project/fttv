declare module "react-custom-properties" {
	import React from "react";

	export interface ThemeProperties {
		[key: string]: string;
	}

	export interface CustomPropertiesProps {
		global: boolean;
		properties: ThemeProperties;
	}

	class CustomProperties extends React.Component<CustomPropertiesProps, {}> {
	}

	export default CustomProperties;
}

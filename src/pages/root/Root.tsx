import React from "react";
import Helmet from "react-helmet";
import CustomProperties from "react-custom-properties";
import { Route } from "react-router";
import { connect } from "react-redux";

import Loadable from "common/loadable";
import { idleCallback, returnOf } from "common/util";
import { State } from "data";
import { NavigationBar } from "components/navigation-bar";
import manifest from "assets/static/manifest.json";
import style from "./Root.scss";

const Home = Loadable(() => System.import("pages/home").then(e => e.Home));
const Auth = Loadable(() => System.import("pages/auth").then(e => e.Auth));
const Settings = Loadable(() => System.import("pages/settings").then(e => e.Settings));
const Directory = Loadable(() => System.import("pages/directory").then(e => e.Directory));

const preloadedRoutes = [
	Directory
];

class Root extends React.Component<RootProps, {}> {
	componentDidMount() {
		this.preloadRoutes();
	}

	render() {
		const { theme } = this.props;
		return (
			<main className={style.container}>
				<CustomProperties global properties={theme.properties} />
				<Helmet
					defaultTitle={manifest.short_name}
					titleTemplate={`%s - ${manifest.short_name}`}
				/>

				<NavigationBar />
				<div className={style.page}>
					<Route exact path="/" component={Home} />
					<Route exact path="/auth" component={Auth} />
					<Route exact path="/settings" component={Settings} />
					<Route       path="/directory" component={Directory} />
				</div>
			</main>
		);
	}

	private preloadRoutes = () => {
		for (const route of preloadedRoutes) {
			idleCallback(route.preload);
		}
	}
}

const mapStateToProps = (state: State) => ({
	theme: state.settings.theme
});

export type RootProps = typeof StateProps;
const StateProps = returnOf(mapStateToProps);

export default connect<typeof StateProps, {}, {}>(
	mapStateToProps,
	null,
	null,
	{ pure: false }
)(Root);

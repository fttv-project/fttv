import React from "react";
import Helmet from "react-helmet";
import CustomProperties from "react-custom-properties";
import { Route } from "react-router";
import { connect } from "react-redux";

import Loadable from "common/loadable";
import { idleCallback, returnOf } from "common/util";
import { State } from "data";
import NavigationBar from "components/navigation-bar";
import manifest from "assets/static/manifest.json";
import style from "./style.scss";

const Home = Loadable(() => System.import("pages/home"));
const Auth = Loadable(() => System.import("pages/auth"));
const Settings = Loadable(() => System.import("pages/settings"));
const Directory = Loadable(() => System.import("pages/directory"));

const preloadedRoutes = [
	Home,
	Directory,
	Auth,
	Settings
];

class App extends React.Component<Props, {}> {
	componentDidMount() {
		this.preloadRoutes();
	}

	render() {
		const { theme } = this.props;
		return (
			<CustomProperties global properties={theme.properties}>
				<main className={style.container}>
					<Helmet
						defaultTitle={manifest.short_name}
						titleTemplate={`%s - ${manifest.short_name}`}
					/>

					<NavigationBar />
					<div className={style.page}>
						<Route exact path="/" component={Home} />
						<Route exact path="/auth" component={Auth} />
						<Route exact path="/settings" component={Settings} />
						<Route exact path="/directory" component={Directory} />
						<Route exact path="/directory/following" component={Directory} />
					</div>
				</main>
			</CustomProperties>
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

type Props = typeof StateProps;
const StateProps = returnOf(mapStateToProps);

export default connect<typeof StateProps, {}, {}>(
	mapStateToProps,
	null,
	null,
	{ pure: false }
)(App);

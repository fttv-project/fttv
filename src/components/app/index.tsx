import React from "react";
import Helmet from "react-helmet";
import CustomProperties from "react-custom-properties";
import {Route} from "react-router";
import {connect} from "react-redux";

import Loadable from "common/loadable";
import {Theme} from "data/config";
import Home from "pages/home";
import NavigationBar from "components/navigation-bar";
import manifest from "assets/static/manifest.json";
import style from "./style.scss";
import { State } from "data";

export interface AppProps {}

interface StoreProps {
	theme: Theme;
}

class App extends React.Component<AppProps & StoreProps, {}> {
	render() {
		const { theme } = this.props;
		return (
			<CustomProperties global properties={theme.properties}>
				<main className={style.container}>
					<Helmet titleTemplate={`%s - ${manifest.short_name}`} />
					<NavigationBar />

					<div className={style.page}>
						<Route exact path="/" component={Home} />
						<Route exact path="/counter" component={Loadable(() => System.import("pages/counter"))} />
					</div>
				</main>
			</CustomProperties>
		);
	}
}

export default connect<StoreProps, {}, AppProps>(
	(state: State) => ({ theme: state.config.theme })
)(App);

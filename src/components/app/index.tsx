import React from "react";
import Helmet from "react-helmet";
import CustomProperties from "react-custom-properties";
import {Route} from "react-router";
import {connect} from "react-redux";

import Loadable from "common/loadable";
import {State} from "data";
import {Theme} from "data/config";
import Home from "pages/home";
import NavigationBar from "components/navigation-bar";
import manifest from "assets/static/manifest.json";
import style from "./style.scss";

const App = ({theme}: Props) => (
	<CustomProperties global properties={theme.properties}>
		<main className={style.container}>
			<Helmet
				defaultTitle={manifest.short_name}
				titleTemplate={`%s - ${manifest.short_name}`}
			/>

			<NavigationBar />
			<div className={style.page}>
				<Route exact path="/" component={Home} />
				<Route exact path="/counter" component={Loadable(() => System.import("pages/counter"))} />
			</div>
		</main>
	</CustomProperties>
);

type Props = StoreProps;

interface StoreProps {
	theme: Theme;
}

export default connect<StoreProps, {}, {}>(
	(state: State) => ({
		theme: state.config.theme
	}),
	null,
	null,
	{pure: false}
)(App);

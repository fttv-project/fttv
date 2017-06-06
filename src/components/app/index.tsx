import React from "react";
import Helmet from "react-helmet";
import {Route} from "react-router";

import Loadable from "common/loadable";
import Home from "pages/home";
import NavigationBar from "components/navigation-bar";
import manifest from "assets/static/manifest.json";
import style from "./style.scss";

export default () => (
	<main className={style.container}>
		<Helmet titleTemplate={`%s - ${manifest.short_name}`} />
		<NavigationBar />

		<div className={style.page}>
			<Route exact path="/" component={Home} />
			<Route exact path="/counter" component={Loadable(() => System.import("pages/counter"))} />
		</div>
	</main>
);

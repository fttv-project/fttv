import React from "react";
import {Link} from "react-router-dom";

import logo from "assets/logo-full.svg";
import style from "./style.scss";

export default class NavigationBar extends React.Component<{}, {}> {
	render() {
		return (
			<nav className={style.nav}>
				<Link to="/"><img className={style.logo} src={logo} /></Link>
				<ul />
			</nav>
		);
	}
}

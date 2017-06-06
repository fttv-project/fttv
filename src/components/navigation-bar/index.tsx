import React from "react";

import logo from "assets/logo-full.svg";
import style from "./style.scss";

export default class NavigationBar extends React.Component<{}, {}> {
	render() {
		return (
			<nav className={style.nav}>
				<img className={style.logo} src={logo} />

				<ul>

				</ul>
			</nav>
		);
	}
}

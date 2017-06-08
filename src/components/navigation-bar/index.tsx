import React from "react";
import { NavLink } from "react-router-dom";

import Button from "components/button";
import logo from "assets/logo-full.svg";
import moreIcon from "./more.svg";
import style from "./style.scss";

export default class NavigationBar extends React.Component<{}, {}> {
	render() {
		return (
			<nav className={style.nav}>
				<NavLink exact to="/"><img className={style.logo} src={logo} /></NavLink>
				<ul className={style.list}>
					<li><NavLink exact to="/directory/following">Following</NavLink></li>
					<li><NavLink exact to="/directory">Browse</NavLink></li>
					<li><a href="https://twitch.amazon.com/prime">Try Prime</a></li>
					<li>
						<Button><img src={moreIcon} /></Button>
					</li>
				</ul>
			</nav>
		);
	}
}

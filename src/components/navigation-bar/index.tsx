import React from "react";
import { NavLink } from "react-router-dom";

import Balloon from "components/balloon";
import Button from "components/button";

import logo from "assets/logo-full.svg";
import moreIcon from "./more.svg";
import style from "./style.scss";

export default class NavigationBar extends React.Component<{}, OwnState> {
	state = { moreOpen: false };

	toggleMore = () => this.setState({ moreOpen: !this.state.moreOpen });

	render() {
		return (
			<nav className={style.nav}>
				<NavLink exact to="/"><img className={style.logo} src={logo} /></NavLink>
				<ul className={style.list}>
					<li><NavLink exact to="/directory/following">Following</NavLink></li>
					<li><NavLink exact to="/directory">Browse</NavLink></li>
					<li><a href="https://twitch.amazon.com/prime">Try Prime</a></li>
					<li>
						<Button transparent className="ignore-react-onclickoutside" onClick={this.toggleMore}>
							<img src={moreIcon} />
						</Button>
						<Balloon onClose={this.toggleMore} open={this.state.moreOpen}>
							List
						</Balloon>
					</li>
				</ul>
			</nav >
		);
	}
}

interface OwnState {
	moreOpen: boolean;
}

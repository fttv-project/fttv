import React from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";

import { returnOf } from "common/util";
import { State } from "data";
import AuthButtons from "components/auth-buttons";
import Balloon from "components/balloon";
import Button from "components/button";
import UserInfo from "components/user-info";

import logo from "assets/logo-full.svg";
import moreIcon from "./more.svg";
import style from "./style.scss";

class NavigationBar extends React.Component<Props, OwnState> {
	state = { moreOpen: false };

	toggleMore = () => this.setState({ moreOpen: !this.state.moreOpen });

	render() {
		const { loggedIn } = this.props;
		const collapsibleItems = [
			loggedIn && (
				<li key="0">
					<NavLink exact to="/directory/following">Following</NavLink>
				</li>
			),
			(
				<li key="1">
					<NavLink exact to="/directory">Browse</NavLink>
				</li>
			),
			(
				<li key="2">
					<a href="https://twitch.amazon.com/prime">Try Prime</a>
				</li>
			)
		];

		return (
			<nav className={style.nav}>
				<NavLink exact to="/"><img className={style.logo} src={logo} /></NavLink>
				<ul className={style.list}>
					{collapsibleItems}

					<li className={style.more}>
						<Button transparent className="ignore-react-onclickoutside" onClick={this.toggleMore}>
							<img src={moreIcon} />
						</Button>

						<Balloon onClose={this.toggleMore} open={this.state.moreOpen}>
							<ul className={style.balloonList}>
								{collapsibleItems}
							</ul>
						</Balloon>
					</li>
				</ul>

				<aside className={style.rightSide}>
					{!loggedIn ? (
						<AuthButtons />
					) : (
							<UserInfo />
						)}
				</aside>
			</nav>
		);
	}
}

interface OwnState {
	moreOpen: boolean;
}

const mapStateToProps = (state: State) => ({
	loggedIn: !!state.user.details,
	// Select pathname changes to update links.
	pathname: state.router.location.pathname
});

type Props = typeof StateProps;
const StateProps = returnOf(mapStateToProps);

export default connect<typeof StateProps, {}, {}>(
	mapStateToProps
)(NavigationBar);

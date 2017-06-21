import React from "react";
import { connect } from "react-redux";
import { InjectedTranslateProps, translate } from "react-i18next";
import { NavLink } from "react-router-dom";

import { returnOf } from "common/util";
import { State } from "data";
import AuthButtons from "components/auth-buttons";
import Balloon, { BalloonList, ignoreCloseClass } from "components/balloon";
import Button from "components/button";
import UserInfo from "components/user-info";

import moreIcon from "./more.svg";
import style from "./style.scss";

type Item = [string, string];

const mapItemsToLinks = (items: Item[]) => items
	.map(item => {
		const title = item[0];
		const url = item[1];

		return url.startsWith("/") ? (
			<NavLink key={title} title={title} exact to={url}>{title}</NavLink>
		) : (
			<a key={title} title={title} href={url}>{title}</a>
		);
	});

@translate("navigation-bar")
class NavigationBar extends React.Component<Props, OwnState> {
	listRef: HTMLElement;
	state = { moreOpen: false };

	toggleMore = () => this.setState({ moreOpen: !this.state.moreOpen });

	setListRef = (ref: HTMLElement | null) => this.listRef = ref!;

	render() {
		const t = this.props.t!;
		const { loggedIn } = this.props;

		const navItems: Item[] = [
			[t("navItems.following"), "/directory/following"],
			[t("navItems.browse"), "/directory"],
			[t("navItems.tryPrime"), "https://twitch.amazon.com/prime"]
		];
		// TODO: When the list is collapsed, add nav items to the balloon.
		const balloonItems: Item[] = [
			[t("balloonItems.about"), "https://www.twitch.tv/p/about"],
			[t("balloonItems.advertisers"), "http://twitchadvertising.tv/"],
			[t("balloonItems.blog"), "https://blog.twitch.tv/"],
			[t("balloonItems.creative"), "/directory/game/Creative"],
			[t("balloonItems.cookiePolicy"), "https://www.twitch.tv/p/cookie-policy"],
			[t("balloonItems.developers"), "https://dev.twitch.tv/"],
			[t("balloonItems.help"), "http://help.twitch.tv/"],
			[t("balloonItems.jobs"), "https://www.twitch.tv/jobs"],
			[t("balloonItems.language"), "https://www.twitch.tv/#"],
			[t("balloonItems.music"), "http://music.twitch.tv/"],
			[t("balloonItems.partners"), "https://www.twitch.tv/p/partners"],
			[t("balloonItems.press"), "https://www.twitch.tv/p/press"],
			[t("balloonItems.store"), "https://www.twitch.tv/store"],
			[t("balloonItems.terms"), "https://www.twitch.tv/p/terms-of-service"],
			[t("balloonItems.getTwitchDesktopApp"), "https://download.twitch.tv/"]
		];

		return (
			<nav className={style.nav}>
				<NavLink className={style.logo} exact to="/" />

				<ul ref={this.setListRef} className={style.list}>
					{mapItemsToLinks(navItems).map(item => (
						<li key={item.props.title}>{item}</li>
					))}

					<li className={style.more}>
						<Button transparent className={ignoreCloseClass} onClick={this.toggleMore}>
							<img src={moreIcon} />
						</Button>

						<Balloon onClose={this.toggleMore} open={this.state.moreOpen}>
							<BalloonList>
								{mapItemsToLinks(balloonItems)}
							</BalloonList>
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
	// Receive pathname changes so we can update link active states.
	pathname: state.router.location.pathname
});

type Props = typeof StateProps & InjectedTranslateProps;
const StateProps = returnOf(mapStateToProps);

export default connect<typeof StateProps, {}, {}>(
	mapStateToProps
)(NavigationBar);

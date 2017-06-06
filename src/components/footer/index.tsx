import React from "react";
import {InjectedTranslateProps, translate} from "react-i18next";

import Balloon from "components/balloon";
import logo from "assets/logo-icon.svg";
import style from "./style.scss";

@translate("footer")
export default class Footer extends React.Component<InjectedTranslateProps, OwnState> {
	state = {balloonOpen: false};

	toggleBalloon = (e: any) => {
		this.setState({balloonOpen: !this.state.balloonOpen});
		e.preventDefault();
	}

	render() {
		const t = this.props.t!;

		return (
			<footer className={style.footer}>
				<img src={logo} />

				<ul className={style.links}>
					<li><a href="https://www.twitch.tv/p/about">About</a></li>
					<li><a href="http://blog.twitch.tv">Blog</a></li>
					<li><a href="https://www.twitch.tv/products/turbo?ref=footer">Turbo</a></li>
					<li><a href="http://music.twitch.tv">Music</a></li>
					<li><a href="http://twitchmediagroup.com/">Advertise</a></li>
					<li><a href="https://www.twitch.tv/p/developers">Developers</a></li>
					<li><a href="https://www.twitch.tv/p/partners">Partners</a></li>
					<li><a href="https://www.twitch.tv/p/mobile">Mobile</a></li>
					<li><a href="https://www.twitch.tv/p/jobs">Jobs</a></li>
					<li><a href="http://help.twitch.tv">Help</a></li>
					<li><a href="https://www.twitch.tv/user/legal?page=terms_of_service">Terms</a></li>
					<li><a href="https://www.twitch.tv/user/legal?page=privacy_policy">Privacy Policy</a></li>
					<li><a href="https://www.twitch.tv/user/legal?page=ad_choices">Ad Choices</a></li>
					<li><a href="https://www.twitch.tv/user/legal?page=cookie_policy">Cookie Policy</a></li>

					<li>
						<Balloon
							onClickOutside={this.toggleBalloon.bind(null, false)}
							open={this.state.balloonOpen}
						>
							Language List
						</Balloon>
						<a onClick={this.toggleBalloon} href="#">Language</a>
					</li>
				</ul>

				<p className={style.notice}>
					{t("notice")}
				</p>
			</footer>
		);
	}
}

interface OwnState {
	balloonOpen: boolean;
}

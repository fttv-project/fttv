import React from "react";
import { NavLink, RouteComponentProps } from "react-router-dom";
import { InjectedTranslateProps, translate } from "react-i18next";

import LoginButton from "components/login-button";

import style from "./style.scss";

@translate("home")
export default class Home extends React.Component<Props, any> {
	render() {
		const t = this.props.t!;

		return (
			<section className={style.container}>
				<div className={style.content}>
					<h1>{t("title")}</h1>
					<NavLink to="/settings">{t("navigation.settings")}</NavLink>
					<LoginButton />
				</div>
			</section>
		);
	}
}

type Props = InjectedTranslateProps & RouteComponentProps<{}>;

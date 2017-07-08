import React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import { NavLink, RouteComponentProps } from "react-router-dom";

import style from "./Home.scss";

@translate("home")
export class Home extends React.Component<Props, any> {
	render() {
		const t = this.props.t!;

		return (
			<section className={style.container}>
				<div className={style.content}>
					<h1>{t("title")}</h1>
					<NavLink to="/settings">{t("navigation.settings")}</NavLink>
				</div>
			</section>
		);
	}
}

type Props = InjectedTranslateProps & RouteComponentProps<{}>;

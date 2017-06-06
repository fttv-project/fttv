import React from "react";
import {Link, RouteComponentProps} from "react-router-dom";
import {InjectedTranslateProps, translate} from "react-i18next";

import Footer from "components/footer";
import style from "./style.scss";

@translate("home")
export default class Home extends React.Component<Props, any> {
	render() {
		const t = this.props.t!;

		return (
			<section className={style.container}>
				<div className={style.content}>
					<h1>{t("title")}</h1>
					<Link to="/counter">{t("navigation.counter")}</Link>
				</div>

				<Footer />
			</section>
		);
	}
}

type Props = InjectedTranslateProps & RouteComponentProps<{}>;

import { parse } from "querystring";
import React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";

import style from "./Auth.scss";

@translate("auth")
export class Auth extends React.Component<InjectedTranslateProps> {
	componentDidMount() {
		const query = parse(location.hash.slice(1) || location.search.slice(1));
		window.opener.postMessage({
			type: "auth",
			payload: query
		}, location.origin);
		window.close();
	}

	render() {
		const t = this.props.t!;

		return (
			<section className={style.container}>
				<h2>{t("loading")}</h2>
			</section>
		);
	}
}

import React from "react";
import { connect } from "react-redux";
import { InjectedTranslateProps, translate } from "react-i18next";
import { Action, Dispatch, bindActionCreators } from "redux";

import { getAuthorizeUrl } from "common/twitch-api";
import { generateRandomString, returnOf } from "common/util";
import { add as addError } from "data/errors";
import { setAccessToken } from "data/user";
import { Button } from "components/button";

@translate("auth-buttons")
class AuthButtons extends React.Component<AuthButtonsProps, {}> {
	private validationToken?: string;

	onMessage = (e: MessageEvent) => {
		if (e.data.type !== "auth") return;

		if (e.data.payload.error) {
			this.props.addError(e.data.payload.error_description);
		} else if (e.data.payload.state !== this.validationToken) {
			this.props.addError("Invalid XSRF token on authorization request");
		} else {
			this.props.setAccessToken(e.data.payload.access_token);
			this.validationToken = undefined;
		}
	}

	openWindow = () => {
		this.validationToken = generateRandomString(16);
		window.open(getAuthorizeUrl(this.validationToken), "auth", "width=540,height=640,menubar=0,toolbar=0");
	}

	componentDidMount() {
		window.addEventListener("message", this.onMessage);
	}

	componentWillUnmount() {
		window.removeEventListener("message", this.onMessage);
	}

	render() {
		const t = this.props.t!;
		return (
			<div style={{display: "flex"}}>
				<Button onClick={this.openWindow} style={{marginRight: "1rem"}}>
					{t("login")}
				</Button>

				<Button link="https://twitch.tv/signup">
					{t("signup")}
				</Button>
			</div>
		);
	}
}

const mapDispatchToProps = (dispatch: Dispatch<Action>) => bindActionCreators({
	addError,
	setAccessToken
}, dispatch);

export type AuthButtonsProps = typeof DispatchProps & InjectedTranslateProps;
const DispatchProps = returnOf(mapDispatchToProps);

export default connect<{}, typeof DispatchProps, {}>(
	null,
	mapDispatchToProps
)(AuthButtons);

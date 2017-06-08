import React from "react";
import Helmet from "react-helmet";
import { connect } from "react-redux";
import { InjectedTranslateProps, translate } from "react-i18next";
import { Action, Dispatch, bindActionCreators } from "redux";

import { returnOf } from "common/util";
import { State } from "data";
import { loadTheme } from "data/config";
import { themes } from "styles/themes";

import style from "./style.scss";

@translate("settings")
class Settings extends React.Component<Props, {}> {
	onThemeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		this.props.loadTheme(e.target.value);
	}

	componentDidMount() {
		this.setState({ selectedTheme: this.props.theme.name });
	}

	render() {
		const t = this.props.t!;

		return (
			<section className={style.container}>
				<Helmet title={t("title")} />

				<div className={style.theming}>
					<select onChange={this.onThemeChange} value={this.props.theme.name}>
						{themes.map(name => (
							<option key={name} value={name}>{name}</option>
						))}
					</select>
				</div>
			</section>
		);
	}
}

const mapStateToProps = (state: State) => ({
	theme: state.config.theme
});

const mapDispatchToProps = (dispatch: Dispatch<Action>) => bindActionCreators({
	loadTheme
}, dispatch);

type Props = typeof StateProps & typeof DispatchProps & InjectedTranslateProps;
const StateProps = returnOf(mapStateToProps);
const DispatchProps = returnOf(mapDispatchToProps);

export default connect<typeof StateProps, typeof DispatchProps, {}>(
	mapStateToProps,
	mapDispatchToProps
)(Settings);

import React from "react";
import { connect } from "react-redux";
import classnames from "classnames";

import { returnOf } from "common/util";
import { State } from "data";
import Button from "components/button";

import style from "./style.scss";

class UserInfo extends React.Component<Props, OwnState> {
	state = { drawerOpen: false };

	toggleDrawer = () => this.setState({ drawerOpen: !this.state.drawerOpen });

	render() {
		const { details } = this.props;

		return (
			<Button
				className={classnames(style.card, {
					[style.drawerOpen]: this.state.drawerOpen
				})}
				onClick={this.toggleDrawer}
				transparent
				noFocus
			>
				<img className={style.avatar} src={details.logo && details.logo.replace("300x300", "70x70")} />
				<div className={style.info}>
					<p className={style.displayName}>{details.display_name}</p>
					<div className={style.status}>
						<span className={style.presence} />
						<span className={style.presenceName}>Invisible</span>
					</div>
				</div>
			</Button>
		);
	}
}

interface OwnState {
	drawerOpen: boolean;
}

const mapStateToProps = (state: State) => ({
	details: state.user.details!
});

type Props = typeof StateProps;
const StateProps = returnOf(mapStateToProps);

export default connect<typeof StateProps, {}, {}>(
	mapStateToProps
)(UserInfo);

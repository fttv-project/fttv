import React from "react";
import onClickOutside from "react-onclickoutside";

import style from "./Balloon.scss";

@(onClickOutside as any)
export class Balloon extends React.PureComponent<BalloonProps> {
	handleClickOutside: () => void;

	constructor(props: BalloonProps) {
		super(props);
		this.handleClickOutside = props.onClose;
	}

	render() {
		return this.props.open ? (
			<div className={style.wrapper}>
				<div className={style.dialog}>
					{this.props.children}
				</div>
			</div>
		) : null;
	}
}

interface BalloonProps {
	onClose: () => void;
	open: boolean;
}

export const ignoreCloseClass = "ignore-react-onclickoutside";

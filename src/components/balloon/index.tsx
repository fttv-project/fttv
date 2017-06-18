import React from "react";
import onClickOutside from "react-onclickoutside";

import style from "./style.scss";

@(onClickOutside as any)
export default class Balloon extends React.Component<Props, {}> {
	handleClickOutside: () => void;

	constructor(props: Props) {
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

interface Props {
	onClose: () => void;
	open: boolean;
}

export const ignoreCloseClass = "ignore-react-onclickoutside";

export { default as BalloonList } from "./balloon-list";

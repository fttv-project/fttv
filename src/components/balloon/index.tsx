import React from "react";
import onClickOutside from "react-onclickoutside";

import style from "./style.scss";

@(onClickOutside as any)
export default class Balloon extends React.Component<Props, {}> {
	constructor(props: Props) {
		super(props);
		if (props.onClickOutside) this.handleClickOutside = props.onClickOutside;
	}

	handleClickOutside = (_: any) => { };

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
	onClickOutside?: (e: React.MouseEventHandler<any>) => void;
	open: boolean;
}

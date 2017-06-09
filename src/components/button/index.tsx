import React from "react";
import classnames from "classnames";

import style from "./style.scss";

export default (props: Props & React.HTMLProps<HTMLButtonElement>) => (
	<button
		{...props}
		className={classnames(style.button, props.className || "", {
			[style.transparent]: props.transparent
		})}
		tabIndex={0}
	>
		{props.children}
	</button>
);

interface Props {
	transparent?: boolean;
}
